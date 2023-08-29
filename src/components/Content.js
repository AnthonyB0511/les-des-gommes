import { Card } from "./Card"
import { actu } from "../data/actu"
import { DernieresSeances } from "./DernieresSeances";
import styles from "./Content.module.scss"
export default function Content(){
    return (
        <>
        <div className= {`${styles.flex}`}>
            <Card 
            actu={actu}/>
            <DernieresSeances />
        </div>
    </>
    
    )
}