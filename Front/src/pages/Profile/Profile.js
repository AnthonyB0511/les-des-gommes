import styles from "./Profile.module.scss";
import { useRef, useState, useEffect } from "react";
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
    // useState pour l'input de type file
    const [selectedFile, setSelectedFile] = useState(null);
    // useState pour l'attribut src de notre balise img
    const [previewImage, setPreviewImage] = useState(null);
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
    const password = useRef();


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
    useEffect(() => {
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

            console.log({ imgDefaultFromBack });
            const uint8Array = new Uint8Array(imgDefaultFromBack.blobby.data);
            console.log({ uint8Array });
            const blob = new Blob([uint8Array]);
            console.log({ blob });
            const urlImage = URL.createObjectURL(blob);
            console.log({ urlImage });
            fetch(urlImage)
                .then((response) => response.text())
                .then((text) => {
                    console.log({ text });
                    setPreviewImage(text);
                });
        }
        getDefaultImage();
    }, [user]);
    // déclaration de la fonction lors d'un changement de fichier dans l'input avant validation
    function handleChange(event) {
        // récupération du fichier
        const file = event.target.files[0];
        setSelectedFile(file);
        // on place une condition pour l'attribuer à l'attribut src de la balise img ou non
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
            console.log({ buffer });
            // création un objet blob à partir du fichier lu et du type de fichier
            const blob = new Blob([buffer], { type: selectedFile.type });
            console.log(selectedFile);

            // invocation de la fonction en passant en paramètre l'objet blob
            const base64 = await convertBlobTobase64(blob);
            console.log({ base64 });

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
            console.log(userModified);
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
            <div className={`${styles.form}`} >
                <form onSubmit={handleSubmit(submit)}
                >
                    <div className={`${styles.container}`}>
                        <div className={`${styles.content}  mb20`}>
                            <img src={previewImage} className={`${styles.picture}`} alt="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;avatar" />
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
                    <div className={`${styles.containerInput}`}>
                        <input type="file" className={`${styles.inputFile}`} onChange={handleChange} />
                        <button onClick={() => modifyAvatar()} type="button"
                            className={`${styles.button2}`}>Sauvegarder votre  nouvel avatar</button>
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
                    {/* {modifyPassword && <> */}
                    <div ref={password} className={`${styles.password}`}
                        style={modifyPassword ? { height: password.current.scrollHeight + "px", opacity: "1" } : { height: "0", opacity: "0" }}>
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
                    </div>
                    {/* </>} */}

                    <button className={`${styles.button} `}>Enregistrer les modifications</button>
                    {feedback && <p className={`${styles.feedback}`}>{feedback}</p>}
                    {feedbackGood && <p className={`${styles.feedbackGood}`}>{feedbackGood}</p>}

                </form>
            </div>
        </>
    );
}
