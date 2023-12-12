import styles from "./Profile.module.scss";
import { useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Title } from "../../components/utils/Title";
import { Line } from "../../components/utils/Line";
import { AuthContext } from "../../context/AuthContext";
import { ApiContext } from "../../context/ApiContext";
import { Link } from "react-router-dom";

/**
 * 
 * @returns change profile
 */

export default function Profile() {
    const { user } = useContext(AuthContext);
    const BASE_API_URL = useContext(ApiContext);
    // need to shows of the user the return
    const [feedback, setFeedback] = useState("");
    const [feedbackGood, setFeedbackGood] = useState("");
    const [mailSend, setMailSend] = useState("");
    const [errorAvatar, setErrorAvatar] = useState("");
    const [submitForm, setSubmitForm] = useState(false);
    const avatarRef = useRef();


    //
    const navigate = useNavigate();


    // schema to validate the new form with default values
    const yupSchema = yup.object({
        username: yup
            .string()
            .min(2, "Le champ doit contenir au moins 2 caractères")
            .max(12, "Le champ doit contenir au maximum 12 caractères"),
        email: yup
            .string()
            .required("Le champ est obligatoire")
            .matches(
                /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                "Le format d'email n'est pas le bon"
            ),
    });

    const defaultValues = {
        name: user.name,
        firstname: user.firstname,
        username: user.username,
        email: user.email,
        avatar: user?.avatar ? (user.avatar) : (null)
    };
    const {
        register,
        handleSubmit,
        getValues,

        formState: { errors, isSubmitting }
    } = useForm({
        defaultValues,
        mode: "onChange",
        resolver: yupResolver(yupSchema),
    });
    /**
     * function send the new datas in the server
     * @param {object} values 
     */
    async function submit() {
        setFeedback("");
        const values = getValues();
        const formData = new FormData();
        formData.append("email", values.email);
        formData.append("username", values.username);
        formData.append("idUser", user.idUser);
        if (avatarRef.current && avatarRef.current.files[0]) {
            const maxFileSize = 2000000;
            if (avatarRef.current.files[0].size > maxFileSize) {
                setErrorAvatar("Le fichier est trop lourd");
                return;
            }
            const supportedExtensions = ['jpg', 'webp', 'png', 'jpeg', 'svg'];
            const fileExtension = avatarRef.current.files[0].name.split('.').pop().toLowerCase();
            if (!supportedExtensions.includes(fileExtension)) {
                setErrorAvatar("Format de fichier non supporté");
                return;
            }
            formData.append("avatar", avatarRef.current.files[0]);
        }
        try {
            const response = await fetch(`http://localhost:8000/api/users/modifyUser`, {
                method: "PATCH",
                body: formData
            });

            if (response.ok) {
                const userBack = await response.json();
                if (userBack.message) {
                    setFeedback(userBack.message);
                } else {
                    setFeedbackGood(userBack.messageGood);
                    user.username = userBack.updatedData.username;
                    user.email = userBack.updatedData.email;
                    user.avatar = userBack.updatedData.avatar;
                    setTimeout(() => {
                        navigate("/");
                    }, 3000);
                }
            }
        } catch (error) {
            console.error(error);
        }
    }
    async function handleDeleteAccount() {
        setSubmitForm(true);
        try {
            const response = await fetch(`${BASE_API_URL}/users/verify/${user.email}`);

            if (response.ok) {
                setMailSend("Un mail a été envoyé");
                setTimeout(() => {
                    setMailSend("");
                }, 3000);
            }

        } catch (error) {
            console.error(error);
        } finally {
            setSubmitForm(false);
        }
    }





    return (
        <>
            <Title title="Votre Profil" />
            <Line />
            <section className={`${styles.profile}`} >
                <form onSubmit={handleSubmit(submit)} className="form2"
                >
                    <article className={`${styles.container}`}>
                        <div className={`${styles.contentImg}  mb20`}>
                            {user.avatar === null ? (
                                <img src={`http://localhost:8000/avatar/default.svg`} className={`${styles.picture}`} alt="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;avatar" />
                            ) : (
                                <img src={`http://localhost:8000/avatar/${user.avatar}`} className={`${styles.picture}`} alt="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;avatar" />)}

                        </div>
                        <div className={`${styles.content} mb20`}>
                            <label htmlFor="firstname">Prénom</label>
                            <input {...register("firstname")}
                                type="text" id="firstname" disabled="disabled" />
                            <label htmlFor="name">Nom</label>
                            <input {...register("name")}
                                type="text" id="name" disabled="disabled" />
                        </div>
                    </article>
                    <section className={`${styles.containerInput}`}>
                        <input type="file" className={`${styles.inputFile}`} id="avatar" ref={avatarRef} title="Modifier votre avatar" />
                        {errorAvatar && <p className="form-error">{errorAvatar}</p>}
                    </section>
                    <section className="d-flex flex-column mb20">
                        <label htmlFor="mail">E-mail</label>
                        <input {...register("email")}
                            type="email" id="email" title="Modifier votre email" />
                        {errors?.email && <p className="form-error">{errors.email.message}</p>}
                    </section>


                    <section className="d-flex flex-column mb20">
                        <label htmlFor="username">Nom du profil</label>
                        <input {...register("username")}
                            type="text" id="username" />
                        {errors?.username && <p className="form-error">{errors.username.message}</p>}
                    </section>
                    <p><Link to="/motdepasseoublie" title="Modifier votre mot de passe">Souhaitez-vous modifier votre mot de passe ?</Link></p>

                    {/* </>} */}

                    <button className={`btn`} disabled={isSubmitting} type="submit" title="Enregistrer vos modifications">Enregistrer les modifications</button>
                    {feedback && <p className={`${styles.feedback}`}>{feedback}</p>}
                    {feedbackGood && <p className={`feedbackGood`}>{feedbackGood}</p>}

                </form>
                <button className="btn mb20" onClick={handleDeleteAccount} disabled={submitForm} title="Supprimmer votre compte">Supprimer votre compte</button>
                {mailSend && <p className="feedbackGoodLight mb20">{mailSend}</p>}

            </section>
        </>
    );
}