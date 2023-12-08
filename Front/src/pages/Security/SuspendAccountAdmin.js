import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useContext } from "react";
import { ApiContext } from "../../context";

export default function DeleteAccountAdmin() {
    const defaultValues = {
        email: "",
    };
    const BASE_API_URL = useContext(ApiContext);
    const [feedback, setFeedback] = useState("");
    const [feedbackGood, setFeedbackGood] = useState("");
    const yupSchema = yup.object({
        email: yup
            .string()
            .required("Le champ est obligatoire")
            .matches(
                /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                "Le format d'email n'est pas le bon"
            ),
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues,
        mode: "onChange",
        resolver: yupResolver(yupSchema),
    });
    async function submit(values) {
        setFeedback("");
        try {
            const response = await fetch(
                `${BASE_API_URL}/adminUsers/suspendAccount`, {
                body: JSON.stringify(values),
                headers: { "Content-Type": "Application/json" },
                method: "PATCH"
            }

            ); console.log(values);
            if (response.ok) {
                setFeedbackGood("L'utilisateur est banni de l'espace discussion");
                console.log("ok");
            } else {
                setFeedback("L'adresse mail n'existe pas sur ce site");
                reset(defaultValues);
                setTimeout(() => {
                    setFeedbackGood("");
                }, 3000);
            }
            ;
        } catch (error) {

            console.error(error);
        }
    }
    return (
        <form onSubmit={handleSubmit(submit)} className="form2">
            <h3 className="text-center">Adresse email</h3>
            <p className="text-center">Quelle est l'email à bannir ?</p>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" {...register("email")} />
            {errors?.email && <p className="form-error">{errors.email.message}</p>}
            <button type="submit" disabled={isSubmitting} className="btn">Envoyer</button>
            {feedback && <p className="form-error">{feedback}</p>}
            {feedbackGood && <p className="feedbackGood">{feedbackGood}</p>}
        </form>
    );
}
