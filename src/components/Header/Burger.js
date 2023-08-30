import styles from "./Burger.module.scss"
export default function(){
    return(
        <div className={`${styles.icon}`}>
            <i className="fa-solid fa-bars"></i>
        </div>
    )
}