import styles from "./SecondTitle.module.scss";
/**
 * 
 * @param {String} name
 * @returns 
 */
export function SecondTitle({ name }) {
    return (
        <h2 className={`${styles.title}`}>{name}</h2>
    );
}