import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import styles from "./Login.module.scss";

export default function Login() {
    return (
        <main className={`${styles.log} flex-fill`}>
            <section className={`${styles.section}`}>
                <NavLink end to="">
                    <i class="fa-solid fa-right-to-bracket"></i>Connexion</NavLink>
                <NavLink to="register"><i class="fa-solid fa-user-plus"></i>Inscription</NavLink>
            </section>
            <Outlet />
        </main>
    );
}
