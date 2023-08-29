import styles from "./Burger.module.scss"
import Navigation from "./Navigation"
export default function(){
    return(
        <div onClick={Navigation} className={`${styles.icon}`}>
            <i className="fa-solid fa-bars"></i>
        </div>
    )
}