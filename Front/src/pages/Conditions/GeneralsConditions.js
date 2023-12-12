import { Title } from "../../components/utils/Title";
import { Line } from "../../components/utils/Line";
import ScrollToTopButton from "../Discussion/component/ScrollToTopButton";
export default function GeneralsConditions() {
    return (
        <>
            <Title title="Conditions générales" />
            <Line />
            <section className="rules">
                <article className="my30">
                    <h3>Introduction</h3>

                    <li className="my20">Le site internet "Les Dés Gommés" est un site communautaire rassembalnt les membres de l'association et des personnes extérieures autour d'une passion : le jeu de société moderne. </li>
                    <li>Il présente l'association,son actualité et permet aux utilisateurs ayant un compte d'échanger sur un espace discussion.</li>

                </article>
                <article className="my30">
                    <h3>Objet des présentes conditions générales</h3>

                    <li className="my20">Les présentes conditions générales de sont pour objet de définir les conditions dans lesquelles Les Dés Gommés Vous met à disposition sur le Site certains Services soumis ou non à inscription préalable.</li>
                </article>
                <article className="my30">
                    <h3>Acceptation des conditions générales</h3>

                    <li className="my20">Les Conditions Générales ont pour objet de définir les conditions dans lesquelles les Internautes peuvent consulter le Site et bénéficier des Services libres et dans lesquelles les Utilisateurs bénéficiant d’un Compte peuvent bénéficier des Services réservés</li>
                    <li>L'accès, la création d’un Compte, ou l'utilisation de tout ou partie du Site et/ou des Services implique(nt) l'acceptation sans restriction ni réserves des présentes Conditions Générales, ainsi que de la Politique de confidentialité.</li>

                </article>
                <article>
                    <h3>Information et protection des mineurs</h3>

                    <li className="my20">
                        Si vous êtes mineur et que vous souhaitez utiliser les services des Dés Gommés, vous devez prendre connaissance à l'aide de vos paretns ou représetnants légaux  et obtenir leur consentement pour l'utilisation des services.
                    </li>
                    <li className="my20">
                        Les parents ou représentants légaux peuvent clôturer à tout moment le compte du mineur en faisant parvenir  un courrier éléctronique à l'adresse mail suivante :
                        <a className="linkMentions" href="mailto:lesdesgommes@gmail.com" title="Envoyer un mail à l'association"> lesdesgommes@gmail.com</a>
                    </li>
                    <li className="my20">L'association les dés Gommés se réservent le droit de restreindre l'accès à certains services pour les enfants de moins de 15 ans.</li>
                    <li>Toute utilisation des services par un mineur sera présumée validée par les représentants légaux</li>

                </article>
                <article className="my30">
                    <h3>Compte Les Dés Gommés</h3>

                    <li className="my20">
                        Pour accéder aux services réservés vous devez créer un compte. Lors de la création du compte vous devez y fournir les données complètes et exactes.
                    </li>
                    <li className="my20">
                        Vous devez immédiatement avertir Les dés Gommés de tout problème  de sécurité ou utilisation non autorisée de votre compte dont voous auriez connaissance
                    </li>
                    <li className="my20">
                        En cas de signalement par u tiers, les Dés Gommés se réservent le droit de suspendre votre accès aux Services
                    </li>

                </article>
                <article className="my30">
                    <h3>Element d'identification</h3>
                    <li className="my20">
                        Après votre inscription, vous avez des éléments permettant votre connexion : votre adresse email et mot de passe.
                        Vous ne devez en aucun cas les transmettre à une tierce personne
                    </li>
                </article>
                <article className="my30">
                    <h3>Les services</h3>
                    <li className="my20">
                        Les services libres ne nécessitent pas de comptes. ils permettent de voir la ludothèque de l'association, son actualité et de contacter l'association
                    </li>
                    <li className="my20">Les autres services nécessitant un compte est l'espace discussion</li>
                    <li className="my20">Les utilisateurs sont responsables du contenu qu'ils partagent dans l'espace de discussion.</li>
                    <li className="my20">Les utilisateurs sont encouragés à signaler tout comportement inapproprié ou violation des règles de l'espace de discussion.</li>
                    <li className="my20">Le site se réserve le droit de modérer le contenu de l'espace de discussion.</li>
                    <li className="my20">Les utilisateurs sont tenus de respecter les droits des autres membres de la communauté.</li>
                    <li className="my20">En cas de litige ou de non respect des règles l'administrateur se réserve le droit de suspendre ce service aux utilisateurs concernés.</li>
                </article>
                <article className="my30">
                    <h3>Règles de bonne conduite</h3>
                    <li className="my20">L'espace discussion nécessite un certain niveau de confiance. merci d'agir de façon responsable</li>
                    <li className="my20">L'association Les Dés Gommés procède à une vérification de tout contenu signalé</li>
                    <li className="my20">Le site n'est pas prévu à du contenu strictement promotionnel</li>
                    <li className="my20">Ne publiez pas de contenu répréhensible par la loi</li>
                </article>
                <article className="my30">
                    <h3>Suppresion de compte</h3>
                    <li>vous avez la possibilité de supprimer votre compte à tout moment. cette opération est définitivé.</li>
                </article>

            </section >
            <ScrollToTopButton />
        </>
    );
}
