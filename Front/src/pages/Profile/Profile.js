import styles from "./Profile.module.scss";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Title } from "../../components/utils/Title";
import { Line } from "../../components/utils/Line";

export default function Profile() {
    const location = useLocation();
    const user = location.state;;
    const [feedback, setFeedback] = useState("");
    const [feedbackGood, setFeedbackGood] = useState("");
    const navigate = useNavigate();
    const yupSchema = yup.object({
        username: yup
            .string()
            .required("Ce champ est obligatoire")
            .min(2, "Le champ doit contenir au moins 2 caractères")
            .max(12),
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
        name: user.name,
        firstname: user.firstname,
        username: user.username,
        email: user.email,
        password: user.password,
        confirmPassword: user.password,
        idUser: user.idUser
    };
    const {
        register,
        handleSubmit,
        // reset,
        formState: { errors, isSubmitted }
    } = useForm({
        defaultValues,
        mode: "onChange",
        resolver: yupResolver(yupSchema),
    });
    async function submit(values) {
        console.log(values);
        setFeedback("");
        try {
            const response = await fetch("http://localhost:8000/api/users/modifyUser", {
                method: "PATCH",
                body: JSON.stringify(values),
                headers: { "Content-type": "application/json" }
            });

            if (response.ok) {
                const userBack = await response.json();
                if (userBack.message) {
                    setFeedback(userBack.message);
                } else {
                    setFeedbackGood(userBack.messageGood);
                    setTimeout(() => {
                        navigate("/");
                    }, 3000);
                }
            }
        } catch (error) {
            console.error(error);
        }
    }
    console.log(user);

    return (
        <>
            <Title title="Votre Profil" />
            <Line />
            <div className={`${styles.form}`}>
                <form onSubmit={handleSubmit(submit)}>
                    <div className={`${styles.container}`}>
                        <div className={`${styles.content} mb20`}>
                            <label htmlFor="name">Nom</label>
                            <input {...register("name")}
                                type="text" id="name" disabled="disabled" />

                        </div>

                        <div className={`${styles.content} mb20`}>
                            <label htmlFor="firstname">Prénom</label>
                            <input {...register("firstname")}
                                type="text" id="firstname" disabled="disabled" />
                        </div>
                    </div>
                    <div className="d-flex flex-column mb20">
                        <label htmlFor="mail">E-mail</label>
                        <input {...register("email")}
                            type="email" id="email" />
                        {errors?.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
                    </div>


                    <div className="d-flex flex-column mb20">
                        <label htmlFor="username">Nom du profil</label>
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

                    <button disabled={isSubmitted} className={`${styles.button}`}>Enregistrer les modifications</button>
                    {feedback && <p className={`${styles.feedback}`}>{feedback}</p>}
                    {feedbackGood && <p className={`${styles.feedbackGood}`}>{feedbackGood}</p>}

                </form>
            </div>
        </>
    );
}
