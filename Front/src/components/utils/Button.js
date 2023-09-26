import styles from "./Button.module.scss";
export function Button({txtButton, needButton}){
     return(
         <div>
        {needButton ? (
        <button className={`${styles.button}`}>{txtButton}</button>
        ) : (
            null
        )} 
        </div>
        )
}
    
    
