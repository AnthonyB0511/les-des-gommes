import styles from "./Account.module.scss";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Login from "../Forms/Login";
import Register from "../Forms/Register";
import { userContext } from "../../context/userContext";
export default function Account({ getUser, user, setUser }) {
    const [seeForm, setSeeForm] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [viewForm, setViewForm] = useState(false);
    /**
     * fonction qui permet de voir le form de login quand 
     */
    function seeLoginForm() {
        if (seeForm === "login") {
            setSeeForm("");
        } else {
            setSeeForm("login");
        }

    }
    function seeRegisterForm() {
        setSeeForm("register");
    }
    function closeForm() {
        setSeeForm("");

    }
    const list = useRef();
    const [previewImage, setPreviewImage] = useState(null);
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

        {user ? (
            <div className={`${styles.icon}`}
                onClick={() => setIsOpen(!isOpen)}>
                {/* <i className="fa-solid fa-circle-user"></i> */}
                <img src={previewImage} className={`${styles.image}`} alt="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;avatar" />
                <div className={`${styles.check}`}>
                    <i className="fa-solid fa-circle-check"></i>
                </div>
                {/* {isOpen && */}
                <ul className={`${styles.profile}`}
                    ref={list}
                    style={isOpen ? { opacity: 0.95, transform: "translateY(0) ", visibility: "visible" } : { opacity: 0, transform: "translateY(100%)", visibility: "hidden" }}>
                    <>
                        <li className={`${styles.li}`}>
                            <Link
                                to="/profile"
                                onClick={() => setIsOpen(!isOpen)}
                                state={user}
                            >
                                <button className={`${styles.btn}`}>
                                    Gestion du profil
                                </button>
                            </Link>
                        </li>
                        <li className={`${styles.li}`}>
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

            </div>


        ) : (
            <>
                <div className={`${styles.icon}`}
                    onClick={seeLoginForm}>
                    <i className="fa-solid fa-circle-user"></i>
                </div>

                {seeForm === "login" ? (
                    <Login
                        seeRegisterForm={seeRegisterForm}
                        closeForm={closeForm}
                        getUser={getUser}
                        setUser={setUser}
                        user={user} />
                ) :
                    seeForm === "register" ? (
                        <Register
                            seeLoginForm={seeLoginForm}
                            closeForm={closeForm} />
                    ) : (
                        (null))

                }




            </>
        )
        }
    </>
    );
};