import styles from "./Card.module.scss";
import { Button } from "../../../components/utils/Button";
import { Link } from "react-router-dom";
/**
 * 
 * @param {object} param0 (object with 1 string 1 link of image) 
 * @returns section 1  text, 1 picture for illustration and maybe a button{needButtton}
 */
export default function Card({ actu }) {
    return (
        <section className={`${styles.card} m20`}>
            <div className={`${styles.img}`}>
                <img src={`http://localhost:8000/imgArticles/${actu.photo}`} alt={actu.descriptionPhoto} />
            </div>
            <article className={`${styles.content}`}>
                <p>{actu.content}</p>
                <Link to="/presentation" >
                    <Button
                        needButton={actu.needButton}
                        txtButton="Cliquer ICI" />
                </Link>

            </article>
        </section>


    );
}