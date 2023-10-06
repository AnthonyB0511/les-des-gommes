import styles from "./Presentation.module.scss";
import { Title } from "../../components/utils/Title";
import { SecondTitle } from "../../components/utils/SecondTitle";
import { Line } from "../../components/utils/Line";
import logo from "../../assets/images/logo_complete.webp";
import map from "../../assets/images/salle.png";
import Map from "../../components/utils/Map";
import town from "../../assets/images/laventie.jpg";
import shop1 from "../../assets/images/village.png";
import shop2 from "../../assets/images/antre.png";


export default function Presentation() {
    return (
        <>

            <Title title="L'association" />
            <Line />
            <div className={`${styles.presentation}`}>
                <div className={`${styles.container} d-flex justify-content-center`}>
                    <div className={`${styles.img}`}>
                        <img src={logo} alt="logo complet de l'association" />
                    </div>
                    <div className={`${styles.content}`}>
                        <div className={`${styles.title} d-flex justify-content-center align-items-center`}>
                            <div className={`${styles.question1}`}>
                                <i className="fa-solid fa-circle-question"></i>
                            </div>
                            <div className={`${styles.question2}`}>
                                <i className="fa-solid fa-circle-question"></i>
                            </div>
                            <SecondTitle name="Qui sommes Nous ?" />

                        </div>
                        <p>
                            Les Dés Gommés est une association loi 1901 qui réunit des passionnés de jeux de société pour promouvoir cette passion entre personnes de tout horizon.
                        </p>
                    </div>
                </div>
                <div className={`${styles.whatElse}`}>
                    <div className={`${styles.title} d-flex align-items-center justify-content-center`}>
                        <i className="fa-solid fa-comment"></i>
                        <SecondTitle name="Et sinon" />
                    </div>
                    <div className={`${styles.content}`}>
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
                    </div>
                </div>
                <div className={`${styles.joinUs}`}>
                    <div className={`${styles.title} d-flex align-items-center justify-content-center`}>
                        <i class="fa-solid fa-dice-d6"></i>
                        <SecondTitle name="Comment adhérer ?" />
                    </div>
                    <p>
                        Rien de plus simple ! Veneze tester. Vous avez aimé l'ambiance, le concept nous vous expliquerons comment vous pouvez, si vous le souhaitez, adhérer.
                    </p>
                </div>

                <div className={`${styles.map}`}>
                    <div className={`${styles.content}`}>
                        <div className={`${styles.title} d-flex  justify-content-center align-items-center`}>
                            <i className="fa-solid fa-location-pin"></i>
                            <SecondTitle name="Où nous trouver ?" />
                        </div>
                        <div className={`${styles.adress}`}>
                            <p>Le salon Montmorency attenant à la des fêtes :</p>
                            <p>Rue Delphin</p>
                            <p>62840 Laventie</p>
                        </div>
                    </div>
                    <div className={`${styles.img}`}>
                        {/* <img src={map} alt="localisation de la salle ou se déroule les séances" /> */}
                        <Map />
                    </div>
                </div>
                <div className={`${styles.partners}`}>
                    <div className={`${styles.title} d-flex  justify-content-center align-items-center`}>
                        <i class="fa-solid fa-handshake-simple"></i>
                        <SecondTitle name="Nos Partenaires" />
                    </div>
                    <div className={`${styles.images} d-flex
                align-items-center justify-content-around`}>
                        <a href="">
                            <img src={town} alt="" />
                        </a>
                        <a href="">
                            <img src={shop1} alt="" />
                        </a>
                        <a href="">
                            <img src={shop2} alt="" />
                        </a>
                    </div>
                </div>
            </div>

        </>
    );
}
