import styles from "./Line.module.scss";
/**
 * 
 * @param {Boolean} reverse
 * @returns 
 */
export function Line({ reverse }) {
    return (
        <div>
            {reverse ? (
                <div className={`${styles.lineReverse}`}></div>
            ) : (
                <div className={`${styles.line}`}></div>
            )}
        </div>

    );
}