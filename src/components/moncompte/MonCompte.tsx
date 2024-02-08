import React, { useRef, useState } from "react";

import "../styles/moncompte.css";
import { IonAvatar, IonButton, IonButtons, IonCard, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonList, IonModal, IonRefresher, IonRefresherContent, IonText, IonTitle, IonToolbar, RefresherEventDetail, useIonAlert } from "@ionic/react";
import { carOutline, card, cardOutline, cart, create, exit, eyeOutline, keyOutline, locationOutline, mailOutline, phoneLandscape, phonePortrait, phonePortraitOutline, timeOutline } from "ionicons/icons";
import { OverlayEventDetail } from "@ionic/react/dist/types/components/react-component-lib/interfaces";
import Header from "../Header";

const MonCompte : React.FC = ()=>{

  console.log(window.localStorage.getItem("token"));
  
    function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
        setTimeout(() => {
          // Any calls to load data go here
          event.detail.complete();
        }, 2000);
      }

      const [password,setPassword] = useState("******"); 

      function askPassword(){
        if (password == "******") {
            const password = prompt("entrer votre mot de passe");
        
            if (password == "azerty") {
                setPassword(password)
            }else{
                alert("erreur du mot de passe");
            }
        }else{
            setPassword("******");
        }
        
      }

      const [displayAlert] = useIonAlert();

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
                    <IonTitle className="header-element" size={"large"}> Safidy Mendrika</IonTitle>
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
                                Téléphone : <b>+261 34 79 461 99</b>
                                </IonText>
                        </IonItem>

                        <IonItem >
                            <IonIcon  icon={cardOutline} /> &nbsp;
                                <IonText>
                                Cin : <b>10102554312</b>
                                </IonText>
                        </IonItem>

                        <IonItem >
                            <IonIcon  icon={locationOutline} /> &nbsp;
                                <IonText>
                                Adresse : <b>Andoharanofotsy</b>
                                </IonText>
                        </IonItem>

                        <IonItem >
                            <IonIcon  icon={mailOutline} /> &nbsp;
                                <IonText>
                                Email : <b>mendrika@gmail.com</b>
                                </IonText>
                        </IonItem>
                        <IonItem >
                            <IonIcon  icon={keyOutline} /> &nbsp;
                                <IonText>
                                Mot de passe : <b>{password}</b>
                                </IonText>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                            <IonButton fill="clear" onClick={askPassword}>
                                <IonIcon icon={eyeOutline} />
                            </IonButton>
                        </IonItem>
                        <IonItem >
                            <IonButton color={"danger"} onClick={disconnect} className="ion-padding" >
                                <IonIcon icon={exit} color="light"/> Se deconnecter
                            </IonButton>
                        </IonItem>
                    </IonList>
                </IonCard>
            </IonContent>
            {genererModal(password)}
            </>

    );
}
function genererModal(motDePasse : string){
    const modal = useRef<HTMLIonModalElement>(null);
    const input = useRef<HTMLIonInputElement>(null);


    function confirm() {
        modal.current?.dismiss(input.current?.value, 'confirm');
    }

    function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
        if (ev.detail.role === 'confirm') {
            alert("modifié avec succès")
        }
    }
    return (
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
                placeholder="Safidy"
              />
            </IonItem>
            <IonItem>
              <IonInput
                label="Prenom"
                labelPlacement="stacked"
                ref={input}
                type="text"
                placeholder="Mendrika"
              />
            </IonItem>
            <IonItem>
              <IonInput
                label="Téléphone"
                labelPlacement="stacked"
                ref={input}
                type="text"
                placeholder="+261 34 79 461 99"
              />
            </IonItem>
            <IonItem>
              <IonInput
                label="Adresse"
                labelPlacement="stacked"
                ref={input}
                type="text"
                placeholder="Andoharanofotsy"
              />
            </IonItem>
            <IonItem>
              <IonInput
                label="Email"
                labelPlacement="stacked"
                ref={input}
                type="text"
                placeholder="mendrika@gmail.com"
              />
            </IonItem>
            <IonItem>
              <IonInput
                label="Mot de passe"
                labelPlacement="stacked"
                ref={input}
                type="text"
                placeholder={motDePasse}
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
    )
}
export default MonCompte;