import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { ApiContext } from "../../../context/ApiContext";
import { useState } from "react";
import style from "./Talk.module.scss";


export default function Talk() {
    const { user } = useContext(AuthContext);
    const BASE_API_URL = useContext(ApiContext);
    const [feedbackGood, setFeedbackGood] = useState("");
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
        console.log(values);
        try {
            const response = await fetch(`${BASE_API_URL}/discussion/sendMessage`, {
                method: "POST",
                body: JSON.stringify({ content: values, idUser: user.idUser }),
                headers: {
                    "Content-Type": "application/json"
                },
            });
            if (response.ok) {
                setFeedbackGood("Message envoyé");
                reset(defaultValues);
                setTimeout(() => {
                    setFeedbackGood("");
                }, 2000);
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
        <form onSubmit={handleSubmit(submit)} className="d-flex align-items-center my30">
            <input {...register("content")} type="textarea" id="content" />
            <button className="btn">Envoyer</button>
            {feedbackGood && <p>{feedbackGood}</p>}
            {feedback && <p>{feedback}</p>}
        </form>
    );
}
