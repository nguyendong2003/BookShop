import axios from "axios";
import { Mutex } from "async-mutex";

const mutex = new Mutex();

const baseUrl = import.meta.env.VITE_BACKEND_URL;

const instance = axios.create({
    baseURL: baseUrl,
    withCredentials: true,  // phải có dòng này thì trình duyệt mới tự động lưu refresh token vào cookies
});

instance.defaults.headers.common = { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }

const handleRefreshToken = async () => {
    // const res = await instance.get('/api/v1/auth/refresh');
    // if (res && res.data) return res.data.access_token;
    // else null;


    // Sử dụng mutex để tránh việc nhiều request cùng thời điểm gửi request refresh token (chỉ gửi 1 request refresh token, còn các request khác đợi cho đến khi request refresh token xong)
    // (nếu không sử dụng mutex thì có thể sẽ gửi nhiều request với access token bị hết hạn --> sau đó mỗi request đó đều gọi refresh token cùng lúc)
    // (nếu sử dụng mutex thì chỉ có 1 request gửi refresh token, còn các request khác đợi cho đến khi request refresh token xong)
    return await mutex.runExclusive(async () => {
        const res = await instance.get('/api/v1/auth/refresh');
        if (res && res.data) return res.data.access_token;
        else return null;
    });
}

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Mỗi lần gửi request thì kiểm tra xem có access token trong localStorage không, nếu có thì thêm vào header của request (để request được gửi với token mới nhất)
    if (typeof window !== "undefined" && window && window.localStorage && window.localStorage.getItem('access_token')) {
        config.headers.Authorization = 'Bearer ' + window.localStorage.getItem('access_token');
    }

    return config;
}, function (error) {

    return Promise.reject(error);
});

/*
    # Nếu gặp lỗi 401 (Unauthorized) thì sẽ thực hiện refresh token và thử lại request (retry request)
    - Thêm vào header 'x-no-retry' là 'true' vào request để tránh việc request bị lặp lại vô tận
    (nếu không thêm nó thì khi lần request đầu bị lỗi 401, sẽ thực hiện refresh token và retry request đó, 
    nhưng nếu server vẫn trả về lỗi 401 thì sẽ thực hiện retry lại => cứ thế sẽ lặp lại vô tận nếu server vẫn cứ mãi trả về lỗi 401
    => nên thêm header 'x-no-retry' để tránh trường hợp này
    => nếu không có header 'x-no-retry' thì mới thực hiện refresh token và retry request)
*/
const NO_RETRY_HEADER = 'x-no-retry'

// Add a response interceptor
instance.interceptors.response.use(function (response) {

    return response && response.data ? response.data : response;
}, async function (error) {     // handleRefreshToken() dùng async await nên phải thêm async ở đây
    // Nếu gặp lỗi 401 (Unauthorized) thì thực hiện refresh token và retry request
    if (error.config && error.response
        && +error.response.status === 401      // thêm dấu + để chuyển string sang kiểu number
        && !error.config.headers[NO_RETRY_HEADER]  // nếu không có header 'x-no-retry' thì mới thực hiện refresh token và retry request
    ) {
        const access_token = await handleRefreshToken();
        error.config.headers[NO_RETRY_HEADER] = 'true'    // thêm header 'x-no-retry' vào request để tránh việc request bị lặp lại vô tận
        if (access_token) {
            error.config.headers['Authorization'] = `Bearer ${access_token}`;   // update access token mới vào header của request
            localStorage.setItem('access_token', access_token)
            return instance.request(error.config);      // retry request
        }
    }

    // Khi refresh token mà server thấy refresh token hết hạn thì chuyển hướng về trang login (code này bên BE trả về lỗi 400 để phân biệt với lỗi 401 ở trên)
    if (
        error.config && error.response
        && +error.response.status === 400
        && error.config.url === '/api/v1/auth/refresh'  // khi thực hiện refresh token mà bị lỗi 400
    ) {
        if (
            window.location.pathname !== '/'
            && !window.location.pathname.startsWith('/book')
        ) {
            window.location.href = '/login';    // chuyển hướng về trang login
        }
    }

    return error?.response?.data ?? Promise.reject(error);
});

export default instance;