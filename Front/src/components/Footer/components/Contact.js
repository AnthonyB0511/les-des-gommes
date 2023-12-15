import styles from "./Contact.module.scss";
import { Link } from "react-router-dom";
export const Contact = () => {
    return (
        <section className={`d-flex align-items-center justify-content-center ${styles.contact}`}>

            <a href="mailto:lesdesgommes@gmail.com" className={`${styles.link}`}><i className="fa-solid fa-envelope"></i> lesdesgommes@gmail.com</a>
            <p> | </p>
            <Link to="https://fr-fr.facebook.com/lesdesgommes/" target="_blank"><i className="fa-brands fa-facebook"></i></Link>
        </section>
    );
};