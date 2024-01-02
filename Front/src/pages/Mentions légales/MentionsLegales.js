import { Title } from "../../components/utils/Title";
import { Line } from "../../components/utils/Line";
import { Link } from "react-router-dom";


export default function MentionsLegales() {
    return (
        <>
            <Title title="Mentions légales" />
            <Line />
            <section className="rules">
                <article className="my20">
                    <p>Le site internet est édité et exploité par :</p>
                    <h3>LES DES GOMMES</h3>
                    <p>Association loi 1901</p>
                    <p>E-mail : <Link className="linkMentions" to="mailto:lesdesgommes@gmail.com" title="Envoyer un mail à l'association">lesdesgommes@gmail.com</Link> </p>
                </article>
                <article className="my20">
                    <h3>Propriété intellectuelle</h3>
                    <p>Toutes les photos sont la propriété de Mickael Carton président de l'association et Anthony Becque créateur du site</p>
                </article>
                <article className="my20">
                    <h3>Hébergement :</h3>
                    <Link to="https://vercel.com/" title="redirection vers Vercel">Vercel</Link>
                </article>
            </section >
        </>
    );
}
