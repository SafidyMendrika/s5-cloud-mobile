import React, { useEffect, useState } from 'react';
import { IonAlert, IonButton, IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonContent, IonInput, IonItem, IonList, IonPage, IonText, IonTitle, useIonLoading } from '@ionic/react';
import './styles/login.css';
import { SigninObject } from '../types/SigninObject';
import { API_URL } from '../context/urlContext';
import { showToast } from '../hooks/PushNotificationHook';
import { PushNotifications, Token } from '@capacitor/push-notifications';
import axios from 'axios';

const Signin: React.FC = () => {
  const userTemplate : SigninObject = {
    nom : null,
    mdp : null,
    email : null,
    fcm :null,
    date : null

  };
  
  const [userInput , setUserInput] = useState(userTemplate);

  useEffect(()=>{

    // Register with Apple / Google to receive push via APNS/FCM
    PushNotifications.register();
    
    // On success, we should be able to receive notifications
    PushNotifications.addListener('registration',
    (token: Token) => {
      showToast('Push registration success');
      setUserInput({...userInput , fcm : token.value});
    }
    );
    
  },[])


  const handleChangeNom = (e : any)=> setUserInput({...userInput,nom : e.target.value});  
  const handleChangeMail = (e : any)=> setUserInput({...userInput,email : e.target.value});  
  const handleChangeMdp = (e : any)=> setUserInput({...userInput,mdp : e.target.value});  
  const handleChangeDtn= (e : any)=> setUserInput({...userInput,date : e.target.value});  

  const [present, dismiss] = useIonLoading();

  const signin = ()=>{
    present({
      message : "création en cours"
    })

    axios.post(API_URL+"/utilisateurs",userInput,{
      headers : {
        "Content-Type" : "application/json"
      }
    }).then(resp =>{
      const data = resp.data;


      if (data.code == 200) {
        const token = data.data.token;
        
        localStorage.setItem("token",token);
        
        
        window.location.href = "/";
      }else{
        showToast(data.message);
      }
      dismiss()
      
    }).catch(error => {
      console.log(JSON.stringify(error));
      
    })
    
  
  }
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className='sign-main'>
            <IonCard className='ion-padding'>
              <IonCardTitle className='header ion-padding'>
                <img src="assets/images/logos/logo_simple.png" alt="" />
                <IonTitle className='ion-padding'>
                  S&lsquo;inscrire
                </IonTitle>
              </IonCardTitle>

              <IonCardContent>
                <IonList>
                  <IonItem>
                    <IonInput labelPlacement="floating" type="text" value={userInput.nom} onIonInput={handleChangeNom}>
                      <div slot="label">
                        Nom
                      </div>
                    </IonInput>
                  </IonItem>

                  <IonItem>
                    <IonInput labelPlacement="floating" type="email" value={userInput.email} onIonInput={handleChangeMail}>
                      <div slot="label">
                        Mail
                      </div>
                    </IonInput>
                  </IonItem>

                  <IonItem>
                    <IonInput labelPlacement="floating" type="password" value={userInput.mdp} onIonInput={handleChangeMdp}>
                      <div slot="label">
                        Mot de passe  
                      </div>
                    </IonInput>
                  </IonItem>

                  <IonItem>
                    <IonInput labelPlacement="floating" type="date" value={userInput.date} onIonInput={handleChangeDtn}>
                      <div slot="label">
                        Date de naissance
                      </div>
                    </IonInput>
                  </IonItem>

                  <div className='sign-input-container'>
                      <IonButton color={'warning'} onClick={signin}>
                        S&lsquo;inscrire
                      </IonButton>
                  </div>

                </IonList>
              </IonCardContent>
              <IonCardSubtitle  className='sign-footer'>
              <a href="/login" className='signin-link'>J&apos;ai déjà un <span>compte.</span></a>

              </IonCardSubtitle>
            </IonCard>
        </div>
      </IonContent>

    </IonPage>
  );
};

export default Signin;
