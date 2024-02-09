import React, { useEffect, useState } from "react";

import "../styles/annonces.css";
import {  IonContent, IonIcon, IonRefresher, IonRefresherContent, IonSearchbar, RefresherEventDetail } from "@ionic/react";
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
        fetchData();
    },[]);

    const fetchData = ()=>{
        fetch(API_URL+"/utilisateurs/"+user.idutilisateur+"/annonces")
        .then(resp => resp.json())
        .then(data => {
            console.log(data);
            
            setAnnonces(data.data);
        })
    }
    function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
        setTimeout(() => {
          // Any calls to load data go here
          event.detail.complete();
          fetchData();
        }, 2000);
      }
    return (
        <IonContent>
                <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>

                    {annonces.map((annonce : AnnonceType) =>(
                        <Annonce  key={annonce.id} annonce={annonce}/>      

                    ))}
        </IonContent>
    );
}

export default Annonces;