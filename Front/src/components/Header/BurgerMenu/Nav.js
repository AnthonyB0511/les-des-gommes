import styles from "./Nav.module.scss";
import { LineNav } from "./LineNav";
import { Contact } from "../../Footer/components/Contact";
import { Link } from "react-router-dom";
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
        </>
    );
};