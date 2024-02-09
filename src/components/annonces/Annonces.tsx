import React, { useEffect, useState } from "react";

import "../styles/annonces.css";
import {  IonIcon, IonSearchbar } from "@ionic/react";
import Annonce from "./Annonce";
import {  carOutline, cashOutline, searchCircle, timeOutline } from "ionicons/icons";
import { UserToken } from "../../types/UserToken";
import { jwtDecode } from "jwt-decode";
import { API_URL } from "../../context/urlContext";
import { AnnonceType } from "../../types/AnnonceType";
const Annonces : React.FC = ()=>{

    let token = localStorage.getItem("token");
    if (token == null) {
      token = "";
    }
    const user : UserToken = jwtDecode(token);

    const [annonces,setAnnonces] = useState([]);

    useEffect(()=>{
        fetch(API_URL+"/utilisateurs/"+user.idutilisateur+"/annonces")
        .then(resp => resp.json())
        .then(data => {
            console.log(data);
            
            setAnnonces(data.data);
        })
    },[])
    return (
        <>
                <section  className="annonce-recherche" >
                    <IonSearchbar searchIcon={searchCircle}  placeholder="Rechercher" />
                </section>

                    {annonces.map((annonce : AnnonceType) =>(
                        <Annonce  key={annonce.id} annonce={annonce}/>      

                    ))}
        </>
    );
}

export default Annonces;