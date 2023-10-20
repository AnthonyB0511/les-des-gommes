import styles from "./LoginView.module.scss";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";



export default function Login() {
    const [feedbackGood, setFeedbackGood] = useState("");
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
        resolver: yupResolver(yupSchema),
    });
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    /**
         * function send to the server the datas of the user
         * @param {Object} values 
         */
    async function submit(values) {
        try {
            clearErrors();
            await login(values);
            setFeedbackGood("Connexion réussie. Vous allez être redirigé.");
            reset(defaultValues);
            setTimeout(() => {
                navigate("/");
            }, 2000);
        } catch (error) {
            setError("generic", { type: "generic", message: error });
        }
    }
    return (
        <article className={`${styles.login}`}>
            <section className={`${styles.form}`}>
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



                    {/* //button Connexion */}
                    <section>
                        <button
                            className="btn"
                        >Connexion
                        </button>
                    </section>
                    {/* //feedback for user */}
                    {feedbackGood && <p className={`${styles.feedbackGood}`}>{feedbackGood}</p>}
                    {errors.generic && (<p className={`${styles.feedback}`}>{errors.generic.message}</p>)}
                </form>

                <article className={`${styles.forget}`}>Vous avez oublié votre mot de passe ?</article>
            </section>
        </article>
    );
}
