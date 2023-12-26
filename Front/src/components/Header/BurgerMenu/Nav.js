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
                    <li className={`${styles.li}`}><Link to="/" onClick={() => setOpen(!open)} title="Redirection vers l'accueil">ACCUEIL</Link></li>
                    <LineNav />
                    <li className={`${styles.li}`} ><Link to="/presentation" onClick={() => setOpen(!open)} title="Redirection vers la présentationde l'association"> L'ASSO</Link></li>
                    <LineNav />
                    <li className={`${styles.li}`}><Link to="/ludotheque" onClick={() => setOpen(!open)} title="Redirection vers la ludothèque de l'association">LUDOTHEQUE</Link></li>
                    <LineNav />
                    <li className={`${styles.li}`}><Link to="/contact" title="Redirection vers la page Contact" onClick={() => setOpen(!open)}>CONTACT</Link></li>
                    <LineNav />
                    <li className={`${styles.li}`}><Link to="/discussion" onClick={() => setOpen(!open)} title="Redirection vers l'espace disccussion">DISCUSSION</Link></li>
                    <LineNav />
                    <li className={`${styles.li}`}>
                        {user ? (
                            <Link to="/profile" title="Redirection vers la gestion du profil" onClick={() => setOpen(!open)}>MON COMPTE</Link>
                        ) : (
                            <Link to="/login" title="Redirection vers la connexion" onClick={() => setOpen(!open)}>MON COMPTE</Link>)}
                    </li>
                    <LineNav />
                    {user?.role === 'admin' &&
                        <li className={`${styles.li}`}><Link onClick={() => setOpen(!open)} title="Redirection vers la page administration du site" to="/admin">ADMINISTRATION</Link></li>
                    }

                </ul>
            </nav>
            <Contact />
        </>
    );
};