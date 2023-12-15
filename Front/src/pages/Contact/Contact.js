import { Title } from "../../components/utils/Title";
import { Line } from "../../components/utils/Line";
import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ApiContext } from "../../context";
import { useNavigate } from "react-router-dom";
import styles from "./Contact.module.scss";

export default function Contact() {
    const [feedbackGood, setFeedbackGood] = useState("");
    const [feedback, setFeedback] = useState("");
    const BASE_API_URL = useContext(ApiContext);
    const navigate = useNavigate();
    const yupSchema = yup.object({
        name: yup.string().required("Ce champ est obligatoire"),
        firstname: yup.string().required("Ce champ est obligatoire "),
        email: yup
            .string()
            .required("ce champ est obligatoire")
            .matches(
                /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                "Votre email n'est pas valide"
            ),
        subject: yup.string().required("Ce champ est obligatoire "),
        message: yup.string().required("Ce champ est obligatoire"),
        rules: yup
            .boolean()
            .oneOf([true], 'Veuillez cocher la case si vous souhaitez envoyer votre formulaire'),
    });
    const defaultValues = {
        name: "",
        firstname: "",
        email: "",
        subject: "",
        message: "",
        rules: false
    };
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues,
        resolver: yupResolver(yupSchema),
    });
    const submit = async (values) => {

        try {
            const response = await fetch(`${BASE_API_URL}/contact/send`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values)
            });
            if (response.ok) {
                setFeedbackGood("Votre message a bien été envoyé");
                reset(defaultValues);
                setTimeout(() => {
                    setFeedbackGood("");
                    navigate("/");
                }, 3000);
            }

        } catch (error) {
            setFeedback("Une erreur est survenue");
            console.error(error);
        }
    };

    return (

        <>
            <Title title="Contact" />
            <Line />
            <form onSubmit={handleSubmit(submit)} className="form2">
                <h2 className="text-center">Vous avez une question ? C'est par ici !</h2>

                <label htmlFor="name" className="labelAdmin">Nom </label>
                <input type="text" id="name" className="inputAdmin"{...register("name")} title="Votre nom" />
                {errors?.name && <p className="form-error">{errors.name.message}</p>}

                <label htmlFor="firstname" className="labelAdmin">Prénom </label>
                <input type="text" id="firstname" className="inputAdmin"{...register("firstname")} title="Votre prénom" />
                {errors?.firstname && <p className="form-error">{errors.firstname.message}</p>}

                <label htmlFor="email" className="labelAdmin">Email </label>
                <input type="text" id="email" className="inputAdmin"{...register("email")} title="Renseigner votre email" />
                {errors?.email && <p className="form-error">{errors.email.message}</p>}

                <label htmlFor="subject" className="labelAdmin">Sujet de votre demande</label>
                <select name="" id="subject" className="inputAdmin" {...register(`subject`)} >
                    <option value="Adhésion">Adhésion</option>
                    <option value="Demandes d'informations">Demandes d'informations</option>
                    <option value="Autre">Autre</option>
                </select>
                {/* <input type="text" id="subject" className="inputAdmin" {...register("subject")} title="Renseigner le sujet de votre demande" /> */}
                {errors?.subject && <p className="form-error">{errors.subject.message}</p>}

                <label htmlFor="message" className="labelAdmin">Votre message</label>
                <textarea id="message" {...register("message")} title="Renseigner le contenu de votre message" />
                {errors?.message && <p className="form-error">{errors.message.message}</p>}
                <section className={`${styles.rules}`}>
                    <input type="checkbox" id="rules" {...register("rules")} />
                    <p>En soumettant ce formulaire, j’accepte que mes informations soient utilisées exclusivement dans le cadre de ma demande</p></section>
                {errors?.rules && <p className="form-error text-center">{errors.rules.message}</p>}

                <button className="btn mt20" title="Soumettre le formulaire">Envoyer votre message</button>
                {feedback && <p className='form-error'>{feedback}</p>}
                {feedbackGood && <p className="feedbackGood">{feedbackGood}</p>}

            </form>
        </>
        // </main>
    );
}
