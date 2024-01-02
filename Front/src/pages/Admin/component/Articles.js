import ModifArticles from "./ModifArticles";
import { useContext, useState } from "react";
import { ApiContext } from "../../../context/ApiContext";
import { useFetchAdmin } from "../../../Hooks/UseFetchAdmin";
export default function Articles() {
    const BASE_API_URL = useContext(ApiContext);
    const articles = useFetchAdmin(BASE_API_URL, "articles/readArticle");
    const [selectedArticle, setSelectedArticle] = useState(0);
    const handleSelectChange = (e) => {
        const selectedIndex = e.target.value;
        setSelectedArticle(selectedIndex);
    };
    return (
        <>
            <section className="d-flex justify-content-center align-items-center">
                <h3>Remplacer l'article n°</h3>
                {/* modifie l'article à changer */}
                <select onChange={handleSelectChange} value={selectedArticle}>
                    {articles.map((article, i) => (
                        <option key={i} value={i}>{`${i + 1}`}</option>
                    ))}
                </select>
            </section>
            <ModifArticles article={articles[selectedArticle]} selectedIndex={selectedArticle} />
        </>


    );
}
