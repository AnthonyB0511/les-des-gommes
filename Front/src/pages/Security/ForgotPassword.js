import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { ApiContext } from "../../context";
import { Title } from "../../components/utils/Title";
import styles from "./ForgotPassword.module.scss";

import { Line } from "../../components/utils/Line";

const ForgotPassword = () => {

    const [feedback, setFeedBack] = useState("");
    const [feedbackGood, setFeedBackGood] = useState("");
    const BASE_API_URL = useContext(ApiContext);
    const navigate = useNavigate();

    const yupSchema = yup.object({
        email: yup
            .string()
            .required("Le champ est obligatoire")
            .matches(
                /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                "Votre email n'est pas valide"
            ),
    });

    const defaultValues = {
        email: "",
    };

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues,
        mode: "onChange",
        resolver: yupResolver(yupSchema),
    });
    async function submit(values) {
        try {
            const response = await fetch(
                `${BASE_API_URL}/users/mailToReset/${values.email}`
            );
            if (response.ok) {
                setFeedBackGood(`Un mail de réinitialisation été envoyé sur ${values.email}`);
                setTimeout(() => {
                    navigate("/");
                }, 3000);
            } else {
                setFeedBack("Cette adresse mail n'est pas enregistrée");
            }
            ;
        } catch (error) {

            console.error(error);
        }
    }
    return (
        <>
            <Title title="Réinitialisation du mot de passe" />
            <Line />
            <form onSubmit={handleSubmit(submit)} className={`${styles.forgotPassword}`}>
                <div className="d-flex flex-column mb10">
                    <label htmlFor="email" className="mb10">
                        Email
                    </label>
                    <input type="email" id="email" {...register("email")} title="Renseigner votre email" />
                    {errors?.email && (
                        <p className={`feedback`}>{errors.email.message}</p>
                    )}
                </div>

                {feedback && <p className={`feedback mb20`}>{feedback}</p>}
                {feedbackGood && (
                    <p className={`feedbackGoodLight mb20`}>{feedbackGood}</p>
                )}
                <button type="submit" disabled={isSubmitting} className="btn" title="Soumettre le formulaire" >
                    Envoyer
                </button>
            </form>
            <Line /></>
    );
};

export default ForgotPassword;
