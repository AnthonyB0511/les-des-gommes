import { useContext } from "react";
import styles from "./CardGame.module.scss";
import { ApiContext } from "../../../context/ApiContext";
import { AuthContext } from "../../../context/AuthContext";
/**
 * 
 * @param {object} param0 
 * @returns section with one picture Game and his name
 */
export default function CardGame({ game, deleteGameFront }) {
    const { user } = useContext(AuthContext);
    const BASE_API_URL = useContext(ApiContext);
    const deleteGame = async () => {
        try {
            const response = await fetch(`${BASE_API_URL}/games/deleteGameData/${game.idGame}`, {
                method: "DELETE",
            });
            if (response.ok) {
                deleteGameFront(game.idGame);
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
                    <i onClick={deleteGame} className="fa-solid fa-circle-xmark"></i>
                }
                <section className={`${styles.heart}`}><i className="fa-regular fa-heart"></i></section>

            </article>
            <p className={`${styles.title}`}>{game.nameGame}</p>

        </section>
    );
};