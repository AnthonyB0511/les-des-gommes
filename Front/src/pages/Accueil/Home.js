import Card from "../Accueil/components/Card";
import DernieresSeances from "../Accueil/components/DernieresSeances";
import MustHave from "../Accueil/components/MustHave";
import styles from "./Home.module.scss";
import { actu } from "../../data/actu";
import { must } from "../../data/must";

export default function Home() {
    return (
        <>

            <div className={`${styles.flex}`}>
                <div className={`${styles.container}`}>
                    {actu.map((oneActu) => (
                        <Card
                            actu={oneActu} />
                    ))}
                </div>
                <DernieresSeances />
            </div>
            <MustHave
                must={must} />

        </>

    );
}