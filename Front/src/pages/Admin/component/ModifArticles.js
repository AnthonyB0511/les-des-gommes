import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useRef, useContext } from "react";
import { ApiContext } from "../../../context/ApiContext";


export default function ModifArticles({ key, article, index }) {
    const [feedbackGood, setFeedbackGood] = useState("");
    const [errorPhoto, setErrorPhoto] = useState("");
    const photoRef = useRef();
    const BASE_API_URL = useContext(ApiContext);
    const defaultValues = {
        content: "",
        photo: "",
        descriptionPhoto: "",
        title: "",
    };
    const articleSchema = yup.object({
        content: yup.string().required("Le champ doit être rempli"),
        descriptionPhoto: yup.string().required("La description de la photo doit être rempli"),
        title: yup.string().required("Le champ doit être rempli")
    });
    const {
        register,
        handleSubmit,
        getValues,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues,
        mode: "onChange",
        resolver: yupResolver(articleSchema)
    });
    async function submit() {
        const values = getValues();
        const formData = new FormData();
        formData.append("content", values.content);
        formData.append("descriptionPhoto", values.descriptionPhoto);
        formData.append("title", values.title);
        if (photoRef.current && photoRef.current.files[0]) {
            const maxFileSize = 5000000;
            if (photoRef.current.files[0].size > maxFileSize) {
                setErrorPhoto("Le fichier est trop lourd");
                return;
            }
            const supportedExtensions = ['jpg', 'webp', 'png', 'jpeg', 'svg'];
            const fileExtension = photoRef.current.files[0].name.split('.').pop().toLowerCase();
            if (!supportedExtensions.includes(fileExtension)) {
                setErrorPhoto("Format de fichier non supporté");
                return;
            }
            formData.append("photo", photoRef.current.files[0]);
        }
        try {
            const response = await fetch(`${BASE_API_URL}/articles/updateArticle?idArticle=${article.idArticle}`, {
                body: formData,
                method: 'PATCH'
            });
            if (response.ok) {
                setFeedbackGood("L'article a été modifié");
                reset(defaultValues);
            }

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <form onSubmit={handleSubmit(submit)} className="my20 form2">
            <section className="d-flex justify-content-center align-items-center">
                <h3 className="mr10">Modifier l'article n°{index + 1} </h3>
                <i class="fa-solid fa-chevron-down"></i>
            </section>

            <label htmlFor="title" className="labelAdmin">Titre</label>
            <input type="text" id="title" {...register("title")} className="inputAdmin" />
            {errors?.title && <p className="form-error">{errors.title.message}</p>}
            <label htmlFor="content" className="labelAdmin">Contenu</label>
            <textarea id="content" {...register("content")} className="inputAdmin" />
            {errors?.content && <p className="form-error">{errors.content.message}</p>}
            <label htmlFor="descriptionPhoto" className="labelAdmin">Description Photo</label>
            <input type="text" id="descriptionPhoto" {...register("descriptionPhoto")} className="inputAdmin" />
            {errors?.descriptionPhoto && <p className="form-error">{errors.descriptionPhoto.message}</p>}
            <label htmlFor="photo" className="labelAdmin">Photo</label>
            <input type="file" id="photo" {...register("photo")} ref={photoRef} className="inputAdmin" />
            {errorPhoto && <p className="form-error">{errorPhoto}</p>}
            <button className="btn mt20">Modifier l'article</button>
            {feedbackGood && <p className="feedbackGood">{feedbackGood}</p>}

        </form>
    );
}
