import styles from "./Inscription.module.scss";
import { Button } from "../Button";
import { FormTitle } from "./FormTitle";
import { LineNav } from "./BurgerMenu/LineNav"
import { useState } from "react";


export default function Inscription () {
    const [member,setMember]= useState({
        name:"",
        firstname:"",
        mail:"",
        id:"",
        password:"",
    })
    const [memberList, setMemberList] = useState([]);
    function handleClick(e){
        e.preventDefault();
        const newMemberList=[...memberList, {...member}];
        setMemberList(newMemberList)
    }
    function handleInputName(e) {
        const value= e.target.value;
        setMember({
            ...member,
            name:value
        })
    }
    function handleInputFirstName(e) {
        const value= e.target.value;
        setMember({
            ...member,
            firstname:value
        })
    }
    function handleInputMail(e) {
        const value= e.target.value;
        setMember({
            ...member,
            mail:value
        })
    }
    function handleInputId(e) {
        const value= e.target.value;
        setMember({
            ...member,
            id:value
        })
    }
    function handleInputPassword(e) {
        const value = e.target.value;
        setMember({
            ...member,
            password:value
        })
    }
    function handleInputPassword(e) {
        const value= e.target.value;
        setMember({
            ...member,
            password:value
        })
    }

    return(
        <div className={` m20 ${styles.inscription}`}>
            <FormTitle textTitle="Inscription"/>
            <LineNav />
            <form className={`${styles.form}`}>
                <label htmlFor="nom">Nom</label>
                <input 
                type="text"
                placeholder="Nom"
                id="nom"
                onInput={handleInputName}
                />
                <label htmlFor="prenom">Prénom</label>
                <input 
                type="text"
                placeholder="Prénom"
                id="Prénom"
                onInput={handleInputFirstName}
                />
                <label htmlFor="Mail">Votre adresse mail</label>
                <input 
                type="text"
                placeholder="Votre adresse mail"
                id="Prénom"
                onInput={handleInputMail}
                
                />
                <label htmlFor="id">Identifiant</label>
                <input 
                type="text"
                placeholder="Identifiant"
                id="id"
                onInput={handleInputId}
                />
                <label htmlFor="Password">Mot de Passe</label>
                <input 
                type="text"
                placeholder="Mot de passe"
                id="password"
                onClick={handleInputPassword}
                />
                <label htmlFor="Mot de passe">Confirmer le mot de passe</label>
                <input 
                type="text"
                placeholder="Confirmer le mot de passe"
                id="password"
                onClick={handleInputPassword}
                />
                {/* <Button 
                txtButton="S'inscrire"
                needButton={true}
                onClick={handleClick}/> */}
                <button onClick={handleClick}>s'inscrire</button>
            </form>
            <Button 
            needButton={true}
            txtButton="S'inscrire"/>
            <ul style={{width:"100%"}}>
                {memberList &&
                memberList.map((m, i)=>(
                    <li key={i}>{m.name} {m.firstname} a pour adresse mail {m.mail} et pour mdp{m.password}</li>
                ))}
            </ul>
        </div>
    )
}