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
/**
 * 
 * @returns change profile
 */

export default function Profile() {
    const { user } = useContext(AuthContext);
    const { BASE_API_URL } = useContext(ApiContext); console.log({ BASE_API_URL });
    // need to shows of the user the return
    const [feedback, setFeedback] = useState("");
    const [feedbackGood, setFeedbackGood] = useState("");
    const [errorAvatar, setErrorAvatar] = useState("");
    const avatarRef = useRef();
    // useState of inputFile
    const [selectedFile, setSelectedFile] = useState(null);
    // to keep the avatar
    const [previewImage, setPreviewImage] = useState(null);

    //
    const navigate = useNavigate();


    // schema to validate the new form with default values
    const yupSchema = yup.object({
        username: yup
            .string()
            .min(2, "Le champ doit contenir au moins 2 caractères")
            .max(12, "Le champ doit contenir au maximum 12 caractères"),
        email: yup.string().email("Ceci n'est pas une adresse mail valide"),
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
        formState: { errors }
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
        console.log(formData);
        if (avatarRef.current && avatarRef.current.files[0]) {
            const maxFileSize = 2000000;
            if (avatarRef.current.files[0].size > maxFileSize) {
                setErrorAvatar("Le fichier est trop lourd");
                return;
            }
            const supportedExtensions = ['jpg', 'webp', 'png', 'jpeg'];
            const fileExtension = avatarRef.current.files[0].name.split('.').pop().toLowerCase();
            if (!supportedExtensions.includes(fileExtension)) {
                setErrorAvatar("Format de fichier non supporté");
                return;
            }
            formData.append("avatar", avatarRef.current.files[0]);
        }
        console.log(values);
        try {
            const response = await fetch(`http://localhost:8000/api/users/modifyUser`, {
                method: "PATCH",
                body: formData
            });

            if (response.ok) {
                const userBack = await response.json();
                if (userBack.message) {
                    console.log(userBack.message);
                    setFeedback(userBack.message);
                } else {
                    setFeedbackGood(userBack.messageGood);
                    console.log({ userBack });
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



    // function shows the avatar befor validation
    // function handleChange(event) {
    //     // file
    //     const file = event.target.files[0];
    //     setSelectedFile(file);
    //     if (file) {
    //         const fileReader = new FileReader();
    //         fileReader.readAsDataURL(file);
    //         fileReader.onload = () => {
    //             setPreviewImage(fileReader.result);
    //         };
    //     } else {
    //         setPreviewImage(null);
    //     }
    // }

    /**
     * 
     * @returns modify the avatar iin BDD
     */


    return (
        <>
            <Title title="Votre Profil" />
            <Line />
            <main className={`${styles.form}`} >
                <form onSubmit={handleSubmit(submit)}
                >
                    <section className={`${styles.container}`}>
                        <div className={`${styles.content}  mb20`}>
                            <img src={`http://localhost:8000/avatar/${user.avatar}`} className={`${styles.picture}`} alt="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;avatar" />
                        </div>


                        <section className={`${styles.content} mb20`}>
                            <label htmlFor="firstname">Prénom</label>
                            <input {...register("firstname")}
                                type="text" id="firstname" disabled="disabled" />
                            <label htmlFor="name">Nom</label>
                            <input {...register("name")}
                                type="text" id="name" disabled="disabled" />
                        </section>
                    </section>
                    <section className={`${styles.containerInput}`}>
                        <input type="file" className={`${styles.inputFile}`} id="avatar" ref={avatarRef} />
                        {errorAvatar && <p className="form-error">{errorAvatar}</p>}
                    </section>
                    <section className="d-flex flex-column mb20">
                        <label htmlFor="mail">E-mail</label>
                        <input {...register("email")}
                            type="email" id="email" />
                        {errors?.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
                    </section>


                    <section className="d-flex flex-column mb20">
                        <label htmlFor="username">Nom du profil</label>
                        <input {...register("username")}
                            type="text" id="username" />
                        {errors?.username && <p style={{ color: "red" }}>{errors.username.message}</p>}
                    </section>
                    <p>Souhaitez-vous modifier votre mot de passe ?</p>

                    {/* </>} */}

                    <button className={`btn`}>Enregistrer les modifications</button>
                    {feedback && <p className={`${styles.feedback}`}>{feedback}</p>}
                    {feedbackGood && <p className={`${styles.feedbackGood}`}>{feedbackGood}</p>}

                </form>
            </main>
        </>
    );
}