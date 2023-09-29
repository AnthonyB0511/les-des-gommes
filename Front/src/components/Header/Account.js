import styles from "./Account.module.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import Login from "../Forms/Login";
import Register from "../Forms/Register";
import { motion } from "framer-motion";
export default function Account({ getUser, user, setUser }) {
    const [seeForm, setSeeForm] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    function seeLoginForm() {
        setSeeForm("login");
    }
    function seeRegisterForm() {
        setSeeForm("register");
    }
    function closeForm() {
        setSeeForm("");
    }


    return (<>

        {user ? (
            <div className={`${styles.icon}`}
                onClick={() => setIsOpen(!isOpen)}>

                <i className="fa-solid fa-circle-user"></i>
                <div className={`${styles.check}`}>
                    <i className="fa-solid fa-circle-check"></i>
                </div>
                {isOpen &&
                    <ul className={`${styles.profile}`}>
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
                }

            </div>


        ) : (
            <div>
                {seeForm === "login" ? (
                    <Login
                        seeRegisterForm={seeRegisterForm}
                        closeForm={closeForm}
                        getUser={getUser}
                        setUser={setUser}
                        user={user} />
                ) : (
                    seeForm === "register" ? (
                        <Register
                            seeLoginForm={seeLoginForm}
                            closeForm={closeForm} />
                    ) : (
                        <div className={`${styles.icon}`}
                            onClick={seeLoginForm}>
                            <i className="fa-solid fa-circle-user"></i>
                        </div>
                    ))
                }
            </div>
        )}

    </>
    );
};