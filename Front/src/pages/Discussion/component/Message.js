
import { useContext } from 'react';
import styles from "../Discussion.module.scss";
import { ApiContext } from '../../../context/ApiContext';
export default function Message({ message, modifyMessage, deleteMessage, user }) {
    const BASE_API_URL = useContext(ApiContext);

    return (
        <section key={message.idMessage} className="d-flex my20 align-center">
            <img src={`${BASE_API_URL}/../avatar/${message.avatar}`} alt={message.avatar} />
            <article>
                <section className="d-flex">
                    <p className='mr10 fw600'>{message.username}</p>
                    <p className="fw200">{message.formattedDate}</p>
                    {(user.idUser === message.idUser || user.role === 'admin') && (
                        <>
                            <i className={`fa-solid fa-pen mx20 ${styles.ok}`} onClick={() => modifyMessage({ ...message, edit: !message.edit })}></i>
                            <i className={`fa-solid fa-trash ${styles.no}`} onClick={() => deleteMessage(message.idMessage)}></i>
                        </>
                    )

                    }
                </section>
                <p className={`${styles.quote}`}>{message.content}</p>
            </article>
        </section>
    );
}