import { Title } from "../../components/utils/Title";
import { Line } from "../../components/utils/Line";
import styles from "./Discussion.module.scss";
import Talk from "./Talk/Talk";
import { useFetchData } from "../../Hooks/useFetchData";
import Loading from "../../components/utils/Loading";
import { useContext, useEffect } from "react";
import { ApiContext } from "../../context/ApiContext";
import { AuthContext } from "../../context/AuthContext";
export default function Discussion() {
    const BASE_API_URL = useContext(ApiContext);
    const [[messages, setMessages], isLoading] = useFetchData(BASE_API_URL, 'discussion/getMessage');
    const { user } = useContext(AuthContext);
    console.log(messages);
    return (
        <main className={`${styles.discussion}`}>
            <Title title="Discussion" />
            <Line />
            {isLoading ? (
                <Loading />
            ) : (
                messages.map((message) => (
                    <section key={message.idMessage} className="d-flex my20 align-center">
                        <img src={`${BASE_API_URL}/../avatar/${message.avatar}`} />
                        <article>
                            <section className="d-flex">
                                <p className='mr10 fw600'>{message.username}</p>
                                <p className="fw200">{message.formattedDate}</p>
                                {(user.idUser === message.idUser || user.role === 'admin') && (
                                    <>
                                        <i className="fa-solid fa-pen mx20"></i>
                                        <i className="fa-solid fa-trash"></i>
                                    </>
                                )

                                }
                            </section>
                            <p className={`${styles.quote}`}>{message.content}</p>
                        </article>
                    </section>
                ))
            )}
            <Talk />





        </main>
    );
}
