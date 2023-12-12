import styles from "./Footer.module.scss";
import { Contact } from "./components/Contact";
import { Link } from "react-router-dom";
export default function Footer() {
    return (
        <footer className={`${styles.footer}`}>
            <section className={`d-flex justify-content-center align-items-center flex-column`}>
                <p>© 2023 Les Dés Gommés - <span className={`${styles.rights}`}>Tous droits réservés</span></p>
            </section>
            <Contact />
            <section className={`${styles.mention} d-flex justify-content-center align-items-center`}>
                <Link to="/mentionslegales">Mentions légales</Link>
                <p className="space"> | </p>
                <Link to='/politiquedeconfidentialite'>Politiques de confidentialités</Link>
                <p className="space"> | </p>
                <Link to='/conditionsgenerales'>Conditions d'utilisations</Link>
            </section>
        </footer>
    );
}