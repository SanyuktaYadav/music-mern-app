import { Navigate } from "react-router";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
    const currentUser = useSelector(state => state.currentUser.user);
    return currentUser ? children : <Navigate to="/Login" replace />;
};

export default ProtectedRoute;
