import { Card } from "./Card"
import { DernieresSeances } from "./DernieresSeances";
import MustHave from "./MustHave";
import styles from "./Content.module.scss";
import { actu } from "../data/actu";
import { must } from "../data/must"
export default function Content(){
    return (
        <>
        <div className= {`${styles.flex}`}>
            <Card 
            actu={actu}/>
            <DernieresSeances />
        </div>
            <MustHave 
            must={must} />
    </>
    
    )
}