import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useRef, useContext } from "react";
import styles from "./Admin.module.scss";
import { Title } from "../../components/utils/Title";
import { Line } from "../../components/utils/Line";
import { ApiContext } from "../../context/ApiContext";
import { useFetchAdmin } from "../../Hooks/UseFetchAdmin";
import ModifArticles from "./component/ModifArticles";
import ModifCarrousel from "./component/ModifCarrousel";




export default function Admin() {
    const BASE_API_URL = useContext(ApiContext);
    const [feedbackGood, setFeedbackGood] = useState("");
    const genre = useFetchAdmin(BASE_API_URL, "genre/getGenre");
    const articles = useFetchAdmin(BASE_API_URL, "articles/readArticle");
    const photosCarrousel = useFetchAdmin(BASE_API_URL, "photos/getPhotosCarrousel");
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
        photo: yup.string().required("Le champ doit être un lien."),
        author: yup.string().required("Le champ doit être rempli."),
        genre: yup.string().required()
    });
    const {
        formState: { errors },
        register,
        handleSubmit,
        reset,
        clearErrors,
        setError
    } = useForm({
        defaultValues,
        mode: "onChange",
        resolver: yupResolver(gameSchema)
    });
    const submitGames = async (values) => {
        console.log(values);
        clearErrors();
        try {

            const response = await fetch(`http://localhost:8000/api/games/addGame`, {
                method: "POST",
                body: JSON.stringify(values),
                headers: { "Content-type": "application/json" }
            });
            if (response.ok) {
                setFeedbackGood("Le jeu a bien été ajouté.");
                reset(defaultValues);
            }
        } catch (error) {
            setError("generic", { type: "generic", message: error });
        }
    };
    console.log(photosCarrousel);


    return (
        <>
            <Title title="Administration du site" />
            <Line />
            <main className={`${styles.admin}`}>
                <form onSubmit={handleSubmit(submitGames)} className={`${styles.form}`}>
                    <h3>Ajouter un jeu</h3>
                    <label htmlFor="nameGame">Nom du jeu</label>
                    <input type="text" id="nameGame" {...register("nameGame")} />
                    <label htmlFor="editor">Editeur de jeu </label>
                    <input type="text" id="editor" {...register("editor")} />
                    <label htmlFor="year">Auteur du jeu </label>
                    <input type="text" id="author" {...register("author")} />
                    <label htmlFor="author">Année de sortie du jeu </label>
                    <input type="number" id="year" {...register("year")} />
                    <label htmlFor="photo">Ajouter les liens d'image</label>
                    <input type="text" id="photo" {...register("photo")} />
                    <label htmlFor="genre">Quel est le genre du jeu ?</label>
                    <select id="genre" {...register(`genre`)}>
                        {genre.map((g) => (
                            <option key={g.idGenre} value={g.idGenre}>{g.genre}</option>
                        ))}
                    </select>
                    {feedbackGood && <p className={`${styles.feedbackGood}`}>{feedbackGood}</p>}
                    {errors.generic && (<p>{errors.generic.message}</p>)}
                    <button className="btn">Ajouter le jeu</button>
                </form>
                <section className={`${styles.form}`}>
                    {articles.map((article, i) => (
                        <ModifArticles key={i} article={article} index={i} />
                    ))}
                </section>
                <h3>Modification des images du slider</h3>
                <section className={`${styles.form}`}>
                    {/* {photosCarrousel.map((photo, i) => (
                        <ModifCarrousel key={i} photo={photo} index={i} />
                    ))} */}
                    <ModifCarrousel />
                </section>

            </main>
        </>
    );
}
