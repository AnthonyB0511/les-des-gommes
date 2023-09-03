import styles from "./MustHave.module.scss";
import { SecondTitle } from "./SecondTitle"
import { Line } from "./Line"

export default function MustHave({must}){
    return(
        <div className="mb50">
            <SecondTitle name="Les jeux plébbiscités par les adhérents"/>
            <Line />
           
            {must.map ((oneGame) => (
                <div className={`${styles.container} ${oneGame.reverse && styles.reverse} d-flex p20 mb20`}>
                    <div className={`${styles.img}`}>
                        <img src={oneGame.image} alt="" />
                    </div>
                    <div className={`${styles.content}`}>
                        <h3 className="p">{oneGame.title}</h3>
                        <Line 
                        reverse={true}/>
                        <p>{oneGame.text}</p>
                    </div>
                </div>
            
                
            ))}
        </div>
    )
}