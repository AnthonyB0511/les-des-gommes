import { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { ApiContext } from "../../context";
import { AuthContext } from "../../context";
import { Title } from "../../components/utils/Title";
import styles from "./ForgotPassword.module.scss";
import { jwtDecode } from 'jwt-decode';

import { Line } from "../../components/utils/Line";

export default function DeleteAccount() {
    const [feedback, setFeedback] = useState("");
    const [feedbackGood, setFeedbackGood] = useState("");
    const [decodedToken, setDecodedToken] = useState(null);
    const BASE_API_URL = useContext(ApiContext);
    const email = new URLSearchParams(window.location.search).get("email");
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);
    const yupSchema = yup.object({
        password: yup
            .string()
            .required("Le champ est obligatoire")
    });
    const defaultValues = {
        password: "",
    };
    useEffect(() => {
        // Récupérer le token depuis le localStorage
        const token = new URLSearchParams(window.location.search).get("token");
        if (token) {
            try {
                // Décoder le token avec la clé secrète utilisée lors de la génération du token
                const decoded = jwtDecode(token);
                if (decoded && decoded.exp * 1000 > Date.now()) {
                    setDecodedToken(decoded);
                } else {
                    console.error('Token expiré');
                }
            } catch (error) {
                console.error('Erreur de décodage du token :', error.message);
                // Gérer l'erreur de décodage (par exemple, token expiré)
            }
        }
    }, []);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues,
        mode: "onChange",
        resolver: yupResolver(yupSchema),
    });

    async function submit(values) {
        setFeedback("");
        try {
            const response = await fetch(`${BASE_API_URL}/users/deleteAccount/${email}`, {
                headers: { "Content-type": "Application/json" },
                method: "DELETE",
                body: JSON.stringify(values)
            });
            if (response.ok) {
                setFeedbackGood("Votre compte est supprimé");
                reset(defaultValues);
                logout();
                setTimeout(() => {
                    navigate("/");
                }, 2000);

            }
            else {
                setFeedback("Le mot de passe n'est pas correct");
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <Title title="Supprimer votre compte" />
            <Line />
            {decodedToken ? (
                <form className={`${styles.forgotPassword}`} onSubmit={handleSubmit(submit)}>
                    <label htmlFor="password">Mot de passe</label>
                    <input type="password" id="password" {...register("password")} />
                    {errors?.password && <p className="form-error">{errors.password.message}</p>}
                    <button type="submit" disabled={isSubmitting} className="btn">
                        Envoyer
                    </button>
                    {feedbackGood && <p className='feedbackGoodLight'>{feedbackGood}</p>}
                    {feedback && <p className='form-error'>{feedback}</p>}
                </form>

            ) : (
                <p className="text-center">Votre lien a expiré</p>
            )}
        </>
    );
}
