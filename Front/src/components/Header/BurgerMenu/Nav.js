import styles from "./Nav.module.scss";
import { LineNav } from "./LineNav";
import { Contact } from "../../Footer/components/Contact";
import { NavLink } from "react-router-dom";
/**
 * Navigation, useState closes the menu with a click on the Link
 * @param {boolean} open,setopen
 * @returns navigation
 */
export default function Nav({ open, setOpen }) {
    return (
        <>
            <nav className={`${styles.nav}`}>
                <ul className={`${styles.ul}`}>
                    <li className={`${styles.li}`}><NavLink to="/" onClick={() => setOpen(!open)}>ACCUEIL</NavLink></li>
                    <LineNav />
                    <li className={`${styles.li}`} ><NavLink to="/presentation" onClick={() => setOpen(!open)}> L'ASSO</NavLink></li>
                    <LineNav />
                    <li className={`${styles.li}`}><NavLink to="/ludotheque" onClick={() => setOpen(!open)}>LA LUDOTHEQUE</NavLink></li>
                    <LineNav />
                    <li className={`${styles.li}`}><NavLink to="/contact" onClick={() => setOpen(!open)}>CONTACT</NavLink></li>
                    <LineNav />
                    <li className={`${styles.li}`}><NavLink onClick={() => setOpen(!open)}>FORUM</NavLink></li>
                    <LineNav />
                    <li className={`${styles.li}`}><NavLink to="/admin" onClick={() => setOpen(!open)}>MON COMPTE</NavLink></li>
                </ul>
            </nav>
            <Contact />
        </>
    );
};