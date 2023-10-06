import styles from "./Header.module.scss";
import Account from "./Account";
import Burger from "./BurgerMenu/Burger";
import { useState } from "react";
import logo from "../../assets/images/logo_Title.webp";


export default function Header() {

    const [user, setUser] = useState(null);
    /**
     * fonction qui permet de récupéré les infos nécessaires à l'affichage du user
     * @param {object} userLogged 
     */
    function getUser(userLogged) {
        setUser(userLogged);
    }

    return (
        <header className={`d-flex align-items-center ${styles.header}`}>
            <img src={logo} alt="logo de l'association" />
            <section className={`${styles.icone}`}>
                <Account getUser={getUser} user={user} setUser={setUser} />
                <Burger />
            </section>

        </header>
    );
}