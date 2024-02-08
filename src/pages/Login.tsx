import React, { useEffect, useState } from 'react';
import './styles/login.css';
import { IonButton, IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonContent, IonInput, IonItem, IonList, IonLoading, IonPage, IonTitle } from '@ionic/react';
import { Notifier } from '../components/Notifier';
import { SigninObject } from '../types/SigninObject';
import { API_URL } from '../context/urlContext';

import { Toast } from "@capacitor/toast";
import {  register, showToast } from '../hooks/PushNotificationHook';
import { PushNotifications, Token } from '@capacitor/push-notifications';

const Login: React.FC = () => {
  // function redirect() : void {
  //   const notification : Notifier=  new Notifier();

  //   notification.scheduleNotification();
  //   window.setTimeout(()=>{
  //     window.location.href = "/accueil";
  //   },1100)
  // }

  
  const userTemplate : SigninObject = {
    nom : null,
    mdp : null,
    email : null
  };
  const [userInput , setUserInput] = useState(userTemplate);

  const handleChangeMail = (e : any)=> setUserInput({...userInput,email : e.target.value});  
  const handleChangeMdp = (e : any)=> setUserInput({...userInput,mdp : e.target.value});  

  const login = ()=>{
    const options = {
      method: 'POST', 
      headers : {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInput) 
    };
    fetch(API_URL+"/utilisateurs/login",options)
    .then(resp => resp.json())
    .then(data =>{
      console.log(data);
      const token = data.token;

      window.localStorage.setItem("token",token);

      window.location.href = "/";
    })
  }

  const t : Token = {
    value :""
  }
const [fcmToken,setFcmToken] = useState(t);

const getFcmToken = ()=>{

  register();

  PushNotifications.addListener('registration',
  (token: Token) => {
    showToast("oay")
    setFcmToken(token);
  }
);
}
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className='sign-main'>
            <IonCard className='ion-padding'>
              <IonCardTitle className='header ion-padding'>
                <img src="assets/images/logos/logo_simple.png" alt="" />
                <IonTitle className='ion-padding'>
                  Se connecter
                </IonTitle>
              </IonCardTitle>

              <IonCardContent>
                <IonList>
                  <IonItem>
                    <IonInput labelPlacement="floating"  onIonInput={handleChangeMail}> 
                      <div slot="label">
                        Mail
                      </div>
                    </IonInput>
                  </IonItem>
                  <IonItem>
                    <IonInput labelPlacement="floating" onIonInput={handleChangeMdp}>
                      <div slot="label">
                        Mot de passe  
                      </div>
                    </IonInput>
                  </IonItem>

                  <div className='sign-input-container'>
                      <IonButton color={'warning'} onClick={login}>
                        Se connecter
                      </IonButton>
                  </div>

                <IonItem>
                    <IonInput labelPlacement="floating" value={fcmToken.value}>
                      <div slot="label">
                        FCM TOKEN 
                      </div>
                    </IonInput>
                </IonItem>
                </IonList>
              </IonCardContent>
              <IonCardSubtitle  className='sign-footer'>
              <a href="/signin" className='signin-link'>Je veux créer un <span>compte.</span></a>

              <IonButton color="success" expand="full" onClick={getFcmToken}>Register for Push</IonButton>
              
              </IonCardSubtitle>
            </IonCard>
        </div>
      </IonContent>

    </IonPage>
  );
};

export default Login;
