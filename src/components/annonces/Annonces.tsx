import React from "react";

import "../styles/annonces.css";
import {  IonIcon, IonSearchbar } from "@ionic/react";
import Annonce from "./Annonce";
import {  carOutline, cashOutline, searchCircle, timeOutline } from "ionicons/icons";
const Annonces : React.FC = ()=>{
    return (
        <>
                <section className="annonces-nav">
                    <a href="/accueil/annonces#tous">
                            <IonIcon icon={carOutline} ></IonIcon>
                            Tous
                    </a>
                    <a href="/accueil/annonces#attente">
                        <IonIcon icon={timeOutline} ></IonIcon>

                            En Attente
                    </a>
                    <a href="/accueil/annonces#vendus">
                        <IonIcon icon={cashOutline} ></IonIcon>

                            Vendus
                    </a>
                </section>

                <section  className="annonce-recherche" >
                    <IonSearchbar searchIcon={searchCircle}  placeholder="Rechercher" />
                </section>

                <section id="tous">
                    <Annonce />
                    <Annonce />
                    <Annonce />
                </section>
                <section id="attente">

                    <Annonce />
                    <Annonce />
                    <Annonce />
                </section>  
                <section id="vendus">

                    
                    <Annonce />
                    <Annonce />
                    <Annonce />
                </section>                  
        </>
    );
}

export default Annonces;