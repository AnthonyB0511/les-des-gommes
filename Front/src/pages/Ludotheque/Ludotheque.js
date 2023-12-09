import styles from "./Ludotheque.module.scss";
import { useState, useContext, useEffect } from "react";
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
    const [[games, setGames], isLoading] = useFetchData(BASE_API_URL, "games/getGames");
    //useState modifies the statut f search
    const [filter, Setfilter] = useState("");
    const filteredGames = games.filter(game =>
        game.nameGame.toLowerCase().includes(filter.toLowerCase())
    );

    const [currentPage, setCurrentPage] = useState(1);//page en cours
    const viewPerPage = 12;//nb de vues par pages
    const lastIndex = currentPage * viewPerPage;//dernier index affiché
    const firstIndex = lastIndex - viewPerPage; //premier index
    const viewsGames = filteredGames.slice(firstIndex, lastIndex); //récupère depuis firtstIndex mais lastindex ne l'est pas
    const numberOfPage = Math.ceil(filteredGames.length / viewPerPage); //nbr total de pages
    const numbers = [...Array(numberOfPage + 1).keys()].slice(1);


    function previousPage() {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    }
    function nextPage() {
        if (currentPage !== numberOfPage) {
            setCurrentPage(currentPage + 1);
        }
    }
    function changeCurrentPage(id) {
        setCurrentPage(id);
    }


    ;
    const deleteGameFront = (index) => {
        setGames(games.filter((game) => game.idGame !== index));

    };
    useEffect(() => {
        setCurrentPage(1);
    }, [filter]);

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
                    onInput={(e) => Setfilter(e.target.value)} />
            </section>

            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <main className={`${styles.grid}`}>
                        {viewsGames
                            .filter((g) => g.nameGame.toLowerCase().includes(filter))
                            .map((game, i) => (
                                <CardGame
                                    game={game} key={i} deleteGameFront={deleteGameFront} />
                            ))}
                    </main>
                    <nav className="d-flex justify-content-center mb20">
                        <ul className="d-flex">
                            <li className="mr10">
                                <a href="#" onClick={previousPage} className='page-link'>Précédent</a>
                            </li>
                            {numbers.map((n, i) => (
                                <li key={i} className={`mr10 ${currentPage === n ? "active" : ""}`}>
                                    <a href="#" onClick={() => changeCurrentPage(n)}  >
                                        {n}
                                    </a>
                                </li>
                            ))}
                            <li className="mr10">
                                <a href="#" onClick={nextPage} className='page-link'>Suivant</a>
                            </li>
                        </ul>
                    </nav>
                    <ScrollToTopButton />
                </>
            )}



        </>
    );
}