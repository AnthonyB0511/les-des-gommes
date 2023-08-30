import styles from "./Header.module.scss";
import Account from "./Account";
import Burger from "./Burger"
import logo from "../../assets/images/logo_Title.webp"
export default function Header(){
    return (
        <header className={`d-flex align-items-center ${styles.header}`}>
            <img src={logo} alt="logo de l'association" />
            <Account />
            <Burger />
        </header>
    )
}