import styles from "./DernieresSeances.module.scss";
import { Line } from "../../../components/utils/Line";
import { SecondTitle } from "../../../components/utils/SecondTitle";
import { SimpleSlider } from "../components/Carrousel/SimpleSlider";
import { carrousel1 } from "../../../data/carrousel1";
import { carrousel2 } from "../../../data/carrousel2";
/**
 * @params{object} with links for  Sliders }
 * @returns section with sliders
 */
export default function DernieresSeances() {
    return (
        <section className={`${styles.seances}`}>
            <SecondTitle name="Les dernières séances photos" />
            <Line />

            <SimpleSlider
                nameOfCarrousel={carrousel1} />
            <div></div>
            <SimpleSlider
                nameOfCarrousel={carrousel2} />
        </section>
    );
}