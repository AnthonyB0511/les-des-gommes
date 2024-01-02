import { Title } from "../../components/utils/Title";
import { Line } from "../../components/utils/Line";
import styles from "./Discussion.module.scss";
import Talk from "./Talk/Talk";
import { useFetchData } from "../../Hooks/useFetchData";
import Loading from "../../components/utils/Loading";
import { useContext, useState } from "react";
import ScrollToTopButton from "./component/ScrollToTopButton";
import { ApiContext } from "../../context/ApiContext";
import { AuthContext } from "../../context/AuthContext";
import EditMessage from "./component/EditMessage";
import Message from "./component/Message";
import Modal from "../../components/utils/Modal";
export default function Discussion() {
    // utilisation du context de l'API
    const BASE_API_URL = useContext(ApiContext);
    // chargement des messages
    const [[messages, setMessages], isLoading] = useFetchData(BASE_API_URL, 'discussion/getMessage');
    // chargement de l'utilsateur
    const { user } = useContext(AuthContext);
    // différents useState
    const [feedback, setFeedBack] = useState("");
    const [deleteMessageId, setDeleteMessageId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [reportMessageId, setReportMessageId] = useState(null);
    const [showModalReport, setShowModalReport] = useState(null);
    // *
    // fonction qui supprime le message visuellement

    function deleteMessageFront(idParam) {
        setMessages(messages.filter((message) => message.idMessage !== idParam));
    }
    // fonction qui montre lmodal pour confirmer la suppression
    const handleDelete = (messageId) => {
        setShowModal(true);
        setDeleteMessageId(messageId);
    };
    // fonction qui montre lamodal de confirmation le signalement du message
    const handleReport = (messageId) => {
        setShowModalReport(true);
        setReportMessageId(messageId);
    };
    // fonction qui annule une fois la modale montrée
    const handleCancel = () => {
        setShowModal(false);
    };
    // fonction qui envoie la requête l'API de suppression du message
    async function deleteMessage(messageId) {
        try {
            const response = await fetch(`${BASE_API_URL}/discussion/deleteMessage`, {
                method: "DELETE",
                body: JSON.stringify({ messageId: messageId }),
                headers: { "Content-type": "application/json" }
            });
            if (response.ok) {
                deleteMessageFront(messageId);
                setShowModal(false);
            }

        } catch (error) {
            console.error(error);
        }
    }
    // fonction qui permet de siggnaler le message
    async function alertMessage(message) {
        try {
            const response = await fetch(`${BASE_API_URL}/discussion/alertMessage/${user.email}`, {
                method: "POST",
                body: JSON.stringify(message),
                headers: { "Content-type": "application/json" }
            });
            if (response.ok) {
                const messagesBack = await response.json();
                setFeedBack("Le message a été signalé");
                setTimeout(() => {
                    setMessages(messagesBack);
                    setFeedBack("");
                }, 2000);

            }
        } catch (error) {
            console.error(error);
        }
    }
    // fonction qui mmodifie le message en front
    function updateMessage(newMessage) {
        setMessages(
            messages.map((message) =>
                message.idMessage === newMessage.idMessage
                    ? newMessage : message
            ));
    }
    // modification du message en BDD et si OK fonction front appelée 
    async function modifyMessage(message) {
        try {
            const response = await fetch(`${BASE_API_URL}/discussion/updateMessage`, {
                method: "PATCH",
                body: JSON.stringify(message),
                headers: { "Content-Type": "application/json" }
            });
            if (response.ok) {
                const newMessage = await response.json();
                updateMessage(newMessage);
            }
        } catch (error) {
            console.error(error);
        }
    }
    // ajout le message en front
    const addMessage = (newMessage) => {
        setMessages([newMessage, ...messages]);
    };

    return (
        <section className={`${styles.discussion}`}>
            <Title title="Discussion" />
            <Line /><Talk addMessage={addMessage} />
            {/* chargeme,nt en cours des messages */}
            {isLoading ? (
                <Loading />
            ) : (
                // affiche les messages en fonction de l avaleur EDIT Input visible que si c'est l'utilisateur ou admin

                messages.map((message) => (
                    (message.edit && (user.idUser === message.idUser || user.role === 'admin')) ? (

                        <EditMessage key={message.idMessage} message={message} modifyMessage={modifyMessage} alertMessage={handleReport} feedback={feedback} user={user} deleteConfirm={deleteMessage} />

                    ) : (
                        // si l'utilisateur n'est pas l'admin et que le message n'est pas "REPORT"

                        !(message.report === 1 && user.role !== 'admin') &&
                        (
                            <Message key={message.idMessage} message={message} modifyMessage={modifyMessage} deleteMessage={handleDelete} user={user} alertMessage={handleReport} feedback={feedback} deleteConfirm={deleteMessage} />
                        ))

                ))

            )
            }
            {feedback && <p className={`${styles.feedback}`}>{feedback}</p>}
            {/* si show Modal pour suppresion du message est OK */}
            {showModal && (
                <Modal
                    message={`Souhaitez-vous vraiment supprimer ce message ? Cette action est irréversible.`}
                    onConfirm={() => deleteMessage(deleteMessageId)}
                    onCancel={handleCancel}
                />
            )}
            {/* si show Modal pour signalement du message est OK */}
            {showModalReport && (
                <Modal
                    message={`Souhaitez-vous signaler ce message ?`}
                    onConfirm={() => {
                        alertMessage(reportMessageId);
                        setShowModalReport(false);
                    }}
                    onCancel={() => setShowModalReport(false)}
                />
            )}
            {/* permet de remonter en haut de la page */}

            <ScrollToTopButton />


        </section >
    );
}
