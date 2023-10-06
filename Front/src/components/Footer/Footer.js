import styles from "./Footer.module.scss";
import { Contact } from "./components/Contact";
import { Link } from "react-router-dom";
export default function Footer() {
    return (
        <footer className={`${styles.footer}`}>
            <div className={`d-flex justify-content-center align-items-center flex-column`}>
                <p>© 2023 Les Dés Gommés - <span className={`${styles.rights}`}>Tous droits réservés</span></p>
            </div>
            <Contact />
            <div className={`${styles.mention} d-flex justify-content-center align-items-center`}>
                <Link>Mentions légales</Link>
                <p className="space"> | </p>
                <Link>Politiques de confidentialités</Link>
                <p className="space"> | </p>
                <Link>Conditions d'utilisations</Link>
            </div>
        </footer>
    );
}