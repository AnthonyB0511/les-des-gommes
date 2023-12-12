import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Line } from "../../components/utils/Line";
import { Title } from "../../components/utils/Title";
import styles from "./AdminPage.module.scss";

export default function AdminPage() {
    return (
        <section>
            <Title title="Administration du site" />
            <Line />
            <section className={`${styles.link}`}>
                <NavLink end to="">Articles</NavLink>
                <NavLink to="ajoutJeu">Jeux</NavLink>
                <NavLink to="carrousel">Slider</NavLink>
            </section>
            <section className={`${styles.link}`}>
                <NavLink to="adminUtilisateur">Utilisateur</NavLink>
            </section>
            <Outlet />

        </section>
    );
}
