import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useContext, useRef } from "react";

import { ApiContext } from "../../../context/ApiContext";
import { useFetchAdmin } from "../../../Hooks/UseFetchAdmin";






export default function Admin() {
    const BASE_API_URL = useContext(ApiContext);
    const [feedbackGood, setFeedbackGood] = useState("");
    const [feedback, setFeedback] = useState("");
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
        setError,
        getValues,

    } = useForm({
        defaultValues,
        mode: "onChange",
        resolver: yupResolver(gameSchema)
    });
    async function submitGames() {
        setFeedback("");
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
        }
        try {
            const response = await fetch(`${BASE_API_URL}/games/addGame`, {
                method: "POST",
                body: formData,
            });
            const responseData = await response.json();
            if (response.ok) {

                setFeedbackGood("Le jeu a bien été ajouté.");
                reset(defaultValues);
                setTimeout(() => {
                    setFeedbackGood("");
                }, 2000);
            } else {
                setFeedback(responseData);
            }
        } catch (error) {
            setError("generic", { type: "generic", message: error });
        }
    };
    return (


        <form onSubmit={handleSubmit(submitGames)} className="form2">
            <h3 className='text-center'>Ajouter un jeu</h3>
            <label htmlFor="nameGame" className="labelAdmin">Nom du jeu</label>
            <input type="text" id="nameGame" {...register("nameGame")} className="inputAdmin" />
            {errors?.nameGame && <p className="feedback">{errors.nameGame.message}</p>}
            <label htmlFor="editor" className="labelAdmin">Editeur de jeu </label>
            <input type="text" id="editor" {...register("editor")} className="inputAdmin" />
            {errors?.editor && <p className="feedback">{errors.editor.message}</p>}
            <label htmlFor="author" className="labelAdmin">Auteur du jeu </label>
            <input type="text" id="author" {...register("author")} className="inputAdmin" />
            {errors?.author && <p className="feedback">{errors.author.message}</p>}
            <label htmlFor="year" className="labelAdmin">Année de sortie du jeu </label>
            <input type="number" id="year" {...register("year")} className="inputAdmin" />
            {errors?.year && <p className="feedback">{errors.year.message}</p>}
            <label htmlFor="photo" className="labelAdmin">Ajouter les liens d'image</label>
            <input type="file" id="photo" ref={photoRef} className="inputAdminFile" />
            {errorPhoto && <p className="feedback">{errorPhoto}</p>}
            <label htmlFor="genre" className="labelAdmin">Quel est le genre du jeu ?</label>
            <select id="genre" {...register(`genre`)}>
                {genre.map((g) => (
                    <option key={g.idGenre} value={g.idGenre}>{g.genre}</option>
                ))}
            </select>
            {feedbackGood && <p className='feedbackGood'>{feedbackGood}</p>}
            {feedback && (<p className="feedback">{feedback}</p>)}
            <button className="btn">Ajouter le jeu</button>
        </form>

    );
}
