import styles from "./Profile.module.scss";
import { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Title } from "../../components/utils/Title";
import { Line } from "../../components/utils/Line";
/**
 * 
 * @returns change profile
 */
export default function Profile() {
    const location = useLocation();
    const [user, setUser] = useState(location.state);
    // need to shows of the user the return
    const [feedback, setFeedback] = useState("");
    const [feedbackGood, setFeedbackGood] = useState("");
    // shows the section of password and the ref for the aniamtion
    const [modifyPassword, setModifyPassword] = useState(false);
    const password = useRef();
    // useState of inputFile
    const [selectedFile, setSelectedFile] = useState(null);
    // to keep the avatar
    const [previewImage, setPreviewImage] = useState(null);
    // necessary to control the submit of the form
    const [isSubmitted, setIsSubmitted] = useState(false);
    //
    const navigate = useNavigate();


    // schema to validate the new form with default values
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
    async function submit(values) {
        setFeedback("");
        setIsSubmitted(true);
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
        } finally { setIsSubmitted(false); }
    }
    /**
     * function modifies the useState. Show or not the section of password
     */
    function viewModifyPassword() {
        setModifyPassword(!modifyPassword);
    }

    useEffect(() => {
        /**
         * function recovers the avatar
         */
        async function getDefaultImage() {
            let response;
            if (user.blobby) {
                response = await fetch(
                    `http://localhost:8000/api/profile/getAvatarFromUser?id=${user.idUser}`
                );
            } else {
                response = await fetch(
                    `http://localhost:8000/api/profile/getDefaultImage`
                );
            }
            const imgDefaultFromBack = await response.json();
            const uint8Array = new Uint8Array(imgDefaultFromBack.blobby.data);
            const blob = new Blob([uint8Array]);
            const urlImage = URL.createObjectURL(blob);
            fetch(urlImage)
                .then((response) => response.text())
                .then((text) => {

                    setPreviewImage(text);
                });
        }
        getDefaultImage();
    }, [user]);
    /**
     * function does nothing <div styleName=""></div>
     */
    useEffect(() => {
        const userUpdate = () => {
            setUser(user);
        };
        userUpdate();
    }, [user]);
    // function shows the avatar befor validation
    function handleChange(event) {
        // file
        const file = event.target.files[0];
        setSelectedFile(file);
        if (file) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                setPreviewImage(fileReader.result);
            };
        } else {
            setPreviewImage(null);
        }
    }
    const convertBlobTobase64 = (blob) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(blob);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    /**
     * 
     * @returns modify the avatar iin BDD
     */
    function modifyAvatar() {
        if (!selectedFile) {
            alert("Veuillez sélectionner un fichier");
            return;
        }
        // FileReader permet de lire les fichiers de type File ou Blob
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(selectedFile);
        fileReader.onload = async () => {
            // récupération du fichier lu
            const buffer = fileReader.result;
            // création un objet blob à partir du fichier lu et du type de fichier
            const blob = new Blob([buffer], { type: selectedFile.type });
            // invocation de la fonction en passant en paramètre l'objet blob
            const base64 = await convertBlobTobase64(blob);
            // création d'un objet avec blob et idUser
            const obj = { value: base64, idUser: user.idUser };

            // fetch
            const response = await fetch(
                "http://localhost:8000/api/profile/insertImage",
                {
                    method: "PATCH",
                    body: JSON.stringify(obj),

                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const userModified = await response.json();
            const uint8Array = new Uint8Array(userModified.blobby.data);
            const blob2 = new Blob([uint8Array]);
            const urlImage = URL.createObjectURL(blob2);
            fetch(urlImage)
                .then((response) => response.text())
                .then((text) => {
                    setPreviewImage(text);
                })
                .catch((err) => console.error(err));
        };
    }

    return (
        <>
            <Title title="Votre Profil" />
            <Line />
            <main className={`${styles.form}`} >
                <form onSubmit={handleSubmit(submit)}
                >
                    <section className={`${styles.container}`}>
                        <div className={`${styles.content}  mb20`}>
                            <img src={previewImage} className={`${styles.picture}`} alt="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;avatar" />
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
                        <input type="file" className={`${styles.inputFile}`} onChange={handleChange} />
                        <button onClick={() => modifyAvatar()} type="button"
                            className={`${styles.button2}`}>Sauvegarder votre  nouvel avatar</button>
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
                    <p onClick={viewModifyPassword}>Souhaitez-vous modifier votre mot de passe ?</p>
                    <section ref={password} className={`${styles.password}`}
                        style={modifyPassword ? { height: password.current.scrollHeight + "px", opacity: "1" } : { height: "0", opacity: "0" }}>
                        <article className="d-flex flex-column mb20">
                            <label htmlFor="oldPassword">Votre ancien mot de passe</label>
                            {/* on déconstruit en rajoutant la value qu'on modifie */}
                            <input {...register("oldPassword")}
                                type="password" id="oldPassword" />
                            {errors?.oldPassword && <p style={{ color: "red" }}>{errors.oldPassword.message}</p>}
                        </article>
                        <article className="d-flex flex-column mb20">
                            <label htmlFor="newPassword">Votre nouveau mot de passe</label>
                            {/* on déconstruit en rajoutant la value qu'on modifie */}
                            <input {...register("newPassword")}
                                type="password" id="newPassword" />
                            {errors?.newPassword && <p style={{ color: "red" }}>{errors.newPassword.message}</p>}
                        </article>
                        <article className="d-flex flex-column mb20">
                            <label htmlFor="confirmPassword">Confirmer le nouveau mot de passe</label>
                            {/* on déconstruit en rajoutant la value qu'on modifie */}
                            <input {...register("confirmPassword")}
                                type="password" id="confirmPassword" />
                            {errors?.confirmPassword && <p style={{ color: "red" }}>{errors.confirmPassword.message}</p>}
                        </article>
                    </section>
                    {/* </>} */}

                    <button className={`${styles.button} `}
                        disabled={isSubmitted}>Enregistrer les modifications</button>
                    {feedback && <p className={`${styles.feedback}`}>{feedback}</p>}
                    {feedbackGood && <p className={`${styles.feedbackGood}`}>{feedbackGood}</p>}

                </form>
            </main>
        </>
    );
}
