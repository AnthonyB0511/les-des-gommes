import styles from "./Account.module.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import Login from "../Forms/Login";
import Register from "../Forms/Register";
import { motion } from "framer-motion";
export default function Account({ getUser, user, setUser }) {
    const [seeForm, setSeeForm] = useState("");
    const [openProfile, setOpenProfile] = useState(false);
    function seeLoginForm() {
        setSeeForm("login");
    }
    function seeRegisterForm() {
        setSeeForm("register");
    }
    function closeForm() {
        setSeeForm("")
    }
    const [isOpen, setIsOpen] = useState(false);

    return (<>
        {user ? (
            <motion.div
                className={`${styles.icon}`}
                initial={false}
                animate={isOpen ? "open" : "closed"}>
                <motion.i
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setIsOpen(!isOpen)}
                    className="fa-solid fa-circle-user"></motion.i>
                <div className={`${styles.check}`}>
                    <i className="fa-solid fa-circle-check"></i>
                </div>
                <motion.ul
                    className={`${styles.profile}`}
                    variants={{
                        open: {
                            clipPath: "inset(0% 0% 0% 0% round 10px)",
                            transition: {
                                type: "spring",
                                bounce: 0,
                                duration: 0.7,
                                delayChildren: 0.3,
                                staggerChildren: 0.05
                            }
                        }
                        ,
                        closed: {
                            clipPath: "inset(10% 50% 90% 50% round 10px)",
                            transition: {
                                type: "spring",
                                bounce: 0,
                                duration: 0.3
                            }
                        }
                    }}

                >
                    <motion.li variants={{
                        open: {
                            opacity: 1,
                            y: 0,
                            transition: { type: "spring", stiffness: 300, damping: 24 }
                        },
                        closed: { opacity: 0, y: 20, transition: { duration: 0.2 } }
                    }}
                        className={`${styles.li}`}>
                        <Link
                            to="/profile"
                            onClick={() => setIsOpen(!isOpen)}
                            user={user}>
                            <button className={`${styles.btn}`}
                                user={user}> Gestion du profil</button>
                        </Link>
                    </motion.li>
                    <motion.li variants={{
                        open: {
                            opacity: 1,
                            y: 0,
                            transition: { type: "spring", stiffness: 300, damping: 24 }
                        },
                        closed: { opacity: 0, y: 20, transition: { duration: 0.2 } }
                    }}
                        className={`${styles.li}`}>
                        <button
                            className={`${styles.btn}`}
                            onClick={() => setUser(null)}
                        >Se déconnecter</button>
                    </motion.li>
                </motion.ul>

            </motion.div>


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
    )
}