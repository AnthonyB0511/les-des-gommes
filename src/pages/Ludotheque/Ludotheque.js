import styles from "./Ludotheque.module.scss";
import { useState } from "react";
import { Title } from "../../components/Title";
import { Line } from "../../components/Line";
import { games } from "../../data/games";
import { CardGame } from "../../components/CardGame";


export function Ludotheque() {

    const [filter, Setfilter] = useState("");
    const handleInput = (e) => {
        const search = e.target.value;
        Setfilter(search.trim().toLowerCase())
    }

    return (
        <>

            <Title title="La ludothèque" />
            <Line />
            <div className={`${styles.search} mb20 d-flex justify-content-center align-items-center`}>
                <i className="fas fa-magnifying-glass mr10"></i>
                <input
                    className="flex-fill"
                    type="text"
                    placeholder="Rechercher"
                    onInput={handleInput} />
            </div>

            <div className={`${styles.grid}`}>
                {games
                    .filter((g) => g.title.toLowerCase().includes(filter))
                    .map((game) => (
                        <CardGame
                            game={game} />
                    ))}
            </div>

        </>
    )
}