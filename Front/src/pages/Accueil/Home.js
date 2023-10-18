import Card from "../Accueil/components/Card";
import DernieresSeances from "../Accueil/components/DernieresSeances";
import MustHave from "../Accueil/components/MustHave";
import styles from "./Home.module.scss";
import { actu } from "../../data/actu";
import { must } from "../../data/must";

export default function Home() {
    return (
        <>
            <main className={`${styles.flex}`}>
                <article className={`${styles.container}`}>
                    {actu.map((oneActu, i) => (
                        <Card
                            actu={oneActu} key={i} />
                    ))}
                </article>
                <DernieresSeances />
            </main>
            <MustHave
                must={must} />

        </>

    );
}