import styles from "./Footer.module.scss"
export default function Footer(){
    return (
        <footer className={`${styles.footer}`}>
            <div className={`d-flex justify-content-center align-items-center flex-column`}>
                <p>© 2023 Les Dés Gommés - <span className={`${styles.rights}`}>Tous droits réservés</span></p>
            </div>
            <div className={`d-flex align-items-center justify-content-center`}>
               <i class="fa-solid fa-envelope"></i>
                <a href="mailto:lesdesgommes@gmail.com"> lesdesgommes@gmail.com</a>
                <p> | </p> 
                <a href=""><i class="fa-brands fa-facebook"></i></a> 
            </div>              
            <div className={`${styles.mention} d-flex justify-content-center align-items-center`}>
                <a href="">Mentions légales</a>
                <p className="space"> | </p>
                <a href="">Politiques de confidentialités</a>
                <p className="space"> | </p>
                <a href="">Conditions d'utilisations</a>
            </div>
        </footer>
    )
}