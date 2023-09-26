import styles from "./Line.module.scss";
export function Line ({reverse}){
    return(
        <div>
           {reverse ? (
            <div className={`${styles.lineReverse}`}></div>
           ) : (
            <div className={`${styles.line}`}></div>
           )} 
        </div>
        
    )
}