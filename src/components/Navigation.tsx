import React, { useState } from "react";

import "./styles/navigation.css"
import { IonAlert, IonButton, IonButtons, IonCard, IonContent, IonHeader, IonIcon, IonModal, IonTitle, IonToolbar } from "@ionic/react";
import {homeOutline,personOutline,megaphoneOutline, add, statsChart, cellular, contract, idCardOutline, carSportSharp, chevronCollapseSharp, chevronBackCircle, chevronBack} from "ionicons/icons"
import Ajout from "./annonces/Ajout";
const Navigation : React.FC = ()=>{

    const [isOpen, setIsOpen] = useState(false);
    
    return (
        <>
         <IonModal isOpen={isOpen} className="ajout-modal">
          <IonHeader>
            <IonToolbar>

              <IonButtons slot="start">
                <IonButton onClick={() => setIsOpen(false)}>
                    <IonIcon icon={chevronBack} ></IonIcon>
                    <p>retour</p>
                </IonButton>
              </IonButtons>

              <IonButtons slot="end">
                <IonTitle>
                        <img src='/assets/images/logo.png' className='app-logo'/>
                    </IonTitle>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding" >
            <Ajout />
          </IonContent>
        </IonModal>
        <nav className="nav">
            <div className="buttons" style={{overflow : "visible",position : "relative"}} >
                <IonButton fill="clear" id="mes-annonces" href="/accueil/annonces">
                    <IonIcon icon={megaphoneOutline} size="large"/>
                </IonButton>
                <IonButton fill="clear" id="home" href="/accueil/home">
                    <IonIcon icon={statsChart} size="large" />
                </IonButton>

                <IonButton fill="clear" id="mon-compte" className="add-button"  expand="block" onClick={() => setIsOpen(true)}>
                    <IonIcon icon={add}  size="large"/>
                </IonButton>

                <IonButton fill="clear" id="mon-compte" href="/accueil/moncompte">
                    <IonIcon icon={idCardOutline}  size="large"/>
                </IonButton>
                <IonButton fill="clear" id="mon-compte" href="/accueil/moncompte">
                    <IonIcon icon={personOutline}  size="large"/>
                </IonButton>
            </div>
        </nav>
        </>
    )
}


export default Navigation;