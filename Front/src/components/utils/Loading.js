import styles from "./Loading.module.scss";
// composant de loading pour les données
export default function Loading() {
    return (
        <section className={`${styles.loading}`}>
            <i className={`fas fa-spinner ${styles.spinner}`}></i>
        </section>
    );
}
