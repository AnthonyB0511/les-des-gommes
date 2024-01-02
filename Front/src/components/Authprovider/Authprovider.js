import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useState } from "react";
import { signin } from "../../apis/users";
import { signout } from "../../apis/users";



export default function AuthProvider({ children }) {
    const userConnect = useLoaderData();
    const [user, setUser] = useState(userConnect);
    const [unlogged, setUnlogged] = useState(false);
    // connexion et on modifie le useState avec le résultat du back
    async function login(values) {
        const newUser = await signin(values);
        setTimeout(() => {
            setUser(newUser);
        }, 3000);

    }
    // déconnexion
    async function logout() {
        await signout();
        // prévient que la déco est en cours
        setUnlogged(true);
        setTimeout(() => {
            // l'utilisateur devient "null" et on cache le feedback de déco au bout de 2 sec
            setUser(null);
            setUnlogged(false);
        }, 2000);
    }

    // on passe toutes les fonctionnalités et valeur dans le AuthContext Provider qui englobe toute l'application
    return (
        <AuthContext.Provider value={{
            user, login, logout, unlogged, setUser
        }}>
            {children}
        </AuthContext.Provider>
    );
}