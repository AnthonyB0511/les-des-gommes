import styles from "./FormTitle.module.scss";
/**
 * 
 * @param {string} textTitle
 * @returns h1
 */
export const FormTitle = ({ textTitle }) => {
    return <h1 className={`${styles.h1}`}>{textTitle}</h1>;
};