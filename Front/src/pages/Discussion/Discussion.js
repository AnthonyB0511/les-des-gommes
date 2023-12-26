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
    const BASE_API_URL = useContext(ApiContext);
    const [[messages, setMessages], isLoading] = useFetchData(BASE_API_URL, 'discussion/getMessage');
    const { user } = useContext(AuthContext);
    const [feedback, setFeedBack] = useState("");
    const [deleteMessageId, setDeleteMessageId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [reportMessageId, setReportMessageId] = useState(null);
    const [showModalReport, setShowModalReport] = useState(null);
    function deleteMessageFront(idParam) {
        setMessages(messages.filter((message) => message.idMessage !== idParam));
    }
    const handleDelete = (messageId) => {
        setShowModal(true);
        setDeleteMessageId(messageId);
    };
    const handleReport = (messageId) => {
        setShowModalReport(true);
        setReportMessageId(messageId);
    };
    const handleCancel = () => {
        setShowModal(false);
    };
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

    function updateMessage(newMessage) {
        setMessages(
            messages.map((message) =>
                message.idMessage === newMessage.idMessage
                    ? newMessage : message
            ));
    }
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
    const addMessage = (newMessage) => {
        setMessages([newMessage, ...messages]);
    };

    return (
        <main className={`${styles.discussion}`}>
            <Title title="Discussion" />
            <Line /><Talk addMessage={addMessage} />
            {isLoading ? (
                <Loading />
            ) : (

                messages.map((message) => (
                    (message.edit && (user.idUser === message.idUser || user.role === 'admin')) ? (

                        <EditMessage key={message.idMessage} message={message} modifyMessage={modifyMessage} alertMessage={handleReport} feedback={feedback} user={user} deleteConfirm={deleteMessage} />

                    ) : (

                        !(message.report === 1 && user.role !== 'admin') &&
                        (
                            <Message key={message.idMessage} message={message} modifyMessage={modifyMessage} deleteMessage={handleDelete} user={user} alertMessage={handleReport} feedback={feedback} deleteConfirm={deleteMessage} />
                        ))

                ))

            )
            }
            {feedback && <p className={`${styles.feedback}`}>{feedback}</p>}
            {showModal && (
                <Modal
                    message={`Souhaitez-vous vraiment supprimer ce message ? Cette action est irréversible.`}
                    onConfirm={() => deleteMessage(deleteMessageId)}
                    onCancel={handleCancel}
                />
            )}
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

            <ScrollToTopButton />


        </main >
    );
}
