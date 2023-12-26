import styles from "./Modal.module.scss";
export default function Modal({ message, onConfirm, onCancel }) {
    return (

        <section className={`${styles.modal}`}>
            <article className="my20">
                <p>
                    {message}
                </p>
                <div className="d-flex my20">
                    <button
                        className="btn"
                        onClick={onConfirm}
                        title='Cliquez pour confirmer votre choix'>
                        Confirmer
                    </button>
                    <button
                        className="btn"
                        onClick={onCancel}
                        title='Cliquez pour annuler'>
                        Annuler
                    </button>
                </div>
            </article>
        </section>
    );
}