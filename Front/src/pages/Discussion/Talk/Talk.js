import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthContext } from "../../../context/AuthContext";
import { ApiContext } from "../../../context/ApiContext";
import { useState, useContext } from "react";
import style from "./Talk.module.scss";


export default function Talk({ addMessage }) {
    const { user } = useContext(AuthContext);
    const BASE_API_URL = useContext(ApiContext);
    const [feedback, setFeedback] = useState("");
    const yupSchema = yup.object({
        content: yup.string().required("Le champ doit être rempli.")
    });
    const defaultValues = {
        content: ""
    };
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        defaultValues,
        resolver: yupResolver(yupSchema)
    });
    async function submit(values) {

        try {
            const response = await fetch(`${BASE_API_URL}/discussion/sendMessage`, {
                method: "POST",
                body: JSON.stringify({ content: values, idUser: user.idUser }),
                headers: {
                    "Content-Type": "application/json"
                },
            });
            if (response.ok) {
                const newMessage = await response.json();
                addMessage(newMessage);
                reset(defaultValues);
            }
            else {
                setFeedback("Une erreur est survenue");
                reset(defaultValues);
            }
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit(submit)} className={`d-flex align-items-center my30 ${style.formMessage}`}>
                <input {...register("content")} type="textarea" id="content" title="Renseigner le contenu de votre message" />
                <button className="btn" title="Envoyer votre message">Envoyer</button>
                {errors?.content && <p className="form-error">{errors.content.message}</p>}
            </form>
            <section className={`d-flex align-items-center my30 ${style.feed}`}>
                {feedback && <p className="feedback">{feedback}</p>}
            </section>
        </>
    );
}
