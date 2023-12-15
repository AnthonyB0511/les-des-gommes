import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { ApiContext } from "../../context";
import styles from "../Security/ForgotPassword.module.scss";


const ConfirmAdressRegister = () => {

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
        setFeedBack("");
        try {
            const response = await fetch(
                `${BASE_API_URL}/users/confirmAdress/${values.email}`
            );
            if (response.ok) {
                setFeedBackGood(`Un mail avec un lien pour confirmer l'inscription a été envoyé`);
                setTimeout(() => {
                    navigate("/");
                }, 3000);
            } else {
                setFeedBack("Cette adresse mail est déjà utilisée sur ce site.");
            }
            ;
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit(submit)} className={`${styles.forgotPassword}`}>
                <div className="d-flex flex-column mb10">
                    <label htmlFor="email" className="mb10">
                        Votre mail
                    </label>
                    <input type="email" id="email" {...register("email")} />
                    {errors?.email && (
                        <p className={`feedback`}>{errors.email.message}</p>
                    )}
                </div>

                {feedback && <p className={`form-error mb20`}>{feedback}</p>}
                {feedbackGood && (
                    <p className={`feedbackGoodLight mb20`}>{feedbackGood}</p>
                )}
                <button type="submit" className="btn" disabled={isSubmitting}>
                    Recevoir un mail
                </button>
            </form>
        </>
    );
};

export default ConfirmAdressRegister;
