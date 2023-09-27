import styles from "./Button.module.scss";
export function Button({ txtButton, needButton, props }) {
    return (
        <div>
            {needButton ? (
                <button
                    className={`${styles.button}`}
                    onClick={props}>{txtButton}</button>
            ) : (
                null
            )}
        </div>
    )
}


