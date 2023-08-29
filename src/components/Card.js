import styles from "./Card.module.scss"

export function Card ({actu}) {
    return(
        <div className={`${styles.container}`}>
            {actu.map((oneActu) => (
            <div className={`${styles.card} m20`}>
                <div className={`${styles.img}`}>
                    <img src={oneActu.image} alt="" />
                </div>
                <div className={`${styles.content}`}>
                    <p>{oneActu.text}</p>
                </div>
            </div>
        ))}
        </div>       
        
    )
}