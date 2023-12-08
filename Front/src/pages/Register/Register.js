import styles from "./Register.module.scss";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../apis/users";
import { useState, useEffect } from "react";
import { Title } from "../../components/utils/Title";
import { Line } from "../../components/utils/Line";
import { jwtDecode } from 'jwt-decode';
import { NavLink } from "react-router-dom";
export default function Register() {
    const email = new URLSearchParams(window.location.search).get("email");
    const [feedbackGood, setFeedbackGood] = useState("");
    const [decodedToken, setDecodedToken] = useState(null);
    useEffect(() => {

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
    const navigate = useNavigate();
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
        email: yup
            .string()
            .required("L'adresse mail est nécessaire pour s'inscrire")
            .email("Ceci n'est pas une adresse mail valide"),
        password: yup
            .string()
            .required("Le mot de passe est obligatoire")
            .min(3, "Mot de passe trop court"),
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
        email: email,
        age: "",
        password: "",
        confirmPassword: "",
    };
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
        setError,
        clearErrors
    } = useForm({
        defaultValues,
        mode: "onChange",
        resolver: yupResolver(yupSchema),
    });
    async function submit(values) {
        try {
            clearErrors();
            await createUser(values);
            setFeedbackGood("Félicitations, vous êtes inscrit");
            reset(defaultValues);
            setTimeout(() => {
                navigate("/login");
            }, 3000);

        } catch (error) {
            setError("generic", { type: "generic", message: error });
        }
    }
    return (
        <>
            <Title title="Inscription" />
            <Line />
            {decodedToken ? (
                <form onSubmit={handleSubmit(submit)} className={`${styles.formRegister}`}>
                    <section className="d-flex justify-content-between">
                        <article className={`${styles.container}`}>
                            {/* name user */}
                            <section className="d-flex flex-column mb20">
                                <label htmlFor="name">Nom</label>
                                <input {...register("name")}
                                    type="text" id="name" />
                                {errors?.name && <p className="form-error">{errors.name.message}</p>}
                            </section>
                            {/* firstname */}
                            <section className="d-flex flex-column mb20">
                                <label htmlFor="firstname">Prénom</label>
                                <input {...register("firstname")}
                                    type="text" id="firstname" />
                                {errors?.firstname && <p className="form-error">{errors.firstname.message}</p>}
                            </section>
                            {/* email */}
                            <section className="d-flex flex-column mb20">
                                <label htmlFor="age">E-mail</label>

                                <input {...register("email")} disabled
                                    type="email" id="email" />
                                {errors?.email && <p className="form-error">{errors.email.message}</p>}
                            </section>
                        </article>
                        <article className={`${styles.container}`}>
                            <section className="d-flex flex-column mb20">
                                {/* username */}
                                <label htmlFor="username">Nom du profil</label>
                                <input {...register("username")}
                                    type="text" id="username" />
                                {errors?.username && <p className="form-error">{errors.username.message}</p>}
                            </section>
                            {/* password */}
                            <section className="d-flex flex-column mb20">
                                <label htmlFor="password">Mot de passe</label>

                                <input {...register("password")}
                                    type="password" id="password" />
                                {errors?.password && <p className="form-error">{errors.password.message}</p>}
                            </section>
                            {/* confirm password */}
                            <section className="d-flex flex-column mb20">
                                <label htmlFor="confirmPassword">Confirmation du mot de passe</label>
                                {/* on déconstruit en rajoutant la value qu'on modifie */}
                                <input {...register("confirmPassword")}
                                    type="password" id="confirmPassword" />
                                {errors?.confirmPassword && <p className="form-error">{errors.confirmPassword.message}</p>}
                            </section>
                        </article>
                    </section>
                    {/* button validates the form */}
                    <button type="submit" disabled={isSubmitting} className="btn">S'inscrire</button>
                    {/* feedabck for the user */}
                    {feedbackGood && <p className={'feedbackGoodLight'}>{feedbackGood}</p>}
                    {errors.generic && (<p className={`form-error`}>{errors.generic.message}</p>)}
                </form>
            ) : (
                <article className={`${styles.newReset} text-center`}>
                    <p>Votre lien a expiré. </p>
                    <p>Souhaiter-vous obtenir un nouveau lien ?</p>
                    <NavLink to="/login/register"><button className="btn">Obtenir un nouveau lien</button></NavLink>

                </article>
            )}
        </>
    );
}
