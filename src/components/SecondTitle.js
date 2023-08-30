import styles from "./SecondTitle.module.scss";

export function SecondTitle({name}){
    return (
        <h2 className={`${styles.title}`}>{name}</h2>
    )
}