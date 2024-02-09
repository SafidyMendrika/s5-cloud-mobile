import React, {  useEffect, useState } from 'react';
import './styles/login.css';
import { IonButton, IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonContent, IonInput, IonItem, IonList, IonLoading, IonPage, IonTitle, useIonLoading } from '@ionic/react';
import { SigninObject } from '../types/SigninObject';
import { API_URL } from '../context/urlContext';

import {   showToast } from '../hooks/PushNotificationHook';
import { PushNotifications, Token } from '@capacitor/push-notifications';
import axios from 'axios';
import { Notifier } from '../components/Notifier';

const Login: React.FC = () => {
  const not = new Notifier();

  not.scheduleNotification();
  // function redirect() : void {
  //   const notification : Notifier=  new Notifier();

  //   notification.scheduleNotification();
  //   window.setTimeout(()=>{
  //     window.location.href = "/accueil";
  //   },1100)
  // }
  
  const userTemplate : SigninObject = {
    nom : null,
    mdp : "mendrika",
    email : "mendrika@email.com",
    fcm : null,
    date : null
  };
  const [userInput , setUserInput] = useState(userTemplate);

  useEffect(()=>{

    // Register with Apple / Google to receive push via APNS/FCM
    PushNotifications.register();
    
    // On success, we should be able to receive notifications
    PushNotifications.addListener('registration',
    (token: Token) => {
      // showToast('Push registration success');
      setUserInput({...userInput , fcm : token.value});
    }
    );
    
  },[])


  const handleChangeMail = (e : any)=> setUserInput({...userInput,email : e.target.value});  
  const handleChangeMdp = (e : any)=> setUserInput({...userInput,mdp : e.target.value});  

  const [present, dismiss] = useIonLoading();
  const login = ()=>{
    present({
      message : "connexion en cours"
    })

    axios.post(API_URL+"/utilisateurs/login",userInput,{
      headers : {
        "Content-Type" : "application/json"
      }
    }).then(resp =>{
      const data = resp.data;

      console.log(data);

      if (data.code == 200) {
        const token = data.data.token;
        
        localStorage.setItem("token",token);
                  
        console.log("zey");
        
        window.location.href = "/";
      }else{
        showToast(data.message);
      }
      dismiss()
      
    }).catch(error => {
      console.log(JSON.stringify(error));
      
    })
    
  
  }

//   const t : Token = {
//     value :""
//   }
// const [fcmToken,setFcmToken] = useState(t);

// const getFcmToken = ()=>{

//   register();

//   PushNotifications.addListener('registration',
//   (token: Token) => {
//     showToast("oay")
//     setFcmToken(token);
//   }
// );
// }
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
              <IonInput labelPlacement="floating"  value={userInput.fcm}> 
                      
                </IonInput>
                <IonList>
                  <IonItem>
                    <IonInput labelPlacement="floating" value={userInput.email}  onIonInput={handleChangeMail}> 
                      <div slot="label">
                        Mail
                      </div>
                    </IonInput>
                  </IonItem>
                  <IonItem>
                    <IonInput labelPlacement="floating" value={userInput.mdp} type='password' onIonInput={handleChangeMdp}>
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

                {/* <IonItem>
                    <IonInput labelPlacement="floating" value={fcmToken.value}>
                      <div slot="label">
                        FCM TOKEN 
                      </div>
                    </IonInput>
                </IonItem> */}
                </IonList>
              </IonCardContent>
              <IonCardSubtitle  className='sign-footer'>
              <a href="/signin" className='signin-link'>Je veux créer un <span>compte.</span></a>

              {/* <IonButton color="success" expand="full" onClick={getFcmToken}>Register for Push</IonButton> */}
              
              </IonCardSubtitle>
            </IonCard>
        </div>
      </IonContent>

    </IonPage>
  );
};

export default Login;
