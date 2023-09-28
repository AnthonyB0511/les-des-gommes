import styles from "./Footer.module.scss";
import { Contact } from "./Contact";
export default function Footer() {
    return (
        <footer className={`${styles.footer}`}>
            <div className={`d-flex justify-content-center align-items-center flex-column`}>
                <p>© 2023 Les Dés Gommés - <span className={`${styles.rights}`}>Tous droits réservés</span></p>
            </div>
            <Contact />
            <div className={`${styles.mention} d-flex justify-content-center align-items-center`}>
                <a href="">Mentions légales</a>
                <p className="space"> | </p>
                <a href="">Politiques de confidentialités</a>
                <p className="space"> | </p>
                <a href="">Conditions d'utilisations</a>
            </div>
        </footer>
    );
}