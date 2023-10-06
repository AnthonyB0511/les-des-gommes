import styles from "./Account.module.scss";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Login from "../Forms/Login";
import Register from "../Forms/Register";
export default function Account({ getUser, user, setUser }) {
    const [seeForm, setSeeForm] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [viewForm, setViewForm] = useState(false);

    function seeLoginForm() {
        if (seeForm === "login") {
            setSeeForm("");
            setViewForm(!viewForm);
        } else {
            setSeeForm("login");
            setViewForm(!viewForm);
        }

    }
    function seeRegisterForm() {
        setSeeForm("register");
    }
    function closeForm() {
        setSeeForm("");
        setViewForm(!viewForm);
    }
    const list = useRef();
    const login = useRef();
    const register = useRef();
    return (<>

        {user ? (
            <div className={`${styles.icon}`}
                onClick={() => setIsOpen(!isOpen)}>
                <i className="fa-solid fa-circle-user"></i>
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
                ) : (
                    seeForm === "register" ? (<Register
                        seeLoginForm={seeLoginForm}
                        closeForm={closeForm} />
                    ) : (null)

                )}




            </>
        )
        }
    </>
    );
};