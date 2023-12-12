import { useContext, useEffect, useState } from 'react';
import { Title } from '../../components/utils/Title';
import { Line } from '../../components/utils/Line';
import styles from './ForgotPassword.module.scss';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { jwtDecode } from 'jwt-decode';
import { ApiContext } from "../../context/ApiContext";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context';


export default function ResetPassword() {
    const { user } = useContext(AuthContext);
    const yupSchema = yup.object({
        password: yup
            .string()
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                'Le mot de passe doit contenir au moins 8 caractères, dont une minuscule, une majuscule, un chiffre et un caractère spécial.'
            )
            .required('Le mot de passe est requis.'),
        confirmPassword: yup
            .string()
            .required("Veuillez confirmer votre mot de passe")
            .oneOf([yup.ref("password", "")],
                "Les mots de passe ne correspondent pas"),
    });
    const [decodedToken, setDecodedToken] = useState(null);
    const [feedbackGood, setFeedbackGood] = useState(null);
    const BASE_API_URL = useContext(ApiContext);
    const navigate = useNavigate();

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
    const email = new URLSearchParams(window.location.search).get("email");
    async function submitNewLink() {
        try {
            const response = await fetch(
                `${BASE_API_URL}/users/mailToReset/${email}`
            );
            if (response.ok) {
                setFeedbackGood(`Un mail de réinitialisation été envoyé sur ${email}`);
                setTimeout(() => {
                    navigate("/");
                }, 3000);
            }
        } catch (error) {

            console.error(error);
        }
    }
    const defaultValues = {
        password: "",
        confirmPassword: "",
    };
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
        try {
            const response = await fetch(`${BASE_API_URL}/users/updatePassword`, {
                headers: { "Content-type": "Application/json" },
                method: "PATCH",
                body: JSON.stringify({ password: values, email: email })
            });
            if (response.ok) {
                setFeedbackGood("Mot de passe modifié");
                reset(defaultValues);
                if (user) {
                    setTimeout(() => {
                        navigate("/");
                        setFeedbackGood("");
                    }, 3000);
                } else {
                    setTimeout(() => {
                        navigate("/login");
                        setFeedbackGood("");
                    }, 3000);
                }

            }

        } catch (error) {
            console.error(error);
        }
    }


    return (
        <>
            <Title title="Modifier le mot de passe" />
            <Line />
            {decodedToken ? (
                <form className={`${styles.forgotPassword}`} onSubmit={handleSubmit(submit)}>
                    <label htmlFor="password">Mot de passe</label>
                    <input type="password" id="password" {...register("password")} />
                    {errors?.password && <p className="form-error">{errors.password.message}</p>}
                    <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
                    <input type="password" id="confirmPassword"{...register("confirmPassword")} />
                    {errors?.confirmPassword && <p className="form-error">{errors.confirmPassword.message}</p>}
                    <button disabled={isSubmitting} type="submit" className='btn'>Envoyer</button>
                    {feedbackGood && <p className='feedbackGoodLight'>{feedbackGood}</p>}
                </form>
            ) : (
                <article className={`${styles.newReset} text-center`}>
                    <p>Votre lien a expiré. </p>
                    <p>Souhaiter-vous obtenir un nouveau lien ?</p>
                    <button className="btn" type="submit" onClick={submitNewLink}>Obtenir un nouveau lien</button>
                    {feedbackGood && <p className='feedbackGoodLight'>Un email a été envoyé sur {email}</p>}
                </article>
            )}

            <Line />
        </>
    );
}
