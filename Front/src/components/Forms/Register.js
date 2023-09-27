import styles from "./Register.module.scss"
import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { LineNav } from "../Header/BurgerMenu/LineNav";
import { Button } from "../utils/Button";
import { FormTitle } from "../Header/FormTitle";
import { AnimatePresence, motion } from "framer-motion";

export default function Register({ seeLoginForm, closeForm }) {
    const [feedback, setFeedback] = useState("");
    const [feedbackGood, setFeedbackGood] = useState("");
    const [isVisible, setIsVisible] = useState(true)
    const yupSchema = yup.object({
        username: yup
            .string()

            .required("Ce champ est obligatoire")
            .min(2, "Le champ doit contenir au moins 2 caractères")
            .max(12),
        name: yup
            .string()
            .required("Ce champ est obligatoire"),
        firstname: yup
            .string()
            .required("Ce champ est obligatoire"),
        // age: yup
        //     .string()
        //     .required("DOB is Required"),
        // // .test(
        // //     "age",
        // //     "Merci de choisir une date valide",
        // //     (date) => moment().diff(moment(date), "years") >= 15
        // // ),
        email: yup
            .string()
            .required("L'adresse mail est nécessaire pour s'inscrire")
            .email("Ceci n'est pas une adresse mail valide"),
        password: yup
            .string()
            .required("Le mot de passe est obligatoire")
            .min(8, "Mot de passe trop court"),
        confirmPassword: yup
            .string()
            .required("Veuillez confirmer votre mot de passe")
            .oneOf([yup.ref("password", "")],
                "Les mots de passe ne correspondent pas"),
    });

    const defaultValues = {
        name: "",
        firstname: "",
        username: "",
        email: "",
        age: "",
        password: "",
        confirmPassword: "",
    }
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitted }
    } = useForm({
        defaultValues,
        mode: "onChange",
        resolver: yupResolver(yupSchema),
    });

    async function submit(values) {
        console.log(values)
        setFeedback("");
        try {
            const response = await fetch("http://localhost:8000/api/users/register", {
                method: "POST",
                body: JSON.stringify(values),
                headers: { "Content-type": "application/json" }
            })
            console.log(values);
            if (response.ok) {
                const userBack = await response.json();
                if (userBack.message) {
                    setFeedback(userBack.message)
                } else {
                    setFeedbackGood(userBack.messageGood);
                    reset(defaultValues);
                    setTimeout(() => {
                        seeLoginForm();
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
                transition={{ duration: 0.5 }}
                exit={{
                    opacity: 0,
                    delay: 0.3
                }}
                className={`${styles.form}`}>
                <FormTitle textTitle="S'inscrire" />
                <div
                    className={`${styles.icon}`}
                    onClick={closeForm}
                >
                    <i className="fa-solid fa-circle-xmark"></i>
                </div>
                <LineNav />
                <form onSubmit={handleSubmit(submit)}>
                    <div className="d-flex justify-content-between">
                        <div className={`${styles.container}`}>
                            <div className="d-flex flex-column mb20">
                                <label htmlFor="name">Nom</label>
                                <input {...register("name")}
                                    type="text" id="name" />
                                {errors?.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
                            </div>

                            <div className="d-flex flex-column mb20">
                                <label htmlFor="firstname">Prénom</label>
                                <input {...register("firstname")}
                                    type="text" id="firstname" />
                                {errors?.firstname && <p style={{ color: "red" }}>{errors.firstname.message}</p>}
                            </div>
                            <div className="d-flex flex-column mb20">
                                <label htmlFor="age">E-mail</label>

                                <input {...register("email")}
                                    type="email" id="email" />
                                {errors?.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
                            </div>
                        </div>
                        <div className={`${styles.container}`}>
                            {/* <div className="d-flex flex-column mb20">
                            <label htmlFor="age">Age</label>
                            <input {...register("age")}
                                type="date" id="age" />
                            {errors?.age && <p style={{ color: "red" }}>{errors.age.message}</p>}
                        </div> */}
                            <div className="d-flex flex-column mb20">
                                <label htmlFor="username">Nom du profil</label>
                                {/* on déconstruit en rajoutant la value qu'on modifie */}
                                <input {...register("username")}
                                    type="text" id="username" />
                                {errors?.username && <p style={{ color: "red" }}>{errors.username.message}</p>}
                            </div>
                            <div className="d-flex flex-column mb20">
                                <label htmlFor="password">Mot de passe</label>
                                {/* on déconstruit en rajoutant la value qu'on modifie */}
                                <input {...register("password")}
                                    type="password" id="password" />
                                {errors?.password && <p style={{ color: "red" }}>{errors.password.message}</p>}
                            </div>
                            <div className="d-flex flex-column mb20">
                                <label htmlFor="confirmPassword">Confirmation du mot de passe</label>
                                {/* on déconstruit en rajoutant la value qu'on modifie */}
                                <input {...register("confirmPassword")}
                                    type="password" id="confirmPassword" />
                                {errors?.confirmPassword && <p style={{ color: "red" }}>{errors.confirmPassword.message}</p>}
                            </div>
                        </div>
                    </div>
                    <button disabled={isSubmitted} className={`${styles.button}`}>S'inscrire'</button>
                    {feedback && <p className={`${styles.feedback}`}>{feedback}</p>}
                    {feedbackGood && <p className={`${styles.feedbackGood}`}>{feedbackGood}</p>}

                </form>
                <div className={`${styles.not}`}>
                    <p>Vous avez déjà un compte ?</p>

                    <button
                        className={`${styles.button}`}
                        onClick={seeLoginForm}> CLIQUER ICI</button>

                </div>
            </motion.div>
        </AnimatePresence>
    )
}
