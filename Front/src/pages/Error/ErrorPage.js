import styles from "./Errorpage.module.scss";
import Loading from "../../components/utils/Loading";
import { Link } from "react-router-dom";


export default function ErrorPage() {


    return (
        <section className={`${styles.errorPage}`}>
            <h1><i className="fa-solid fa-bug mr20"></i>Erreur 404</h1>
            <p className="mb20">Il semblerait qu'il y ait une erreur</p>
            <Loading />
            <Link to="/" title="Retourner vers la page d'accueil">Retour à la page d'accueil</Link>
        </section>
    );
}
