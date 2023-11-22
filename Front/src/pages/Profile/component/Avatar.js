import styles from "./Avatar.module.scss";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useState, useEffect } from "react";
import { ApiContext } from "../../../context/ApiContext";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Avatar() {
    const BASE_API_URL = useContext(ApiContext);
    const { user } = useContext(AuthContext);
    const [feedback, setFeedback] = useState("");
    const [feedbackGood, setFeedbackGood] = useState("");
    const navigate = useNavigate();
    const defaultValues = {
        avatar: null,
    };
    const MAX_FILE_SIZE = 2000000;
    const avatarSchema = yup.object({
        avatar: yup
            .mixed()
            .nullable(false, "Vous devez télécharger une image")
            .required("Vous devez télécharger une image")
            .test("is-valid-type", "Ce doit être un format d'image", (value) => {
                if (!value) return false;
                if (value[0] && value[0].name) {
                    return (
                        ["jpg", "png", "jpeg", "avif", "webp"].indexOf(
                            value[0].name.toLowerCase().split(".").pop()
                        ) > -1
                    );
                }
                return false;
            })
            .test(
                "is-valid-size",
                "Max allowed size is 5MO",
                (value) =>
                    value && value[0] && value[0].size && value[0].size <= MAX_FILE_SIZE
            ),
    });

    const {
        formState: { errors, isSubmitting },
        register,
        handleSubmit,
        reset,
        clearErrors,
    } = useForm({
        defaultValues,
        mode: "onChange",
        resolver: yupResolver(avatarSchema),
    });

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
    console.log({ previewImage });

    function submit(values) {
        try {
            let newPoster = values.avatar[0];
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(newPoster);
            fileReader.onload = async () => {
                const buffer = fileReader.result;
                const blob = new Blob([buffer], { type: newPoster.type });
                const base64 = await convertBlobTobase64(blob);
                values.avatar = base64;
                clearErrors();
                const obj = { avatar: values.avatar, idUser: user.idUser };
                const response = await fetch(`${BASE_API_URL}/profile/insertImage?id=${user.idUser}`, {
                    method: "PATCH",
                    body: JSON.stringify(obj),
                    headers: { "Content-Type": "application/json" }
                });
                if (response.ok) {
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
                    setFeedbackGood("Votre avatar a été modifié");
                    setTimeout(() => {
                        navigate("/");
                        setFeedbackGood(null);
                    }, 2000);;
                };
            };
        } catch (error) {
            console.error(error);
        }
        reset(defaultValues);
    }
    return (
        <>
            <section className={`${styles.containerAvatar}  mb20`}>
                <img src={previewImage} className={`${styles.picture}`} alt="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;avatar" />
            </section>
            <form onSubmit={handleSubmit(submit)} className={`${styles.containerInput}`}>
                <input {...register("avatar")} type="file" id="avatar" onChange={handleChange} />
                {errors.poster && <p className="form-error">{errors.poster.message}</p>}
                <button className="btn">Sauvegarder votre avatar</button>
                {feedbackGood && <p>{feedbackGood}</p>}
            </form>
        </>
    );

}
