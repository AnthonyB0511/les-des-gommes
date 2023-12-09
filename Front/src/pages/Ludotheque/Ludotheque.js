import styles from "./Ludotheque.module.scss";
import { useState, useContext } from "react";
import { Title } from "../../components/utils/Title";
import { Line } from "../../components/utils/Line";
// import { games } from "../../data/games";
import CardGame from "./components/CardGame";
import { ApiContext } from "../../context/ApiContext";
import { useFetchData } from "../../Hooks/useFetchData";
import Loading from "../../components/utils/Loading";
import ScrollToTopButton from "../Discussion/component/ScrollToTopButton";

/**
 * 
 * @returns the games of the association
 */
export default function Ludotheque() {
    const BASE_API_URL = useContext(ApiContext);
    //useState modifies the statut f search
    const [filter, Setfilter] = useState("");


    /**
     * 
     * @param {event} e 
     * filter games by name
     */
    const handleInput = (e) => {
        const search = e.target.value;
        Setfilter(search.trim().toLowerCase());
    };
    const [[games, setGames], isLoading] = useFetchData(BASE_API_URL, "games/getGames");
    console.log({ games });
    const deleteGameFront = (index) => {
        console.log(index);
        setGames(games.filter((game) => game.idGame !== index));

    };

    return (
        <>

            <Title title="La ludothèque" />
            <Line />
            <section className={`${styles.search} mb20 d-flex justify-content-center align-items-center`}>
                <i className="fas fa-magnifying-glass mr10"></i>
                <input
                    className="flex-fill"
                    type="text"
                    placeholder="Rechercher"
                    onInput={handleInput} />
            </section>

            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <main className={`${styles.grid}`}>
                        {games
                            .filter((g) => g.nameGame.toLowerCase().includes(filter))
                            .map((game, i) => (
                                <CardGame
                                    game={game} key={i} deleteGameFront={deleteGameFront} />
                            ))}
                    </main>
                    <ScrollToTopButton />
                </>
            )}



        </>
    );
}