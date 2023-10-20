import styles from "./Header.module.scss";
import Account from "./Account";
import Burger from "./BurgerMenu/Burger";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo_Title.webp";


export default function Header() {


    return (
        <header className={`d-flex align-items-center ${styles.header}`}>
            <Link to="/" className={`${styles.a}`}>
                <img src={logo} alt="logo de l'association" />
            </Link>
            <section className={`${styles.icone}`}>
                <Account />
                <Burger />
            </section>

        </header>
    );
}