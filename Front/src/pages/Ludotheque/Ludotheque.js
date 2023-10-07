import styles from "./Ludotheque.module.scss";
import { useState } from "react";
import { Title } from "../../components/utils/Title";
import { Line } from "../../components/utils/Line";
import { games } from "../../data/games";
import CardGame from "./components/CardGame";

/**
 * 
 * @returns the games of the association
 */
export default function Ludotheque() {
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

            <main className={`${styles.grid}`}>
                {games
                    .filter((g) => g.title.toLowerCase().includes(filter))
                    .map((game) => (
                        <CardGame
                            game={game} />
                    ))}
            </main>

        </>
    );
}