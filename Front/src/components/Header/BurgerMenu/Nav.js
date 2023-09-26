import styles from "./Nav.module.scss";
import { LineNav } from "./LineNav";
import { Contact } from "../../Footer/Contact"
export const Nav = () => {
    return (
        <>

            <div className={`${styles.burgerMenu} `}>
                <nav className={`${styles.nav}`}>
                    <ul className={`${styles.ul}`}>
                        <li className={`${styles.li}`}><a href="" className={`${styles.a}`}>ACCUEIL</a></li>
                        <LineNav />
                        <li className={`${styles.li}`} ><a href="" className={`${styles.a}`} >L'ASSO</a></li>
                        <LineNav />
                        <li className={`${styles.li}`}><a href="" className={`${styles.a}`}>LA LUDOTHEQUE</a></li>
                        <LineNav />
                        <li className={`${styles.li}`}><a href="" className={`${styles.a}`}>CONTACT</a></li>
                        <LineNav />
                        <li className={`${styles.li}`}><a href="" className={`${styles.a}`}>FORUM</a></li>
                        <LineNav />
                        <li className={`${styles.li}`}><a href="" className={`${styles.a}`}>MON COMPTE</a></li>
                    </ul>
                </nav>
                <Contact />
            </div>

        </>
    )
}