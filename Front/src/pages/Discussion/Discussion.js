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
export default function Discussion() {
    const BASE_API_URL = useContext(ApiContext);
    const [[messages, setMessages], isLoading] = useFetchData(BASE_API_URL, 'discussion/getMessage');
    const { user } = useContext(AuthContext);
    const [feedback, setFeedBack] = useState("");
    function deleteMessageFront(idParam) {
        setMessages(messages.filter((message) => message.idMessage !== idParam));
    }
    async function deleteMessage(messageId) {
        try {
            const response = await fetch(`${BASE_API_URL}/discussion/deleteMessage`, {
                method: "DELETE",
                body: JSON.stringify({ messageId: messageId }),
                headers: { "Content-type": "application/json" }
            });
            if (response.ok) {
                deleteMessageFront(messageId);
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

                        <EditMessage key={message.idMessage} message={message} modifyMessage={modifyMessage} alertMessage={alertMessage} feedback={feedback} user={user} />

                    ) : (

                        !(message.report === 1 && user.role !== 'admin') &&
                        (
                            <Message key={message.idMessage} message={message} modifyMessage={modifyMessage} deleteMessage={deleteMessage} user={user} alertMessage={alertMessage} feedback={feedback} />
                        ))

                ))

            )
            }
            {feedback && <p className={`${styles.feedback}`}>{feedback}</p>}
            <ScrollToTopButton />
            {/* <Talk addMessage={addMessage} /> */}

        </main >
    );
}
