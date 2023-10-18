import styles from "./MustHave.module.scss";
import { SecondTitle } from "../../../components/utils/SecondTitle";
import { Line } from "../../../components/utils/Line";
/**
 * 
 * @param {object} param0 1 long text (description) 1 image
 * @returns two articles with 1 long text and 1 picture
 */
export default function MustHave({ must }) {
    return (
        <section className={`${styles.div}`}>
            <SecondTitle name="Les jeux plébiscités par les adhérents" />
            <Line />


            {must.map((oneGame, i) => (
                <article key={i} className={`${styles.container} ${oneGame.reverse && styles.reverse} d-flex p20 mb20`}>
                    <aside className={`${styles.img}`}>
                        <img src={oneGame.image} alt="" />
                    </aside>
                    <div className={`${styles.content}`}>
                        <h3 className="p">{oneGame.title}</h3>
                        <Line
                            reverse={true} />
                        <p>{oneGame.text}</p>
                    </div>
                </article>


            ))}
        </section>
    );
}