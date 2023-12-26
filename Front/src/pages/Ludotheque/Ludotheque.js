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
import { Link } from "react-router-dom";

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

    const [currentPage, setCurrentPage] = useState(1);
    const viewPerPage = 12;
    const [noGames, setNoGames] = useState(false);
    const lastIndex = currentPage * viewPerPage;
    const firstIndex = lastIndex - viewPerPage;
    const viewsGames = filteredGames.slice(firstIndex, lastIndex);
    const numberOfPage = Math.ceil(filteredGames.length / viewPerPage);
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
    useEffect(() => {
        (viewsGames.length === 0) ? (setNoGames(true)) : (setNoGames(false));
    }, [viewsGames]);


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

                    <section className={`${styles.grid}`}>
                        {viewsGames
                            .filter((g) => g.nameGame.toLowerCase().includes(filter))
                            .map((game, i) => (
                                <CardGame
                                    game={game} key={i} deleteGameFront={deleteGameFront} />
                            ))}
                    </section>
                    {noGames && <p className="form-error text-center my20"> Aucun jeu trouvé à ce nom ...</p>}

                    <nav className="d-flex justify-content-center mb20">
                        <ul className="d-flex">
                            <li className="mr10">
                                <Link to="#" onClick={previousPage} className='page-link'>Précédent</Link>
                            </li>
                            {numbers.map((n, i) => (
                                <li key={i} className={`mr10 ${currentPage === n ? "active" : ""}`}>
                                    <Link to="#" onClick={() => changeCurrentPage(n)}  >
                                        {n}
                                    </Link>
                                </li>
                            ))}
                            <li className="mr10">
                                <Link to="#" onClick={nextPage} className='page-link'>Suivant</Link>
                            </li>
                        </ul>
                    </nav>
                    <ScrollToTopButton />
                </>
            )}



        </>
    );
}