import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useContext, useRef } from "react";
import styles from "../Admin.module.scss";
import { ApiContext } from "../../../context/ApiContext";
import { useFetchAdmin } from "../../../Hooks/UseFetchAdmin";






export default function Admin() {
    const BASE_API_URL = useContext(ApiContext);
    const [feedbackGood, setFeedbackGood] = useState("");
    const [errorPhoto, setErrorPhoto] = useState("");
    const genre = useFetchAdmin(BASE_API_URL, "genre/getGenre");
    const photoRef = useRef();

    /**
     * Yup schema to add a game with defaults values and the function submit.
     */
    const defaultValues = {
        nameGame: "",
        editor: "",
        year: "",
        photo: "",
        author: "",
        genre: ""
    };
    const gameSchema = yup.object({
        nameGame: yup.string().required("Ce champ doit être rensigné"),
        editor: yup.string().required("Ce champ doit être rensigné"),
        year: yup
            .number()
            .typeError("Le champ doit contenir un nombre")
            .test("is-four-digits",
                "Le nombre doit contenir exactement quatre chiffres",
                (value) => {
                    return /^[0-9]{4}$/.test(value);
                })
            .required("Le champ doit être requis"),
        author: yup.string().required("Le champ doit être rempli."),
        genre: yup.string().required()
    });
    const {
        formState: { errors },
        register,
        handleSubmit,
        reset,
        clearErrors,
        getValues,
        setError
    } = useForm({
        defaultValues,
        mode: "onChange",
        resolver: yupResolver(gameSchema)
    });
    async function submitGames() {
        clearErrors();
        const values = getValues();
        const formData = new FormData();
        formData.append("nameGame", values.nameGame);
        formData.append("editor", values.editor);
        formData.append("year", values.year);
        formData.append("author", values.author);
        formData.append("genre", values.genre);
        if (photoRef.current && photoRef.current.files[0]) {
            const maxFileSize = 2000000;
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
        } console.log(values);
        try {
            const response = await fetch(`${BASE_API_URL}/games/addGame`, {
                method: "POST",
                body: formData,
            });
            if (response.ok) {
                setFeedbackGood("Le jeu a bien été ajouté.");
                reset(defaultValues);
                setTimeout(() => {
                    setFeedbackGood("");
                }, 2000);
            }
        } catch (error) {
            setError("generic", { type: "generic", message: error });
            console.log(error);
        }
    };
    console.log(errors);
    return (

        <section className={`${styles.admin}`}>
            <form onSubmit={handleSubmit(submitGames)} className={`${styles.form}`}>
                <h3>Ajouter un jeu</h3>
                <label htmlFor="nameGame">Nom du jeu</label>
                <input type="text" id="nameGame" {...register("nameGame")} />
                {errors?.nameGame && <p className="feedback">{errors.nameGame.message}</p>}
                <label htmlFor="editor">Editeur de jeu </label>
                <input type="text" id="editor" {...register("editor")} />
                {errors?.editor && <p className="feedback">{errors.editor.message}</p>}
                <label htmlFor="author">Auteur du jeu </label>
                <input type="text" id="author" {...register("author")} />
                {errors?.author && <p className="feedback">{errors.author.message}</p>}
                <label htmlFor="year">Année de sortie du jeu </label>
                <input type="number" id="year" {...register("year")} />
                {errors?.year && <p className="feedback">{errors.year.message}</p>}
                <label htmlFor="photo">Ajouter les liens d'image</label>
                <input type="file" id="photo" ref={photoRef} />
                {errorPhoto && <p className="feedback">{errorPhoto}</p>}
                <label htmlFor="genre">Quel est le genre du jeu ?</label>
                <select id="genre" {...register(`genre`)}>
                    {genre.map((g) => (
                        <option key={g.idGenre} value={g.idGenre}>{g.genre}</option>
                    ))}
                </select>
                {feedbackGood && <p className='feedbackGood'>{feedbackGood}</p>}
                {errors.generic && (<p>{errors.generic.message}</p>)}
                <button className="btn">Ajouter le jeu</button>
            </form>




        </section>
    );
}
