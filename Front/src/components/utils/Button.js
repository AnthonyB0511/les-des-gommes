import styles from "./Button.module.scss";
/**
 * 
 * @param {String} txtButton 
 * @param {Boolean} needButton
 * @param {function} props
 * @returns 
 */
export function Button({ txtButton, needButton, props }) {
    return (
        <article>
            {needButton ? (
                <button
                    className={`${styles.button}`}
                    onClick={props}>{txtButton}</button>
            ) : (
                null
            )}
        </article>
    );
}


