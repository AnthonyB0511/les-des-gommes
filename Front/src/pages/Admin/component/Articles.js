import ModifArticles from "./ModifArticles";
import styles from "./Article.module.scss";
import { useContext } from "react";
import { ApiContext } from "../../../context/ApiContext";
import { useFetchAdmin } from "../../../Hooks/UseFetchAdmin";
export default function Articles() {
    const BASE_API_URL = useContext(ApiContext);
    const articles = useFetchAdmin(BASE_API_URL, "articles/readArticle");
    return (

        <section className={`${styles.form}`}>
            {articles.map((article, i) => (
                <ModifArticles key={i} article={article} index={i} />
            ))}

        </section>
    );
}
