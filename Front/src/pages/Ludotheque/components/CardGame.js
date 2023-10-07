import styles from "./CardGame.module.scss";
/**
 * 
 * @param {object} param0 
 * @returns section with one picture Game and his name
 */
export default function CardGame({ game }) {
    return (
        <section className={`${styles.container}`}>
            <article className={`${styles.img}`}>
                <img src={game.img} alt="" />
            </article>
            <p className={`${styles.title}`}>{game.title}</p>

        </section>
    );
};