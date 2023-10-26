import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useState } from "react";
import { signin } from "../../apis/users";
import { signout } from "../../apis/users";


export default function AuthProvider({ children }) {
    const userConnect = useLoaderData();
    const [user, setUser] = useState(userConnect);
    const [unlogged, setUnlogged] = useState(false);

    async function login(values) {
        const newUser = await signin(values);
        setUser(newUser);
    }
    async function logout() {
        await signout();
        setUnlogged(true);
        setTimeout(() => {
            setUser(null);
            setUnlogged(false);
        }, 2000);
    }
    // async function avatar() {
    //     await getDefaultImage();
    // }
    return (
        <AuthContext.Provider value={{
            user, login, logout, unlogged
        }}>
            {children}
        </AuthContext.Provider>
    );
}