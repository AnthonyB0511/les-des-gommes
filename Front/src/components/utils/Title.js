import styles from "./Title.module.scss";
/**
 * 
 * @param {Boolean} title
 * @returns 
 */
export const Title = ({ title }) => {
    return <h1 className={`${styles.title}`}>{title}</h1>;
};