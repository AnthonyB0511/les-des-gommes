import { useState, useContext } from 'react';
import { ApiContext } from '../../../context/ApiContext';
import styles from "../Discussion.module.scss";;

export default function EditMessage({ message, modifyMessage, alertMessage, user }) {
    const BASE_API_URL = useContext(ApiContext);
    const [contentInput, setContentInput] = useState(message.content);
    function handleChange(e) {
        const value = e.target.value;
        setContentInput(value);
    }
    const handleClick = () => {
        if (contentInput.length) {
            modifyMessage({ ...message, content: contentInput, edit: false });;
        }
    };
    const handleKeyDown = (e) => {

        if (e.code === "Enter" && contentInput.length) {
            modifyMessage({ ...message, content: contentInput, edit: false });
        }
    };
    return (
        <>
            <section className='my20'>
                <section className="d-flex align-center">
                    {message.avatar !== null ? (
                        <img src={`${BASE_API_URL}/../../avatar/${message.avatar}`} alt={message.avatar} />
                    ) : (
                        <img src={`${BASE_API_URL}/../../avatar/default.svg`} alt="default.svg" />
                    )}
                    <article>
                        <section className="d-flex align-items-center">
                            <p className='mr10 fw600'>{message.username}</p>
                            <p className={`${styles.date} fw200`}>{message.formattedDate}</p>
                            <i className={`fa-solid fa-square-check mx20 ${styles.ok}`} onClick={handleClick} title="Valider votre modification"></i>
                            <i className={`fa-solid fa-rectangle-xmark mr20 ${styles.no}`} onClick={() => modifyMessage({ ...message, edit: false })} title="Annuler votre modification"></i>
                            {message.report !== 1 && <i className={`fa-solid fa-circle-exclamation ${styles.no}`} onClick={() => alertMessage(message)} title="Signaler ce message"></i>}
                            {(message.report === 1 && user.role === 'admin') && <i className={`fa-solid fa-check-to-slot ${styles.ok}`} onClick={() => modifyMessage({ ...message, report: 0 })} title="Revalider ce message"></i>}

                        </section>
                        <input
                            type='textarea'
                            rows="5" cols="33"
                            className={`${styles.modify}`}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            value={contentInput} />
                    </article>

                </section>
            </section>

        </>
    );
}
