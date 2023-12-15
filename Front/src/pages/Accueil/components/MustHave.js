import styles from "./MustHave.module.scss";
import { Line } from "../../../components/utils/Line";
/**
 * 
 * @param {object} param0 1 long text (description) 1 image
 * @returns two articles with 1 long text and 1 picture
 */
export default function MustHave({ must }) {
    return (
        <section className={`${styles.div}`}>
            <article className={`${styles.container} ${must.reverse && styles.reverse} d-flex p20 mb20`}>
                {must?.photo &&
                    <aside className={`${styles.img}`}>
                        <img src={`http://localhost:8000/imgArticles/${must.photo}`} alt="" />
                    </aside>
                }

                <div className={`${styles.content}`}>
                    <section>
                        <h3 className="p">{must.title}</h3>
                        <Line
                            reverse={true} />
                        <p className="text-center">{must.content}</p>
                    </section>
                </div>
            </article>



        </section>
    );
}