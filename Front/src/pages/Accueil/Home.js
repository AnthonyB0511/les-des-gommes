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
    return (
        <>

            <section className={`${styles.pres}`}>
                <div className={`${styles.imgAsso}`}>
                    {articles[0]?.photo && <img src={`http://localhost:8000/imgArticles/${articles[0].photo}`} alt={articles[0]?.descriptionPhoto} />
                    }
                </div>
                <section className={`${styles.presAsso}`}>
                    <h1 className="text-center"><strong>Les Dés Gommés</strong></h1>
                    <Line />
                    <p>{articles[0]?.content}</p>
                    <Link to="/presentation" className="mt30 d-flex justify-content-center" title="Lien vers présentation" >
                        <Button
                            needButton={articles[0]?.needButton}
                            txtButton="En savoir plus" />
                    </Link>
                </section>
            </section>
            <section className={`${styles.flex}`}>
                {/* <SecondTitle name="Les actualités" className='text-center' /> */}
                <article className={`${styles.container}`}>
                    <SecondTitle name="Les actualités" />
                    <Line />

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

        </>


    );
}