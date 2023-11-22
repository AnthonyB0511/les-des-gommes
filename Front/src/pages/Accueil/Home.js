import Card from "../Accueil/components/Card";
import DernieresSeances from "../Accueil/components/DernieresSeances";
import MustHave from "../Accueil/components/MustHave";
import styles from "./Home.module.scss";
import { Line } from "../../components/utils/Line";
import { SecondTitle } from "../../components/utils/SecondTitle";
import { useFetchAdmin } from "../../Hooks/UseFetchAdmin";
import { useContext } from "react";
import { ApiContext } from "../../context/ApiContext";

export default function Home() {
    const BASE_API_URL = useContext(ApiContext);
    const articles = useFetchAdmin(BASE_API_URL, "articles/readArticle");
    console.log(articles);
    return (
        <>
            <main className={`${styles.flex}`}>
                <article className={`${styles.container}`}>
                    {articles.slice(0, 3).map((article, i) => (
                        <Card actu={article} key={i} />
                    ))}
                </article>
                <DernieresSeances />
            </main>
            <SecondTitle name="Les jeux plébiscités par les adhérents" />
            <Line />
            {articles.slice(3, 6).map((article, i) => (
                <MustHave must={article} key={i} />
            ))}
            {/* <MustHave
                must={must} /> */}

        </>

    );
}