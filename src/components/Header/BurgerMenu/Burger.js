import styles from "./Burger.module.scss";
import { Contact } from "../../Footer/Contact"
import { LineNav } from "../BurgerMenu/LineNav";
import { useState } from "react";
import { Link } from "react-router-dom";


export default function Burger() {
    const [open, setOpen] = useState(false);
    const changeBorder = (e) => {

    }


    const HamburgerIcon = <div
        className={`${styles.icon}`}
        onClick={() => setOpen(!open)}
    >
        <i className="fa-solid fa-bars"></i>
    </div>

    const CloseIcon =
        <>

            <div className={`${styles.burgerMenu} `}>
                <nav className={`${styles.nav}`}>
                    <ul className={`${styles.ul}`}>
                        <li className={`${styles.li}`}><Link to="/" onClick={() => setOpen(!open)}>ACCUEIL</Link></li>
                        <LineNav />
                        <li className={`${styles.li}`} ><Link to="/presentation" onClick={() => setOpen(!open)}> L'ASSO</Link></li>
                        <LineNav />
                        <li className={`${styles.li}`}><Link to="/ludotheque" onClick={() => setOpen(!open)}>LA LUDOTHEQUE</Link></li>
                        <LineNav />
                        <li className={`${styles.li}`}><Link onClick={() => setOpen(!open)}>CONTACT</Link></li>
                        <LineNav />
                        <li className={`${styles.li}`}><Link onClick={() => setOpen(!open)}>FORUM</Link></li>
                        <LineNav />
                        <li className={`${styles.li}`}><Link onClick={() => setOpen(!open)}>MON COMPTE</Link></li>
                    </ul>
                </nav>

                <Contact />
            </div>




            <div
                className={`${styles.icon}`}
                onClick={() => setOpen(!open)}>
                <i className="fa-solid fa-circle-xmark"></i>
            </div>
        </>

    return (
        <div>
            {open ? CloseIcon : HamburgerIcon}
        </div>

    )
}