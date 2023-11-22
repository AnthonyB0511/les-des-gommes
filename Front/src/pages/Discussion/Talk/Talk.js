import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { ApiContext } from "../../../context/ApiContext";

export default function Talk() {
    const { user } = useContext(AuthContext);
    const BASE_API_URL = useContext(ApiContext);
    const yupSchema = yup.object({
        message: yup.string().required("Le champ doit être rempli.")
    });
    const defaultValues = {
        message: ""
    };
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues,
        resolver: yupResolver(yupSchema)
    });
    async function submit(values) {
        console.log(values);
        try {
            const response = await fetch(`${BASE_API_URL}/discussion/sendMessage`, {
                method: "POST",
                body: JSON.stringify({ values: values, idUser: user.idUser })
            });
            if (response.ok) {
                console.log("Message envoyé");
            }
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <form onSubmit={handleSubmit(submit)}>
            <input {...register("message")} type="textarea" id="textarea" />
            <button className="btn">Envoyer</button>
        </form>
    );
}
