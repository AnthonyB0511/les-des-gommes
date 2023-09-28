import styles from "./CardGame.module.scss";
export const CardGame = ({ game }) => {
    return (
        <div className={`${styles.container}`}>
            <div className={`${styles.img}`}>
                <img src={game.img} alt="" />
            </div>
            <div className={`${styles.title}`}>
                <p>{game.title}</p>
            </div>
        </div>
    );
};