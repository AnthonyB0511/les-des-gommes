import { Title } from "../../components/utils/Title";
import { Line } from "../../components/utils/Line";
import { Link } from "react-router-dom";
import ScrollToTopButton from "../Discussion/component/ScrollToTopButton";
const Confidentialite = () => {
    return (
        <>
            <Title title="Politique de confidentialité" />
            <Line />
            <section className="rules">
                <article>
                    <h3>Préambule</h3>
                    <li className="my20">Cette Politique de confidentialité définit notre approche en matière de traitement des Données Personnelles Vous concernant que nous collectons auprès de Vous ou que des tiers nous communiquent de manière licite ainsi que les finalités de ces traitements. Elle décrit également Vos droits au regard de nos traitements de Vos Données Personnelles.</li>
                    <li className="my20">Nous sommes amenés, à collecter des données personnelles auprès de ous dans le cadre de l’utilisation de Votre Compte Vous permettant d’accéder à tous les Contenus du Site et d’utiliser les Services.</li>
                </article>
                <article className="my30">
                    <h3>Age minimum</h3>
                    <li className="my20">La préservation de la sécurité et de la vie privée des enfants est très importante . Nous ne recueillons ni n’utilisons volontairement des Données Personnelles de personnes n’ayant pas atteint l’âge de 15 ans, sans le consentement à la fois de l’enfant et du titulaire de la responsabilité parentale.</li>
                    <li className="my20">Aussi, vous confirmez que vous avez au moins 15 ans ou plus lorsque vous fournissez vos données personnelles en lien avec l’utilisation de nos services. Si Vous n’avez pas au moins 15 ans, Vous devez demander l’autorisation de Vos parents ou tuteur légal pour nous fournir Vos Données Personnelles. Pour ce faire, veuillez nous contacter aux coordonnées indiquées sur <Link className="linkMentions" to="mailto:lesdesgommes@gmail.com" title="Envoyer un mail à l'association">lesdesgommes@gmail.com</Link></li>


                </article>
                <article className="my30">
                    <h3>Quelles données sont collectées ?</h3>
                    <li className="my20">Vos données relatives à votre identification : adresse e-mail, nom, prénom</li>
                    <li className="my20">Données de contenus communiqués sur le site (notamment) sur l'espace discussion</li>
                    <li className="my20">Nous ne procédons à aucune collecte de données personnelles dites "sensible".</li>
                </article>
                <article className="my30">
                    <h3>Le traîtement des données</h3>
                    <li className="my20">Pour vous identifier via votre compte et vous permettre d'accéder au site</li>
                    <li>Pour modérer les contenus que vous diffusez via le service</li>
                </article>
                <article className="my30">
                    <h3>Conservation des données</h3>
                    <li className="my20">Vos données sont conservées tant que votre compte est actif</li>
                    <li className="my20">Lors de la suppression du compte toutes vos données sont supprimées notamment les messages que vous avez postés.</li>
                </article>
                <article className="my30">
                    <h3>Sécurité de vos données</h3>

                    <li className="my20">Sécurité du mot de passe : nous prenons toute les précautions pour assurer un stockage sécurisé de votre mot de passe. Toutefois la sécurité de ce mot de passe dépend de sa conception.</li>
                    <li className="my20">Le mot de passe doit comporter 8 caractères avec des majuscules minuscules caractère alpha numérique et caractères spéciaux</li>
                    <li className="my20">Vos données ne sont transmises à aucun tiers si ce n'est pour garantir l'accès au service : l'hébergeur du site.</li>
                </article>
                <article className="my30">
                    <h3>utilisation de cookies</h3>
                    <li className="my20">
                        Nous utilisons des cookies uniquement fonctionnels. Ces cookies servent à garder votre session active un certain temps lorsque vous êtes connecté.
                    </li>
                    <li className="my20">Lorsque vous vous déconnectez, nous procédons à la suppression de ce cookie.</li>
                    <li className="my20">Aucun cookie de publlicité n'est utilisé sur ce site</li>
                </article>
            </section>
            <ScrollToTopButton />
        </>
    );
};

export default Confidentialite;
