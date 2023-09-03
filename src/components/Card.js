import styles from "./Card.module.scss"
import { Button } from "./Button"

export function Card ({actu}) {
    return(
        <div className={`${styles.card} m20`}>
            <div className={`${styles.img}`}>
                <img src={actu.image} alt="" />
            </div>
            <div className={`${styles.content}`}>
                <p>{actu.text}</p>
                <Button 
                needButton={actu.needButton}
                txtButton="Cliquer ICI"/>
            </div>
        </div>
       
        
    )
}