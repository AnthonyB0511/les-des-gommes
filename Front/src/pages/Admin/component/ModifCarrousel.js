import { useState, useContext } from "react";
import { ApiContext } from "../../../context/ApiContext";
import styles from "./ModifCarrousel.module.scss";
import { AuthContext } from "../../../context/AuthContext";

const ModifCarrousel = ({ photo, index }) => {
    // const [feedbackGood, setFeedbackGood] = useState("");
    // const [errorPhoto, setErrorPhoto] = useState("");
    // const photoRef = useRef();
    const BASE_API_URL = useContext(ApiContext);



    const [selectedFiles, setSelectedFiles] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFiles(event.target.files);
    };
    const { user } = useContext(AuthContext);
    let idUser = user.idUser;
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Créer un objet FormData pour envoyer les fichiers
        const formData = new FormData();

        // Ajouter chaque fichier au FormData
        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append('files', selectedFiles[i]);
        }
        formData.append('idUser', idUser);

        try {
            // Envoyer la requête POST avec fetch
            const response = await fetch(`${BASE_API_URL}/photos/modifyCarrousel`, {
                method: 'PATCH',
                body: formData,
            });
            if (response.ok) {
                console.log("Ok");
            }
            // Traiter la réponse du serveur si nécessaire


        } catch (error) {

            console.error('Une erreur s\'est produite lors de l\'envoi des fichiers', error);
        }
    };



    return (

        <form className={`${styles.inputFiles}`} onSubmit={handleSubmit} encType="multipart/form-data">
            <input type="file" name="files" multiple onChange={handleFileChange} />
            <button className="btn" type="submit">Envoyer</button>
        </form>
    );
};

export default ModifCarrousel;
