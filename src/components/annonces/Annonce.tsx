import React, { useEffect, useState } from "react";

import "../styles/annonce.css"
import { IonBadge, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonContent, IonIcon, IonImg, IonItem, IonLabel, IonList, IonText, IonicSlides } from "@ionic/react";
import {  addCircleSharp, carOutline, carSharp,  cashOutline,  checkmark,  compass,  createOutline, earthOutline, gameController, personOutline, planet, planetOutline, speedometer, timeOutline } from "ionicons/icons";
import { AnnonceType } from "../../types/AnnonceType";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import '@ionic/react/css/ionic-swiper.css';

import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/keyboard';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/zoom';
import '@ionic/react/css/ionic-swiper.css';

const Annonce : React.FC<{ annonce: AnnonceType }> = ({annonce})=>{

    function modifier() {
        alert("modifier");
    }
    function details() {
        alert("details");
    }

    let status = null;
    if(annonce.etat == 10){
        status = {
            color : "success",
            label : "publié"
        }
    }else if (annonce.etat == 20){
        status = {
            color : "light",
            label : "vendu"
        }
    }

    const [detailled , setDetailled] = useState(false);
    const [detailHeight,setDetailHeght]  = useState({});

    const defaultHeight = "0px"
    const detailledHeight = "fit-content"

    const toggleDetail = () => setDetailled(!detailled);

    useEffect(()=>{
        if (detailled == true) {
            setDetailHeght(detailledHeight);
        }else{
            setDetailHeght(defaultHeight);
        }
    },[detailled]);
    
    return (
        <IonCard className="annonce-card">
            
            <IonCardHeader className="annonce-card-header">
            <IonIcon icon={carSharp} />
                <IonCardSubtitle  > {annonce.modele.marque.nom} {annonce.modele.nom}</IonCardSubtitle>
                <IonBadge onClick={e =>{alert("photo")}} color={"warning"}> 
                    photos
                </IonBadge>
            </IonCardHeader>

            <div>
                <Swiper >
                    {annonce.photoAnnonces.map(photo =>(
                        <SwiperSlide key={photo.id} style={{padding : "2%"}}>
                            <div style={{borderRadius : "15px",overflow : "hidden"}}>
                                <IonImg src={photo.path}  />
                            </div>
                        </SwiperSlide>
                    ))}
                    
                </Swiper>
            </div>
            
            <IonCardContent >   
                <IonText  >
                    Date d&apos;annonce : <IonCardSubtitle>{annonce.dateAnnonce}</IonCardSubtitle>
                </IonText>

                <IonText >  
                    Status : <br/><IonBadge color={status?.color} >{status?.label}</IonBadge>
                </IonText>
                <br/>
                <IonText>
                    <IonButton fill="clear" color={"primary"} onClick={toggleDetail}>
                        Details
                    </IonButton> 
                </IonText>
                <IonList style={{transition : "800ms",overflow : "hidden",height : detailHeight}}>
                    <IonItem >
                            <IonIcon  icon={personOutline} /> 
                                <IonText>
                                par : <b>{annonce.utilisateur.nom}</b>
                                </IonText>
                        </IonItem>
                        <IonItem >
                            <IonIcon  icon={earthOutline} /> 
                                <IonText>
                                Energie : <b>{annonce.energie.nom}</b>
                                </IonText>
                        </IonItem>
                        <IonItem >
                            <IonIcon  icon={speedometer} /> 

                                <IonText>
                                Vitesse : <b>{annonce.vitesse.nom}</b>
                                </IonText>
                        </IonItem>

                        <IonItem>
                        <IonIcon  icon={carOutline} /> 

                            <IonText >
                                Moteur : <b>{annonce.moteur.nom}</b>
                            </IonText>
                        </IonItem>
                        <IonItem>
                        <IonIcon  icon={cashOutline} /> 

                            <IonText >
                                Prix : <b>{annonce.prix}</b>
                            </IonText>
                        </IonItem>
                        <IonItem>

                            <IonText >
                                <IonLabel>Description</IonLabel> 
                                <br/>
                                {annonce.description}
                            </IonText>
                        </IonItem>
                    
                    
                </IonList>
            
                <IonText style={{margin : "2%",display:"flex"}}>
                    <IonButton color={"warning"} style={{opacity : "0",width:"50%"}} size="small" >
                                
                    </IonButton>

                    <IonButton color={"warning"} style={{float : "right",width:"50%"}} size="small" onClick={modifier}>
                                <IonIcon icon={checkmark} />
                    </IonButton>

                </IonText>
                
            </IonCardContent>
            
        </IonCard>
    )
}

export default Annonce;