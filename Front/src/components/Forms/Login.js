import styles from "./Login.module.scss"
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormTitle } from "../Header/FormTitle"
import { LineNav } from "../Header/BurgerMenu/LineNav"
import { Button } from "../utils/Button";
import { AnimatePresence, motion } from "framer-motion";



export default function Login({ seeRegisterForm, closeForm, getUser, user }) {
    const yupSchema = yup.object({
        email: yup.string().email("Ceci n'est pas une adresse mail valide"),
        password: yup.string().required("Le mot de passe est obligatoire"),
    });
    const defaultValues = {
        password: "",
        email: "",
    }
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues,
        // mode: "onChange",
        resolver: yupResolver(yupSchema),
    });

    const [feedback, setFeedback] = useState("")
    const [feedbackGood, setFeedbackGood] = useState("")



    async function submit(values) {
        setFeedback("")

        try {
            const response = await fetch('http://localhost:8000/api/users/login', {
                method: "POST",
                body: JSON.stringify(values),
                headers: { "Content-type": "application/json" }
            })
            if (response.ok) {
                const userBack = await response.json();
                if (userBack.message) {
                    setFeedback(userBack.message)
                } else {
                    setFeedbackGood("Félicitations vous allez être connecter");
                    reset(defaultValues);
                    let user = {};
                    user.firstname = userBack[0].firstname;
                    user.username = userBack[0].username;
                    user.email = userBack[0].email;
                    user.name = userBack[0].name;
                    getUser(user);
                    setTimeout(() => {
                        closeForm();
                    }, 1500)
                }
            }
        } catch (error) {
            console.error(error)
        }

    }



    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                exit={{ opacity: 0 }}
                className={`d-flex flex-column justify-content-center align-items-center mb20 ${styles.form}`}>
                <div
                    className={`${styles.icon}`}
                    onClick={closeForm}
                >
                    <i className="fa-solid fa-circle-xmark"></i>
                </div>
                <FormTitle textTitle="Se connecter" />
                <LineNav />
                <form onSubmit={handleSubmit(submit)} className="d-flex flex-column card p20 mb20">

                    <div className="d-flex flex-column mb20">
                        <label htmlFor="email"> Votre mail</label>
                        <input type="email" id="email"
                            {...register("email")} />
                        {errors?.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
                    </div>
                    <div className="d-flex flex-column mb20">
                        <label htmlFor="password">Mot de passe</label>
                        <input type="password" id="Password"
                            {...register("password")} />
                        {errors?.password && <p style={{ color: "red" }}>{errors.password.message}</p>}
                    </div>
                    <div className="d-flex  mb20
                align-items-center justify-content-center">
                        <label htmlFor="remember" className={`${styles.labelLogin}`}>Se souvenir de moi</label>
                        <input type="checkbox" id="remember"
                        />

                    </div>


                    {feedback && <p className={`${styles.feedback}`}>{feedback}</p>}
                    {feedbackGood && <p className={`${styles.feedbackGood}`}>{feedbackGood}</p>}
                    <div>
                        <button
                            className={`${styles.button}`}
                        >Connexion
                        </button>
                    </div>
                </form>
                <div className={`${styles.not}`}>
                    <p>Vous n'avez pas encore de compte ?</p>
                    {/* <Button
                    onClick={seeRegisterForm}
                    needButton={true}
                    txtButton="Cliquer ICI" /> */}
                    <button
                        onClick={seeRegisterForm}
                        className={`${styles.button}`}>CLIQUER ICI</button>
                </div>
                <div className={`${styles.forget}`}>Vous avez oublié votre mot de passe ?</div>
            </motion.div>
        </AnimatePresence>
    )
}
