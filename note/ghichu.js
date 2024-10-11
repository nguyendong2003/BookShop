/*
    # Thư viện react-spinners:
    - Thư viện này giúp tạo ra các animation loading
    - Tài liệu: https://www.npmjs.com/package/react-spinners?activeTab=readme
    => Xem các component của thư viện thì bấm vào Demo page của link trên -> 
        https://www.davidhu.io/react-spinners/
        https://www.davidhu.io/react-spinners/storybook/?path=/docs/barloader--docs

    
    # Refresh token
    - refresh token lưu ở cookies, khi nó bị hết hạn thì trình duyệt tự xóa luôn cookies chứa refresh token đó
    - Khi logout thì xóa access_token ở localStorage (xóa ở FE), còn cookies thì đã bị xóa ở BE
    - Khi refresh token hết hạn thì cookies hết hạn => trình duyệt tự xóa cookies đó luôn

    # Thay đổi thời gian hết hạn của token trong file .env của code BE

    # API filter:
    - Bên BE dùng thư viện để lấy query từ URL: https://www.npmjs.com/package/api-query-params
    - http://localhost:8080/api/v1/user?current=1&pageSize=5&fullName=I'm Admin
    => fullName=I'm Admin    => tên fullName phải đúng chính xác bằng I'm Admin

    - http://localhost:8080/api/v1/user?current=1&pageSize=5&fullName=/I'm Adm/i
    => fullName=/I'm Adm/i    => tìm kiếm tất cả fullName có chứa I'm Adm (không phân biệt hoa thường)
*/