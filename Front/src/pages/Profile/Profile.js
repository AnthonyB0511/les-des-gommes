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
    const user = location.state;
    const [feedback, setFeedback] = useState("");
    const [feedbackGood, setFeedbackGood] = useState("");
    const [modifyPassword, setModifyPassword] = useState(false);
    const navigate = useNavigate();
    const yupSchema = yup.object().shape({
        username: yup
            .string()
            .min(2, "Le champ doit contenir au moins 2 caractères")
            .max(12, "Le champ doit contenir au maximum 12 caractères"),
        email: yup.string().email("Ceci n'est pas une adresse mail valide"),
        oldPassword: yup.string(),
        newPassword: yup.string()
            .when('oldPassword', {
                is: (val) => val && val.length > 0,
                then: () => yup.string({
                    newPassword: yup.string().min(3, "Le mot de passe doit avoir au moins 8 caractères"),
                    otherwise: yup.string()
                })
            }),
        confirmNewPassword: yup.string()
            .oneOf([yup.ref('newPassword'), null], 'Les mots de passe doivent correspondre'),
    });



    const defaultValues = {
        name: user.name,
        firstname: user.firstname,
        username: user.username,
        email: user.email,
        idUser: user.idUser,
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
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
                    user.mail = userBack.mail;
                    user.username = userBack.username;
                    setTimeout(() => {
                        navigate("/");
                    }, 3000);
                }
            }
        } catch (error) {
            console.error(error);
        }
    }
    function viewModifyPassword() {
        setModifyPassword(!modifyPassword);
    }

    return (
        <>
            <Title title="Votre Profil" />
            <Line />
            <div className={`${styles.form}`}>
                <form onSubmit={handleSubmit(submit)}>
                    <div className={`${styles.container}`}>
                        <div className={`${styles.content} ${styles.picture} mb20`}>


                        </div>

                        <div className={`${styles.content} mb20`}>
                            <label htmlFor="firstname">Prénom</label>
                            <input {...register("firstname")}
                                type="text" id="firstname" disabled="disabled" />
                            <label htmlFor="name">Nom</label>
                            <input {...register("name")}
                                type="text" id="name" disabled="disabled" />
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
                    <p onClick={viewModifyPassword}>Souhaitez-vous modifier votre mot de passe ?</p>
                    {modifyPassword && <>
                        <div className="d-flex flex-column mb20">
                            <label htmlFor="oldPassword">Votre ancien mot de passe</label>
                            {/* on déconstruit en rajoutant la value qu'on modifie */}
                            <input {...register("oldPassword")}
                                type="password" id="oldPassword" />
                            {errors?.oldPassword && <p style={{ color: "red" }}>{errors.oldPassword.message}</p>}
                        </div>
                        <div className="d-flex flex-column mb20">
                            <label htmlFor="newPassword">Votre nouveau mot de passe</label>
                            {/* on déconstruit en rajoutant la value qu'on modifie */}
                            <input {...register("newPassword")}
                                type="password" id="newPassword" />
                            {errors?.newPassword && <p style={{ color: "red" }}>{errors.newPassword.message}</p>}
                        </div>
                        <div className="d-flex flex-column mb20">
                            <label htmlFor="confirmPassword">Confirm Passwword</label>
                            {/* on déconstruit en rajoutant la value qu'on modifie */}
                            <input {...register("confirmPassword")}
                                type="password" id="confirmPassword" />
                            {errors?.confirmPassword && <p style={{ color: "red" }}>{errors.confirmPassword.message}</p>}
                        </div>
                    </>}

                    <button className={`${styles.button} `}>Enregistrer les modifications</button>
                    {feedback && <p className={`${styles.feedback}`}>{feedback}</p>}
                    {feedbackGood && <p className={`${styles.feedbackGood}`}>{feedbackGood}</p>}

                </form>
            </div>
        </>
    );
}
