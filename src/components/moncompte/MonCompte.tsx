import React, { useEffect, useRef, useState } from "react";

import "../styles/moncompte.css";
import { IonAvatar, IonButton, IonButtons, IonCard, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonList, IonModal, IonRefresher, IonRefresherContent, IonText, IonTitle, IonToolbar, RefresherEventDetail, useIonAlert, useIonLoading } from "@ionic/react";
import { carOutline, card, cardOutline, cart, create, exit, eyeOutline, keyOutline, locationOutline, mailOutline, phoneLandscape, phonePortrait, phonePortraitOutline, timeOutline } from "ionicons/icons";
import { OverlayEventDetail } from "@ionic/react/dist/types/components/react-component-lib/interfaces";
import Header from "../Header";
import {jwtDecode} from "jwt-decode";
import { UserType } from "../../types/UserType";
import { API_URL } from "../../context/urlContext";
import { UserToken } from "../../types/UserToken";
import { showToast } from "../../hooks/PushNotificationHook";

const MonCompte : React.FC = ()=>{

  let token = localStorage.getItem("token");
  if (token == null) {
    token = ""
    location.href = "/login";
  }
  const user : UserToken = jwtDecode(token);

  const userTemplate : UserType= {
    id: 0,
    nom: null,
    email: null,
    telephone: null,
    date: null,
    genre: null,
    fcm: null,
    etat: 0,
    mdp :  null
  };
  const [userDetail , setUserDetail] = useState(userTemplate);

  useEffect(()=>{
    fetchDetail();

  },[]);
  
  const fetchDetail = ()=>{
    fetch(API_URL+"/utilisateurs/"+user.idutilisateur,{method : "GET"})
    .then(resp => resp.json())
    .then(data =>{
      
      setUserDetail(data.data);
      
      const newDetails = data.data;

      if (newDetails.genre == "Femme") {
        newDetails.genre = 0;
      }else{
        newDetails.genre  = 1;
      }

      setNewdetails(newDetails);
    })
  }

    function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
        setTimeout(() => {
          // Any calls to load data go here
          event.detail.complete();
          fetchDetail()
        }, 2000);
      }

      const modal = useRef<HTMLIonModalElement>(null);
      const input = useRef<HTMLIonInputElement>(null);
      function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
        // if (ev.detail.role === 'confirm') {
        //   console.log("huhu");
          
        // }
    }
      
    const [newDetails,setNewdetails ] = useState(userTemplate);

    const handleChangeNom  = (e : any)=> setNewdetails({...newDetails,nom : e.target.value});
    const handleChangePhone  = (e : any)=> setNewdetails({...newDetails,telephone : e.target.value});
    const handleChangeMail  = (e : any)=> setNewdetails({...newDetails,email : e.target.value});
    const handleChangeMdp  = (e : any)=> setNewdetails({...newDetails,mdp : e.target.value});
    const handleChangeDate  = (e : any)=> setNewdetails({...newDetails,date : e.target.value});
    const [displayAlert] = useIonAlert();

    const [present,dismis] = useIonLoading();
    function confirm() {      
            present({message : "modification en cours"});
      const options = {
        method: 'PUT', 
        headers : {
          'Content-Type': 'application/json',
          "Authorization" : "Bearer "+localStorage.getItem("token")
        },
        body: JSON.stringify(newDetails) 
      }

      
      fetch(API_URL+"/utilisateurs/"+user.idutilisateur,options)
      .then(resp => resp.json())
      .then(data =>{
        console.log(data);
        if(data.code == 200){
          showToast("modificatio effectué");
          fetchDetail();
          
          modal.current?.dismiss(input.current?.value, 'confirm');
        }else{
          showToast("impossible de modifier");
        }
        dismis();
      })
        
      
    }
      const disconnect = () =>
          displayAlert({
              message: 'Voulez vous vous deconnecter ? ',
              buttons: [
                  { text: 'Non', role: 'cancel' },
                  { text: 'Oui', role: 'confirm' }
              ],
              onDidDismiss: (e) => {
                  if (e.detail.role === 'cancel') return;
                  
                window.localStorage.clear();
                window.location.href = "/login";
              }
          });
    return (
        <>
            <IonContent fullscreen className="mon-compte-main">
                <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>

                <section className="moncompte-header">
                    <IonAvatar className="moncompte-avatar header-element" >
                        <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                    </IonAvatar>
                    <IonTitle className="header-element" size={"large"}> {userDetail.nom}</IonTitle>
                    <IonButton fill="clear" id="open-modal" expand="block" >
                        <IonIcon icon={create} />
                        modifier
                    </IonButton>
                </section>

                <IonCard>
                    <IonList >
                        <IonItem >
                            <IonIcon  icon={phonePortraitOutline} /> &nbsp;
                                <IonText>
                                Téléphone : <b>{userDetail.telephone}</b>
                                </IonText>
                        </IonItem>

                        <IonItem >
                            <IonIcon  icon={cardOutline} /> &nbsp;
                                <IonText>
                                Date de naissance : <b>{userDetail.date}</b>
                                </IonText>
                        </IonItem>

                        <IonItem >
                            <IonIcon  icon={locationOutline} /> &nbsp;
                                <IonText>
                                Genre : <b>{userDetail.genre}</b>
                                </IonText>
                        </IonItem>

                        <IonItem >
                            <IonIcon  icon={mailOutline} /> &nbsp;
                                <IonText>
                                Email : <b>{userDetail.email}</b>
                                </IonText>
                        </IonItem>
                        
                        <IonItem >
                            <IonButton color={"danger"} onClick={disconnect} className="ion-padding" >
                                <IonIcon icon={exit} color="light"/> Se deconnecter
                            </IonButton>
                        </IonItem>
                    </IonList>
                </IonCard>
                <IonModal ref={modal} trigger="open-modal" onWillDismiss={(ev) => onWillDismiss(ev)}>
                <Header/>
                <div style={{height :"60px"}} ></div>
    
    
              <IonContent className="ion-padding">
                <IonItem>
                  <IonInput
                    label="Nom"
                    labelPlacement="stacked"
                    ref={input}
                    type="text"
                    placeholder={""+userDetail.nom}
                    onIonInput={handleChangeNom}
                  />
                </IonItem>
    
                <IonItem>
                  <IonInput
                    label="Téléphone"
                    labelPlacement="stacked"
                    ref={input}
                    type="text"
                    placeholder={""+userDetail.telephone}
                    onIonInput={handleChangePhone}
    
                  />
                </IonItem>
    
                <IonItem>
                  <IonInput
                    label="Email"
                    labelPlacement="stacked"
                    ref={input}
                    type="text"
                    placeholder={""+userDetail.email}
                    onIonInput={handleChangeMail}
    
                  />
                </IonItem>
                <IonItem>
                  <IonInput
                    label="Date de naissance"
                    labelPlacement="stacked"
                    ref={input}
                    type="text"
                    placeholder={""+userDetail.date}
                    onIonInput={handleChangeDate}
    
                  />
                </IonItem>
                <IonItem>
                  <IonInput
                    label="Mot de passe"
                    labelPlacement="stacked"
                    ref={input}
                    type="password"
                    placeholder="votre mot de passe"
                    onIonInput={handleChangeMdp}
    
                  />
                </IonItem>
    
    
                <div className="modifier-buttons">
                    <IonButton className="button" fill="clear" onClick={() => modal.current?.dismiss()}>
                        <IonText>Annuler</IonText>
                    </IonButton>
                    <IonButton className="button" color={"warning"} onClick={() => confirm()}>
                        <IonText>Confirmer</IonText>
                    </IonButton>
                </div>
              </IonContent>
            </IonModal>
            </IonContent>
            </>

    );
}

export default MonCompte;