import styles from "./Presentation.module.scss";
import { Title } from "../../components/utils/Title";
import { SecondTitle } from "../../components/utils/SecondTitle";
import { Line } from "../../components/utils/Line";
import logo from "../../assets/images/logo_complete.webp";
import Map from "./components/Map";
import town from "../../assets/images/laventie.jpg";
import shop1 from "../../assets/images/village.png";
import shop2 from "../../assets/images/antre.png";
import { Link } from "react-router-dom";


export default function Presentation() {
    return (
        <>

            <Title title="L'association" />
            <Line />
            <section className={`${styles.presentation}`}>
                <article className={`${styles.container} d-flex justify-content-center`}>
                    <div className={`${styles.img}`}>
                        <img src={logo} alt="logo complet de l'association" />
                    </div>
                    <article className={`${styles.content}`}>
                        <section className={`${styles.title} d-flex justify-content-center align-items-center`}>
                            <div className={`${styles.question1} mr10`}>
                                <i className="fa-solid fa-circle-question"></i>
                            </div>

                            <SecondTitle name="Qui sommes Nous ?" />

                        </section>
                        <p>
                            Les Dés Gommés est une association loi 1901 qui réunit des passionnés de jeux de société pour promouvoir cette passion entre personnes de tout horizon.
                        </p>
                    </article>
                </article>
                <section className={`${styles.whatElse}`}>
                    <section className={`${styles.title} d-flex align-items-center justify-content-center`}>
                        <i className="fa-solid fa-comment"></i>
                        <SecondTitle name="Et sinon" />
                    </section>
                    <article className={`${styles.content}`}>
                        <p className={`${styles.p}`}>
                            Concrètement nous nous réuinissons tous les lundi soirs à Laventie à partir de 19h autour des jeux de l'association ou de ses membres. d'accord mais quels types de jeux ?
                        </p>
                        <ul>
                            <li className={`${styles.li}`}>des jeux d'ambiance (bluff/hasard/coopération...) pour se détendre</li>
                            <li className={`${styles.li}`}>pour ceux qui cherchent plus de réflexion les famuex"kubenbois"</li>
                            <li className={`${styles.li}`}>du jeu de rôle</li>
                            <li className={`${styles.li}`}>les lancés de dés, le sfigurines ne vous font pas peut ? Il y aégalement ce qu'il faut</li>
                        </ul>
                        <p className={`${styles.p}`}>Vous l'aurez compris il y a de <span>tout et pour tout le monde</span> et avec tout un tas de bénévoles pour expliquer les règles !</p>
                        <p className={`${styles.p}`}>Nous sommes aussi présents sur diverses manifestations (festival/ salon de jeu ...)</p>
                    </article>
                </section>
                <section className={`${styles.joinUs}`}>
                    <article className={`${styles.title} d-flex align-items-center justify-content-center`}>
                        <i class="fa-solid fa-dice-d6"></i>
                        <SecondTitle name="Comment adhérer ?" />
                    </article>
                    <p>
                        Rien de plus simple ! Veneze tester. Vous avez aimé l'ambiance, le concept nous vous expliquerons comment vous pouvez, si vous le souhaitez, adhérer.
                    </p>
                </section>

                <section className={`${styles.map}`}>
                    <section className={`${styles.content}`}>
                        <aside className={`${styles.title} d-flex  justify-content-center align-items-center`}>
                            <i className="fa-solid fa-location-pin"></i>
                            <SecondTitle name="Où nous trouver ?" />
                        </aside>
                        <article className={`${styles.adress}`}>
                            <p>Le salon Montmorency attenant à la des fêtes :</p>
                            <p>Rue Delphin</p>
                            <p>62840 Laventie</p>
                        </article>
                    </section>

                    <Map />

                </section>
                <section className={`${styles.partners}`}>
                    <article className={`${styles.title} d-flex  justify-content-center align-items-center`}>
                        <i class="fa-solid fa-handshake-simple"></i>
                        <SecondTitle name="Nos Partenaires" />
                    </article>
                    <article className={`${styles.images} d-flex
                align-items-center justify-content-around`}>
                        <Link to="https://www.laventie.fr/">
                            <img src={town} alt="logo de la ville de Laventie" target="_blank" />
                        </Link>
                        <Link to="https://www.villagedujeu.com/" target="_blank">
                            <img src={shop1} alt="logo du village du jeu" />
                        </Link>
                        <Link to="https://lantredudragon.fr/" target="_blank">
                            <img src={shop2} alt="logo antre du dragon" />
                        </Link>
                    </article>
                </section>
            </section>

        </>
    );
}
