import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useState } from "react";
import { signin } from "../../apis/users";
import { signout } from "../../apis/users";

export default function AuthProvider({ children }) {
    const userConnect = useLoaderData();
    const [user, setUser] = useState(userConnect);
    async function login(values) {
        const newUser = await signin(values);
        setUser(newUser);
    }
    async function logout() {
        await signout();
        setUser(null);
    }
    return (
        <AuthContext.Provider value={{
            user, login, logout
        }}>
            {children}
        </AuthContext.Provider>
    );
}