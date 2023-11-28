import ModifArticles from "./ModifArticles";
import { useContext } from "react";
import { ApiContext } from "../../../context/ApiContext";
import { useFetchAdmin } from "../../../Hooks/UseFetchAdmin";
export default function Articles() {
    const BASE_API_URL = useContext(ApiContext);
    const articles = useFetchAdmin(BASE_API_URL, "articles/readArticle");
    return (

        <section>
            {articles.map((article, i) => (
                <ModifArticles key={i} article={article} index={i} />
            ))}

        </section>
    );
}
