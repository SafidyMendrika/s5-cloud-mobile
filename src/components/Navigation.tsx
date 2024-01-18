import React from "react";

import "./styles/navigation.css"
import { IonAlert, IonButton, IonCard, IonIcon } from "@ionic/react";
import {homeOutline,personOutline,megaphoneOutline} from "ionicons/icons"
const Navigation : React.FC = ()=>{
    return (
        <>
        <nav className="nav">
            <IonCard className="buttons" >
                <IonButton fill="clear" id="mes-annonces" href="/accueil/annonces">
                    <IonIcon icon={megaphoneOutline} size="large"/>
                </IonButton>
                <IonButton fill="clear" id="home" href="/accueil/home">
                    <IonIcon icon={homeOutline} size="large" />
                </IonButton>
                <IonButton fill="clear" id="mon-compte" href="/accueil/moncompte">
                    <IonIcon icon={personOutline}  size="large"/>
                </IonButton>
            </IonCard>
        </nav>
        </>
    )
}

export default Navigation;