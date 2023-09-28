import styles from "./Header.module.scss";
import Account from "./Account";
import Burger from "./BurgerMenu/Burger";
import { useState } from "react";
import logo from "../../assets/images/logo_Title.webp";


export default function Header() {
    const [user, setUser] = useState(null);
    function getUser(userLogged) {
        setUser(userLogged);
    }

    return (
        <header className={`d-flex align-items-center ${styles.header}`}>
            <img src={logo} alt="logo de l'association" />
            <div className={`${styles.icone}`}>
                <Account getUser={getUser} user={user} setUser={setUser} />
                <Burger />
            </div>

        </header>
    );
}