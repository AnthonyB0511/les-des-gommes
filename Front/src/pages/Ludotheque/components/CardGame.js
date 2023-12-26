import { useContext, useState } from "react";
import styles from "./CardGame.module.scss";
import { ApiContext } from "../../../context/ApiContext";
import { AuthContext } from "../../../context/AuthContext";
import Modal from "../../../components/utils/Modal";
/**
 * 
 * @param {object} param0 
 * @returns section with one picture Game and his name
 */
export default function CardGame({ game, deleteGameFront }) {
    const { user } = useContext(AuthContext);
    const BASE_API_URL = useContext(ApiContext);
    const [showModal, setShowModal] = useState(false);
    const [feedbackGood, setFeedbackGood] = useState("");
    const handleDelete = () => {
        setShowModal(true);
    };
    const handleCancel = () => {
        setShowModal(false);
    };
    const deleteGame = async () => {
        try {
            const response = await fetch(`${BASE_API_URL}/games/deleteGameData/${game.idGame}`, {
                method: "DELETE",
            });
            if (response.ok) {
                deleteGameFront(game.idGame);
                setShowModal(false);
                setFeedbackGood("Le jeu est supprimé.");
                setTimeout(() => {
                    setFeedbackGood("");
                }, 2000);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <section className={`${styles.container}`}>
            <article className={`${styles.img}`}>
                <img src={`http://localhost:8000/games/${game.photo}`} alt={game.nameGame} />
                {user?.role === 'admin' &&
                    <i onClick={handleDelete} className="fa-solid fa-circle-xmark" title="Supprimer le jeu"></i>
                }

            </article>
            <p className={`${styles.title}`}>{game.nameGame}</p>
            {showModal && <Modal message={`Souhaitez-vous vraiment supprimer le jeu ${game.nameGame} ? Cette action est irréversible.`}
                onConfirm={deleteGame} onCancel={handleCancel} />}
            {feedbackGood && <p>{feedbackGood}</p>}

        </section>
    );
};