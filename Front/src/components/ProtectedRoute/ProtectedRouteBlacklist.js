import { useContext } from "react";
import { AuthContext } from "../../context";
import { Navigate } from "react-router-dom";
// protection si l'user est ban
export default function ProtectedRoute({ children }) {
    const { user } = useContext(AuthContext);
    return (user && user.ban !== 1) ? children : <Navigate to="/login" />;
}