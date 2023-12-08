
import { useContext } from 'react';
import styles from "../Discussion.module.scss";
import { ApiContext } from '../../../context/ApiContext';
export default function Message({ message, modifyMessage, deleteMessage, user, alertMessage }) {
    const BASE_API_URL = useContext(ApiContext);

    return (
        <section key={message.idMessage} className={`d-flex my20 align-center`}>
            {message.avatar !== null ? (
                <img src={`${BASE_API_URL}/../../avatar/${message.avatar}`} alt={message.avatar} />
            ) : (
                <img src={`${BASE_API_URL}/../../avatar/default.svg`} alt="default.svg" />
            )}
            <article>
                <section className="d-flex align-items-center">
                    <p className='mr10 fw600'>{message.username}</p>
                    <p className={`${styles.date} fw200`}>{message.formattedDate}</p>
                    {(user.idUser === message.idUser || user.role === 'admin') && (
                        <>
                            <i className={`fa-solid fa-pen ml20 ${styles.ok}`} onClick={() => modifyMessage({ ...message, edit: !message.edit })}></i>
                            <i className={`fa-solid fa-trash ml20 ${styles.no}`} onClick={() => deleteMessage(message.idMessage)}></i>
                        </>
                    )
                    }
                    {message.report !== 1 && <i className={`fa-solid fa-circle-exclamation ml20 ${styles.no}`} onClick={() => alertMessage(message)}></i>}
                    {(message.report === 1 && user.role === 'admin') && <i className={`fa-solid fa-check-to-slot ml20 ${styles.ok}`} onClick={() => modifyMessage({ ...message, report: 0 })}></i>}

                </section>
                <p className={`${styles.quote}`}>{message.content}</p>

            </article>
        </section>
    );
}