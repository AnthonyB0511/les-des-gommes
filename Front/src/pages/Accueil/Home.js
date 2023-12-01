import Card from "../Accueil/components/Card";
import DernieresSeances from "../Accueil/components/DernieresSeances";
import MustHave from "../Accueil/components/MustHave";
import styles from "./Home.module.scss";
import { Line } from "../../components/utils/Line";
import { Button } from "../../components/utils/Button";
import { SecondTitle } from "../../components/utils/SecondTitle";
import { useFetchAdmin } from "../../Hooks/UseFetchAdmin";
import { useContext } from "react";
import { ApiContext } from "../../context/ApiContext";
import { Link } from "react-router-dom";

export default function Home() {
    const BASE_API_URL = useContext(ApiContext);
    const articles = useFetchAdmin(BASE_API_URL, "articles/readArticle");
    console.log(articles);
    return (
        <>
            <main>
                <section className={`${styles.pres}`}>
                    {articles[0]?.photo && <img src={`http://localhost:8000/imgArticles/${articles[0].photo}`} alt="" />
                    }

                    <section></section>
                    <p>{articles[0]?.content}<Link to="/presentation" >
                        <Button
                            needButton={articles[0]?.needButton}
                            txtButton="Cliquer ICI" />
                    </Link></p>

                </section>
                <section className={`${styles.flex}`}>
                    <article className={`${styles.container}`}>
                        {articles.slice(1, 3).map((article, i) => (
                            <Card actu={article} key={i} />
                        ))}
                    </article>
                    <DernieresSeances />
                </section>
                <SecondTitle name="Les jeux plébiscités par les adhérents" />
                <Line />
                {articles.slice(3, 6).map((article, i) => (
                    <MustHave must={article} key={i} />
                ))}

            </main>
        </>

    );
}