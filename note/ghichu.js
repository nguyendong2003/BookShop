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

    # API Sorter:
    - Quy tắc truyền filter: https://www.npmjs.com/package/api-query-params
    - Mặc định, sort theo ascending/descending, tuy nhiên, ở nosql, có thể dùng dấu - (minus)
    - Ví dụ:
        http://localhost:8080/api/v1/user?current=1&pageSize=2&sort=fullName
            => sort kết quả theo fullName (asc)
        http://localhost:8080/api/v1/user?current=1&pageSize=2&sort=-fullName
            => sort kết quả theo fullName (desc)



    # Cách dùng Form bên trong Modal của Ant Design
    - Trong Modal của UserModalCreate.jsx có sẵn nút submit tạo mới ở onOk
    - Nhưng bên trong Modal đó lại có 1 Form
     => Muốn Form đó có thể sử dụng nút submit của Modal thì cần phải sử dụng hook: Form.useForm()
     => Khi submit form thì gọi: form.submit()


    # Thư viện đọc file xlsx, csv (SheetJS) để upload file thêm mới nhiều user:
    - https://www.npmjs.com/package/xlsx
    - Documentation: https://docs.sheetjs.com/docs/
    - Search: 'react excel to json stackoverflow'
        Ra được code mẫu:    https://stackoverflow.com/a/67564938

    # Ngăn chặn sự kiện propagation khi bấm vào nút Download sample file ở chỗ Upload users file (Event bubbling):
    - https://stackoverflow.com/a/23954430
        Ví dụ:
            <a
                href={templateFile}
                onClick={e => e.stopPropagation()}  // khi không có dòng này thì khi bấm vào nút này sẽ hiện popup upload file của thằng cha
                download
            >
                Download Sample File
            </a>
    


*/