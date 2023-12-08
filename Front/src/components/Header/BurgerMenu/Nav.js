import styles from "./Nav.module.scss";
import { LineNav } from "./LineNav";
import { Contact } from "../../Footer/components/Contact";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { useContext } from "react";
/**
 * Navigation, useState closes the menu with a click on the Link
 * @param {boolean} open,setopen
 * @returns navigation
 */
export default function Nav({ open, setOpen }) {
    const { user } = useContext(AuthContext);
    return (
        <>
            <nav className={`${styles.nav}`}>
                <ul className={`${styles.ul}`}>
                    <li className={`${styles.li}`}><Link to="/" onClick={() => setOpen(!open)}>ACCUEIL</Link></li>
                    <LineNav />
                    <li className={`${styles.li}`} ><Link to="/presentation" onClick={() => setOpen(!open)}> L'ASSO</Link></li>
                    <LineNav />
                    <li className={`${styles.li}`}><Link to="/ludotheque" onClick={() => setOpen(!open)}>LUDOTHEQUE</Link></li>
                    <LineNav />
                    <li className={`${styles.li}`}><Link to="/contact" onClick={() => setOpen(!open)}>CONTACT</Link></li>
                    <LineNav />
                    <li className={`${styles.li}`}><Link to="/discussion" onClick={() => setOpen(!open)}>DISCUSSION</Link></li>
                    <LineNav />
                    <li className={`${styles.li}`}>
                        {user ? (
                            <Link to="/profile" onClick={() => setOpen(!open)}>MON COMPTE</Link>
                        ) : (
                            <Link to="/login" onClick={() => setOpen(!open)}>MON COMPTE</Link>)}
                    </li>
                    <LineNav />
                    {user?.role === 'admin' &&
                        <li className={`${styles.li}`}><Link onClick={() => setOpen(!open)} to="/admin">ADMINISTRATION</Link></li>
                    }

                </ul>
            </nav>
            <Contact />
        </>
    );
};