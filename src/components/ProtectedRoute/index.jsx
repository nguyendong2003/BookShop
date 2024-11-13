import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import NotPermitted from "./NotPermitted";

// check role admin
const RoleBaseRoute = (props) => {
    const isAdminRoute = window.location.pathname.startsWith('/admin');
    const user = useSelector(state => state.account.user);
    const userRole = user.role;

    if (isAdminRoute && userRole === 'ADMIN' ||
        !isAdminRoute && (userRole === 'USER' || userRole === 'ADMIN')
    ) {
        return (<>{props.children}</>)
    } else {
        return (<NotPermitted />)
    }
}

const ProtectedRoute = (props) => {
    const isAuthenticated = useSelector(state => state.account.isAuthenticated)

    return (
        <>
            {
                // Nếu đã đăng nhập thì mới cho vào, nếu chưa đăng nhập thì chuyển hướng về trang login
                isAuthenticated === true ?
                    <>
                        <RoleBaseRoute>
                            {props.children}
                        </RoleBaseRoute>
                    </>
                    :
                    <Navigate to='/login' replace />
            }
        </>
    )
}

export default ProtectedRoute;

