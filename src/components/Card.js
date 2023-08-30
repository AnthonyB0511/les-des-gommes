import styles from "./Card.module.scss"
import { Button } from "./Button"

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
                    <Button 
                    needButton={oneActu.needButton}
                    txtButton="Cliquer ICI"/>
                </div>
            </div>

        ))}
      </div>       
        
    )
}