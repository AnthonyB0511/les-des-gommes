import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import styles from "./Login.module.scss";

export default function Login() {
    return (
        <section className={`${styles.log}`}>

            <article className={`${styles.section}`}>
                <NavLink end to="" title="Aller au formulaire de connexion">
                    <i className="fa-solid fa-right-to-bracket"></i>Connexion</NavLink>
                <NavLink to="register" title="Aller au formulaire d'inscription"><i className="fa-solid fa-user-plus"></i>Inscription</NavLink>
            </article>
            <Outlet />
        </section>
    );
}
