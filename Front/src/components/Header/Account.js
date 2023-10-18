import styles from "./Account.module.scss";
import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Login from "../Forms/Login";
import Register from "../Forms/Register";
export default function Account({ getUser, user, setUser }) {
    // gére quel formulaire sera visible (utiliser dans deux fonctions)
    const [seeForm, setSeeForm] = useState("");
    // gérer l'état d'ouverture du menu déroulant une fois connecté
    const [isOpen, setIsOpen] = useState(false);
    // gérer la fermeture d'un formulaire quand on ouvre un
    const [viewForm, setViewForm] = useState(false);
    const [noLog, setNoLog] = useState(false);
    const log = useRef();
    /**
     * Function shows or hiddes the login form
     */
    function seeLoginForm() {
        if (seeForm === "login") {
            setSeeForm("");
            setViewForm(!viewForm);
        } else {
            setSeeForm("login");
            setViewForm(!viewForm);
        }

    }
    /**
     * Function shows the register form
     */
    function seeRegisterForm() {
        setSeeForm("register");
    }
    /**
     * Functions closes the forms
     */
    function closeForm() {
        setSeeForm("");
    }
    /**
     * function shows the p with "vous allez être déconnecté"
     * With the Timeout the user becomes null, the form close and the P don't show
     */
    function unLogged() {
        setNoLog(true);
        setTimeout(() => {
            setUser(null);
            setNoLog(false);
            closeForm();

        }, 2000);
    }
    // useRef allows the animation of the list
    const list = useRef();
    // useState keeps the picture in memory
    const [previewImage, setPreviewImage] = useState(null);
    /**
     * recover the avatar (on default or not) from user
     */
    useEffect(() => {
        async function getDefaultImage() {
            if (user) {
                let response;
                if (user.blobby) {
                    response = await fetch(
                        `http://localhost:8000/api/profile/getAvatarFromUser?id=${user.idUser}`
                    );
                } else {
                    response = await fetch(
                        `http://localhost:8000/api/profile/getDefaultImage`
                    );
                }
                const imgDefaultFromBack = await response.json();
                const uint8Array = new Uint8Array(imgDefaultFromBack.blobby.data);
                const blob = new Blob([uint8Array]);

                const urlImage = URL.createObjectURL(blob);
                fetch(urlImage)
                    .then((response) => response.text())
                    .then((text) => {
                        setPreviewImage(text);
                    });
            }
        }
        getDefaultImage();
    }, [user]);

    return (
        //user is logged
        <>
            {user ? (
                <>
                    <section className={`${styles.icon}`}
                        onClick={() => setIsOpen(!isOpen)}>
                        {/* <i className="fa-solid fa-circle-user"></i> */}
                        <img src={previewImage} className={`${styles.image}`} alt="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;avatar" />
                        <div className={`${styles.check}`}>
                            <i className="fa-solid fa-circle-check"></i>
                        </div>
                        {/*au clic la liste s'affiche avec animation pour la gestion de profil ou la déconnexion */}
                        <ul className={`${styles.profile}`}
                            ref={list}
                            style={isOpen ? { opacity: 1, transform: "translateY(0) ", visibility: "visible" } : { opacity: 0, transform: "translateY(100%)", visibility: "hidden" }}>
                            <>
                                <li className={`${styles.li}`}>
                                    <NavLink
                                        to="/profile"
                                        // au moment du clic on referme l'élément
                                        onClick={() => setIsOpen(!isOpen)}
                                        // on renvoie les information du user à la page profile
                                        state={user} image={previewImage}
                                    >
                                        <button className={`${styles.btn}`}>
                                            Gestion du profil
                                        </button>
                                    </NavLink>
                                </li>
                                <li className={`${styles.li}`}>
                                    {/* la déconnexion amène directement à la page d'accueil */}
                                    <NavLink to="/">
                                        <button
                                            className={`${styles.btn}`}
                                            onClick={unLogged}>
                                            Se déconnecter
                                        </button>
                                    </NavLink>

                                </li>

                            </>
                        </ul>
                        {/* } */}

                    </section>
                    <section className={`${styles.nolog}`}
                    > <p ref={log}
                        style={noLog ? { opacity: 1, transform: "translateY(0) ", visibility: "visible" } : { opacity: 0, transform: "translateY(100%)", visibility: "hidden" }}>Déconnexion ...</p></section>
                </>


            ) : (
                // no user
                <>
                    <section className={`${styles.icon}`}
                        onClick={seeLoginForm}>
                        <i className="fa-solid fa-circle-user"></i>
                    </section>

                    {seeForm === "login" ? (
                        <Login
                            // on passe en props la façon de passer de la co à l'inscription
                            // la gestion de la fermeture du form
                            seeRegisterForm={seeRegisterForm}
                            closeForm={closeForm}
                            getUser={getUser}
                            // méthode pour stocker les 
                            setUser={setUser}
                            user={user} />
                    ) :
                        seeForm === "register" ? (<Register
                            // repasser au form de connexion et gestion de la fermeture
                            seeLoginForm={seeLoginForm}
                            closeForm={closeForm} />
                        ) : (null)

                    }
                </>
            )
            }
        </>
    );
};