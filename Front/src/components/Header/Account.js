import styles from "./Account.module.scss";
import { useState, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
export default function Account() {

    // gérer l'état d'ouverture du menu déroulant une fois connecté
    const [isOpen, setIsOpen] = useState(false);
    // const [noLog, setNoLog] = useState(false);
    const log = useRef();

    /**
     * function shows the p with "vous allez être déconnecté"
     * With the Timeout the user becomes null, the form close and the P don't show
     */
    const { user, logout, unlogged } = useContext(AuthContext);

    // useRef allows the animation of the list
    const list = useRef();



    return (
        //user is logged
        <>
            {user ? (
                <>
                    <section className={`${styles.icon}`}
                        onClick={() => setIsOpen(!isOpen)}>
                        {user.avatar ? (<img src={`http://localhost:8000/avatar/${user.avatar}`} className={`${styles.image}`} alt="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;avatar" />) : (<i className="fa-solid fa-circle-user"></i>)}
                        <div className={`${styles.check}`}>
                            <i className="fa-solid fa-circle-check"></i>
                        </div>
                        {/*au clic la liste s'affiche avec animation pour la gestion de profil ou la déconnexion */}
                        <ul className={`${styles.profile}`}
                            ref={list}
                            style={isOpen ? { opacity: 1, transform: "translateY(0) ", visibility: "visible" } : { opacity: 0, transform: "translateY(100%)", visibility: "hidden" }}>
                            <>
                                <li className={`${styles.li}`}>
                                    <Link
                                        to="/profile"
                                        // au moment du clic on referme l'élément
                                        onClick={() => setIsOpen(!isOpen)}
                                    >
                                        <button className={`${styles.btn}`}>
                                            Gestion du profil
                                        </button>
                                    </Link>
                                </li>
                                <li className={`${styles.li}`}>
                                    {/* la déconnexion amène directement à la page d'accueil */}
                                    <Link to="/">
                                        <button
                                            className={`${styles.btn}`}
                                            onClick={logout}>
                                            Se déconnecter
                                        </button>
                                    </Link>

                                </li>

                            </>
                        </ul>
                        {/* } */}

                    </section>
                    <section className={`${styles.nolog}`}>
                        <p ref={log}
                            style={unlogged ? { opacity: 1, transform: "translateY(0) ", visibility: "visible" } : { opacity: 0, transform: "translateY(100%)", visibility: "hidden" }}>Déconnexion ...</p></section>
                </>


            ) : (
                // no user
                <>
                    <section className={`${styles.icon}`}>
                        <Link to="/login">
                            <i className="fa-solid fa-circle-user"></i></Link>
                    </section>

                    {/* {seeForm === "login" ? (
                        <Login
                            // on passe en props la façon de passer de la co à l'inscription
                            // la gestion de la fermeture du form
                            seeRegisterForm={seeRegisterForm}
                            closeForm={closeForm} />
                    ) :
                        seeForm === "register" ? (<Register
                            // repasser au form de connexion et gestion de la fermeture
                            seeLoginForm={seeLoginForm}
                            closeForm={closeForm} />
                        ) : (null) */}
                    {/* 
                    } */}
                </>
            )
            }
        </>
    );
};