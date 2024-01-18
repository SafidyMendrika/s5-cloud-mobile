import React from "react";

import "../styles/annonce.css"
import { IonBadge, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonIcon, IonItem, IonList, IonText } from "@ionic/react";
import {  addCircleSharp, carOutline, carSharp,  createOutline, timeOutline } from "ionicons/icons";

const Annonce : React.FC = ()=>{

    function modifier() {
        alert("modifier");
    }
    function details() {
        alert("details");
    }


    return (
        <IonCard className="annonce-card">
            
            <IonCardHeader className="annonce-card-header">
            <IonIcon icon={carSharp} />
                <IonCardSubtitle  >  Toyota</IonCardSubtitle>
                <IonBadge onClick={e =>{alert("photo")}} color={"warning"}> 
                    photos
                </IonBadge>
            </IonCardHeader>
            
            <IonCardContent >   
                <IonText  >
                    Date d&apos;annonce : <IonCardSubtitle>03 Janvier 2024</IonCardSubtitle>
                </IonText>

                <IonText >
                    Status : <br/><IonBadge color={"success"} >publié</IonBadge>
                </IonText>
                <br/><br/>
                <IonText>
                    Details : 
                </IonText>

                <IonList >
                    <IonItem >
                        <IonIcon  icon={timeOutline} /> 
                            <IonText>
                             Année : <b>2004</b>
                            </IonText>
                    </IonItem>

                    <IonItem>
                    <IonIcon  icon={carOutline} /> 

                        <IonText >
                            Kilométrage : <b>24.XXX Km</b>
                        </IonText>
                    </IonItem>
                </IonList>
            
                <IonText style={{margin : "2%",display:"flex"}}>
                    <IonButton color={"warning"} style={{float : "right",width:"50%"}} size="small" onClick={modifier}>
                                <IonIcon icon={createOutline} />
                    </IonButton>
                    <IonButton color={"light"} style={{float : "right",width:"50%"}} size="small" onClick={details}>
                                <IonIcon icon={addCircleSharp} />
                    </IonButton>
                </IonText>
                
            </IonCardContent>
            
        </IonCard>
    )
}

export default Annonce;