import styles from "./DernieresSeances.module.scss";
import { Line } from "./Line";
import { SecondTitle } from "./SecondTitle";
import { SimpleSlider } from "../Carrousel/SimpleSlider";
import { carrousel1 } from "../../data/carrousel1";
import { carrousel2 } from "../../data/carrousel2";
export function DernieresSeances() {
    return (
        <div className={`${styles.seances}`}>
            <SecondTitle name="Les dernières séances photos" />
            <Line />
            <SimpleSlider
                nameOfCarrousel={carrousel1} />
            <div></div>
            <SimpleSlider
                nameOfCarrousel={carrousel2} />
        </div>
    );
}