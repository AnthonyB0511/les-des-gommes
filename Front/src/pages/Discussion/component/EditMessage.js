import { useState, useContext } from 'react';
import { ApiContext } from '../../../context/ApiContext';
import styles from "../Discussion.module.scss";;

export default function EditMessage({ message, modifyMessage }) {
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
        // console.log(e);
        if (e.code === "Enter" && contentInput.length) {
            modifyMessage({ ...message, content: contentInput, edit: false });
        }
    };
    return (
        <section className="d-flex my20 align-center">
            <img src={`${BASE_API_URL}/../avatar/${message.avatar}`} alt={message.avatar} />
            <article>
                <section className="d-flex align-items-center">
                    <p className='mr10 fw600'>{message.username}</p>
                    <p className="fw200">{message.formattedDate}</p>
                    <i className={`fa-solid fa-square-check mx20 ${styles.ok}`} onClick={handleClick}></i>
                    <i className={`fa-solid fa-rectangle-xmark ${styles.no}`} onClick={() => modifyMessage({ ...message, edit: false })}></i>


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
    );
}
