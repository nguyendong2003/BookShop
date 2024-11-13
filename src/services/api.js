import axios from '../utils/axios-customize';

// Auth
export const callRegister = (fullName, email, password, phone) => {
    return axios.post('/api/v1/user/register', { fullName, email, password, phone })
}

export const callLogin = (username, password) => {
    const delay = 1000      // delay 1s để test loading
    return axios.post('/api/v1/auth/login', { username, password, delay })
}

export const callFetchAccount = () => {
    return axios.get('/api/v1/auth/account')
}

export const callLogout = () => {
    return axios.post('/api/v1/auth/logout')
}

// User
export const callFetchListUser = (query) => {
    // current=1&pageSize=3
    return axios.get(`/api/v1/user?${query}`)
}

export const callCreateAUser = (fullName, password, email, phone) => {
    return axios.post('/api/v1/user', { fullName, password, email, phone })
}

export const callBulkCreateUser = (data) => {
    return axios.post('/api/v1/user/bulk-create', data)
}

export const callUpdateUser = (_id, fullName, phone) => {
    return axios.put('/api/v1/user', { _id, fullName, phone })
}

export const callDeleteUser = (id) => {
    return axios.delete(`/api/v1/user/${id}`)
}

// Book
export const callFetchListBook = (query) => {
    return axios.get(`/api/v1/book?${query}`)
}

export const callFetchBookById = (id) => {
    return axios.get(`api/v1/book/${id}`)
}

export const callCreateBook = (thumbnail, slider, mainText, author, price, sold, quantity, category) => {
    return axios.post('/api/v1/book', {
        thumbnail, slider, mainText, author, price, sold, quantity, category
    })
}

export const callUpdateBook = (id, thumbnail, slider, mainText, author, price, sold, quantity, category) => {
    return axios.put(`/api/v1/book/${id}`, {
        thumbnail, slider, mainText, author, price, sold, quantity, category
    })
}

export const callDeleteBook = (id) => {
    return axios.delete(`/api/v1/book/${id}`)
}

export const callFetchCategory = () => {
    return axios.get('/api/v1/database/category')
}

export const callUploadBookImg = (fileImg) => {
    const bodyFormData = new FormData();
    bodyFormData.append('fileImg', fileImg);
    return axios({
        method: 'post',
        url: '/api/v1/file/upload',
        data: bodyFormData,
        headers: {
            "Content-Type": "multipart/form-data",
            "upload-type": "book"
        },
    });
}

// Order
export const callPlaceOrder = (data) => {
    return axios.post('/api/v1/order', {
        ...data
    })
}



