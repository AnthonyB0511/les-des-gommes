import styles from "./Login.module.scss";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormTitle } from "../Header/components/FormTitle";
import { LineNav } from "../Header/BurgerMenu/LineNav";
import { signIn } from "../../apis/users";





/**
 * 
 * @param {Boolean} seeRegisterForm
 * @param {Boolean} closeForm
 * @param {getUser} function 
 * @param {Object} user
 * @returns 
 */
export default function Login({ seeRegisterForm, closeForm, getUser, user, setUser }) {
    /**
     * yupschema to validate the form Login with params
     */
    const yupSchema = yup.object({
        email: yup.string().email("Ceci n'est pas une adresse mail valide"),
        password: yup.string().required("Le mot de passe est obligatoire"),
    });
    const defaultValues = {
        password: "",
        email: "",
    };
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        clearErrors,
        setError
    } = useForm({
        defaultValues,
        // mode: "onChange",
        resolver: yupResolver(yupSchema),
    });
    /**
     * useState shows the response of server at user
     */
    const [feedback, setFeedback] = useState("");
    const [feedbackGood, setFeedbackGood] = useState("");


    /**
     * function send to the server the datas of the user
     * @param {Object} values 
     */
    async function submit(values) {
        try {
            clearErrors();
            setUser(await signIn(values));
            console.log(user);

        } catch (error) {
            setError("generic", { type: "generic", message: error });
        }
        //     setFeedback("");
        //     try {
        //         const response = await fetch('http://localhost:8000/api/users/login', {
        //             method: "POST",
        //             body: JSON.stringify(values),
        //             headers: { "Content-type": "application/json" }
        //         });
        //         const userBack = await response.json();
        //         if (response.ok) {
        //             setFeedbackGood("Vous allez être connecté");
        //             setTimeout(() => {
        //                 let user = {};
        //                 user.firstname = userBack.firstname;
        //                 user.username = userBack.username;
        //                 user.email = userBack.email;
        //                 user.name = userBack.name;
        //                 user.password = userBack.password;
        //                 user.idUser = userBack.idUser;
        //                 user.blobby = userBack.blobby;
        //                 getUser(user);
        //                 closeForm();
        //             }, 2000);
        //         } else {
        //             setFeedback("La combinaison email/mot de passe ne correspond pas");
        //         }
        //         // if (response.ok) {
        //         //     const backResponse = await response.json();
        //         //     if (userBack.message) {
        //         //         setFeedback(userBack.message);
        //         //     } else {
        //         //         setFeedbackGood("Vous allez être connecter");

        //         //         reset(defaultValues);
        //         //         ;
        //         //         setTimeout(() => {
        //         //             let user = {};
        //         //             user.firstname = userBack[0].firstname;
        //         //             user.username = userBack[0].username;
        //         //             user.email = userBack[0].email;
        //         //             user.name = userBack[0].name;
        //         //             user.password = userBack[0].password;
        //         //             user.idUser = userBack[0].idUser;
        //         //             user.blobby = userBack[0].blobby;
        //         //             getUser(user);
        //         //             closeForm();
        //         //         }, 2000);
        //         //     }
        //         // }
        //     } catch (error) {
        //         console.error(error);
        //     }

        // }
        // console.log(user);
    }


    return (

        <main className={`d-flex flex-column justify-content-center align-items-center mb20 ${styles.form}`}>
            <div
                className={`${styles.icon}`}
                onClick={closeForm}
            >
                <i className="fa-solid fa-circle-xmark"></i>
            </div>
            <FormTitle textTitle="Se connecter" />
            <LineNav />
            <form onSubmit={handleSubmit(submit)} className="d-flex flex-column card p20 mb20">
                {/* mail user */}
                <section className="d-flex flex-column mb20">
                    <label htmlFor="email"> Votre mail</label>
                    <input type="email" id="email"
                        {...register("email")} />
                    {errors?.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
                </section>
                {/* password user */}
                <section className="d-flex flex-column mb20">
                    <label htmlFor="password">Mot de passe</label>
                    <input type="password" id="Password"
                        {...register("password")} />
                    {errors?.password && <p style={{ color: "red" }}>{errors.password.message}</p>}
                </section>
                <section className={`${styles.remember}`}>
                    <label htmlFor="remember">Se souvenir de moi</label>
                    <input type="checkbox" id="remember" className="ml10 mb20" />

                </section>

                {/* //feedback for user */}
                {feedback && <p className={`${styles.feedback}`}>{feedback}</p>}
                {feedbackGood && <p className={`${styles.feedbackGood}`}>{feedbackGood}</p>}
                {/* //button Connexion */}
                <section>
                    <button
                        className="btn"
                    >Connexion
                    </button>
                </section>
            </form>
            {/* //to go at register form */}
            <section className={`${styles.not}`}>
                <p>Vous n'avez pas encore de compte ?</p>
                <button
                    onClick={seeRegisterForm}
                    className="btn">CLIQUER ICI</button>
            </section>
            <article className={`${styles.forget}`}>Vous avez oublié votre mot de passe ?</article>
        </main>

    );
}
