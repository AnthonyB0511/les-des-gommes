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
            <div className={`${styles.container}`}>
            {actu.map((oneActu)=>(
                <Card 
                actu={oneActu}/>
            ))}
            </div>
            <DernieresSeances />
        </div>
            <MustHave 
            must={must} />
    </>
    
    )
}