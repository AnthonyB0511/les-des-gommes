import styles from "./DernieresSeances.module.scss";
import { Line } from "../../../components/utils/Line";
import { SecondTitle } from "../../../components/utils/SecondTitle";
import { SimpleSlider } from "../components/Carrousel/SimpleSlider";
import { useFetchAdmin } from "../../../Hooks/UseFetchAdmin";
import { useContext } from "react";
import { ApiContext } from "../../../context";

/**
 * @params{object} with links for  Sliders }
 * @returns section with sliders
 */
export default function DernieresSeances() {
    const BASE_API_URL = useContext(ApiContext);
    const carrousel = useFetchAdmin(BASE_API_URL, 'photos/getPhotosCarrousel');
    return (
        <section className={`${styles.seances}`}>
            <SecondTitle name="Les dernières séances en photos" />
            <Line />

            <SimpleSlider
                nameOfCarrousel={carrousel} />

        </section>
    );
}