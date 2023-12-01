import { Title } from "../../components/utils/Title";
import { Line } from "../../components/utils/Line";
import styles from "./Contact.module.scss";
import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ApiContext } from "../../context";
import { useNavigate } from "react-router-dom";

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
            .required("Le champ est obligatoire")
            .matches(
                /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                "Votre email n'est pas valide"
            ),
        subject: yup.string().required("Ce champ est obligatoire "),
        message: yup.string().required("cechamp est obligatoire")
    });
    const defaultValues = {
        name: "",
        firstname: "",
        email: "",
        subject: "",
        message: "",
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
        console.log(values);
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
        // <main className={`${styles.contactForm}`}>
        <>
            <Title title="Contact" />
            <Line />
            <form onSubmit={handleSubmit(submit)} className="form2">
                <h2 className="text-center">Vous avez une question ? C'est par ici !</h2>

                <label htmlFor="name" className="labelAdmin">Nom *</label>
                <input type="text" id="name" className="inputAdmin"{...register("name")} />
                {errors?.name && <p className="form-error">{errors.name.message}</p>}

                <label htmlFor="firstname" className="labelAdmin">Prénom *</label>
                <input type="text" id="firstname" className="inputAdmin"{...register("firstname")} />
                {errors?.firstname && <p className="form-error">{errors.firstname.message}</p>}

                <label htmlFor="email" className="labelAdmin">Email *</label>
                <input type="text" id="email" className="inputAdmin"{...register("email")} />
                {errors?.email && <p className="form-error">{errors.email.message}</p>}

                <label htmlFor="subject" className="labelAdmin">Sujet de votre demande</label>
                <input type="text" id="subject" className="inputAdmin" {...register("subject")} />
                {errors?.subject && <p className="form-error">{errors.subject.message}</p>}

                <label htmlFor="message" className="labelAdmin">Votre message</label>
                <textarea id="message" {...register("message")} />
                {errors?.message && <p className="form-error">{errors.message.message}</p>}
                <button className="btn mt20">Envoyer</button>
                {feedback && <p className='form-error'>{feedback}</p>}
                {feedbackGood && <p className="feedbackGood">{feedbackGood}</p>}

            </form>
        </>
        // </main>
    );
}
