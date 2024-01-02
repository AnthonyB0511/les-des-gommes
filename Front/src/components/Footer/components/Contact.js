import styles from "./Contact.module.scss";
import { Link } from "react-router-dom";
export const Contact = () => {
    return (
        <section className={`d-flex align-items-center justify-content-center ${styles.contact}`}>

            <Link to="mailto:lesdesgommes@gmail.com" className={`${styles.link}`} title="Envoyer un mail à l'association"><i className="fa-solid fa-envelope"></i> lesdesgommes@gmail.com</Link>
            <p> | </p>
            <Link to="https://fr-fr.facebook.com/lesdesgommes/" target="_blank" title="Facebook des Dés Gommés"><i className="fa-brands fa-facebook"></i></Link>
        </section>
    );
};