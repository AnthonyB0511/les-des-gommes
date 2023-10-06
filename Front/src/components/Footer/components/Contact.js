import styles from "./Contact.module.scss";
export const Contact = () => {
    return (
        <div className={`d-flex align-items-center justify-content-center ${styles.contact}`}>
            <i className="fa-solid fa-envelope"></i>
            <a href="mailto:lesdesgommes@gmail.com" className={`${styles.link}`}> lesdesgommes@gmail.com</a>
            <p> | </p>
            <a href="https://fr-fr.facebook.com/lesdesgommes/"><i className="fa-brands fa-facebook"></i></a>
        </div>
    );
};