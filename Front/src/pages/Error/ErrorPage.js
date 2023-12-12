import styles from "./Errorpage.module.scss";
import Loading from "../../components/utils/Loading";
import { useNavigate } from "react-router-dom";


export default function ErrorPage() {
    const navigate = useNavigate();

    const redirection = () => {
        setTimeout(() => {
            navigate("/");
        }, 3000);
    };
    redirection();

    return (
        <section className={`${styles.errorPage}`}>
            <h1><i className="fa-solid fa-bug mr20"></i>Erreur 404</h1>
            <p className="mb20">Il semblerait qu'il y ait une erreur</p>
            <Loading />
        </section>
    );
}
