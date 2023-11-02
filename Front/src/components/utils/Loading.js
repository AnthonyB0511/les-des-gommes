import styles from "./Loading.module.scss";

export default function Loading() {
    return (
        <div className={`${styles.loading}`}>
            <i className={`fas fa-spinner ${styles.spinner}`}></i>
        </div>
    );
}
