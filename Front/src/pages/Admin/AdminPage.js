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
                <NavLink end to="" title="section articles">Articles</NavLink>
                <NavLink to="ajoutJeu" title="section jeux">Jeux</NavLink>
                <NavLink to="carrousel" title="section slider">Slider</NavLink>
                <NavLink to="adminUtilisateur" title="section utilisateur">Utilisateur</NavLink>
            </section>
            <section className={`${styles.link}`}>

            </section>
            {/* montre les autres routes composants */}
            <Outlet />

        </section>
    );
}
