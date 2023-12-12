import styles from "./Loading.module.scss";

export default function Loading() {
    return (
        <section className={`${styles.loading}`}>
            <i className={`fas fa-spinner ${styles.spinner}`}></i>
        </section>
    );
}
