import styles from "./Account.module.scss";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Login from "../Forms/Login";
import Register from "../Forms/Register";
export default function Account({ getUser, user, setUser }) {
    // gére quel formulaire sera visible (utiliser dans deux fonctions)
    const [seeForm, setSeeForm] = useState("");
    // gérer l'état d'ouverture du menu déroulant une fois connecté
    const [isOpen, setIsOpen] = useState(false);
    // gérer la fermeture d'un formulaire quand on ouvre un
    const [viewForm, setViewForm] = useState(false);
    /**
     * Function qui permet de gérer l'affichage et/ou la fermeture du form Login
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
     * Fonction qui permet de gérer l'affichage du form Register
     */
    function seeRegisterForm() {
        setSeeForm("register");
    }
    /**
     * Fonction qui permet de quitter les deux formulaires (register & form)
     */
    function closeForm() {
        setSeeForm("");

    }
    // utilise la réf list pour gérer l'affichage avec animation de l'élément liste (Gestion de profil et déco)
    const list = useRef();
    // useState pour l'état des images
    const [previewImage, setPreviewImage] = useState(null);
    /**
     * récupère l'img de la base de données (celle de base ou celle enregistré par le user)
     */
    useEffect(() => {
        async function getDefaultImage() {
            let response;
            if (user && user.blobby) {
                response = await fetch(
                    `http://localhost:8000/api/profile/getAvatarFromUser?id=${user.idUser}`
                );
            } else {
                response = await fetch(
                    `http://localhost:8000/api/profile/getDefaultImage`
                );
            }
            const imgDefaultFromBack = await response.json();

            console.log({ imgDefaultFromBack });
            const uint8Array = new Uint8Array(imgDefaultFromBack.blobby.data);
            console.log({ uint8Array });
            const blob = new Blob([uint8Array]);
            console.log({ blob });
            const urlImage = URL.createObjectURL(blob);
            console.log({ urlImage });
            fetch(urlImage)
                .then((response) => response.text())
                .then((text) => {
                    console.log({ text });
                    setPreviewImage(text);
                });
        }
        getDefaultImage();
    }, [user]);

    return (<>
        {/* gestion de l'affichage ; un user est-il connecté ? */}

        {user ? (
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
                    style={isOpen ? { opacity: 0.95, transform: "translateY(0) ", visibility: "visible" } : { opacity: 0, transform: "translateY(100%)", visibility: "hidden" }}>
                    <>
                        <li className={`${styles.li}`}>
                            <Link
                                to="/profile"
                                // au moment du clic on referme l'élément
                                onClick={() => setIsOpen(!isOpen)}
                                // on renvoie les information du user à la page profile
                                state={user}
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
                                    onClick={() => setUser(null)}>
                                    Se déconnecter
                                </button>
                            </Link>
                        </li>
                    </>
                </ul>
                {/* } */}

            </section>


        ) : (
            // aucun user n'est connecté
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