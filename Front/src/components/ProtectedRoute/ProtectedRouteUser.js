import { useContext } from "react";
import { AuthContext } from "../../context";
import { Navigate } from "react-router-dom";
// protecion si le user est connecté il ne doit pas montré register et  login
export default function ProtectedRoute({ children }) {
    const { user } = useContext(AuthContext);
    return user ? <Navigate to="/" /> : children;
}