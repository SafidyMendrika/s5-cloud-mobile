import React, { useState } from 'react';
import { IonAlert, IonButton, IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonContent, IonInput, IonItem, IonList, IonPage, IonText, IonTitle } from '@ionic/react';
import './styles/login.css';
import { SigninObject } from '../types/SigninObject';
import { API_URL } from '../context/urlContext';
import { showToast } from '../hooks/PushNotificationHook';

const Signin: React.FC = () => {

  const userTemplate : SigninObject = {
    nom : null,
    mdp : null,
    email : null,
    fcm : window.localStorage.getItem("fcmToken"),
    date : null

  };
  const [userInput , setUserInput] = useState(userTemplate);

  const handleChangeNom = (e : any)=> setUserInput({...userInput,nom : e.target.value});  
  const handleChangeMail = (e : any)=> setUserInput({...userInput,email : e.target.value});  
  const handleChangeMdp = (e : any)=> setUserInput({...userInput,mdp : e.target.value});  
  const handleChangeDtn= (e : any)=> setUserInput({...userInput,date : e.target.value});  

  const signin = ()=>{
    const options = {
      method: 'POST', 
      headers : {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInput) 
    };
    fetch(API_URL+"/utilisateurs",options)
    .then(resp => resp.json())
    .then(data =>{
      console.log(data);
      if (data.code == 200) {
        
        const token = data.token;
        
        window.localStorage.setItem("token",token);
        
        window.location.href = "/";
      }else{
        showToast(data.message);
      }
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
