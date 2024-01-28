import React from 'react';
import './styles/login.css';
import { IonContent, IonLoading, IonPage } from '@ionic/react';
import { Notifier } from '../components/Notifier';
const Login: React.FC = () => {
  function redirect() : void {
    const notification : Notifier=  new Notifier();

    notification.scheduleNotification();
    window.setTimeout(()=>{
      window.location.href = "/accueil";
    },1100)
  }
  return (
    <IonPage>
      <IonContent fullscreen>
        <main>
            <div className='container'>
                <div className='header'>
                    <img src="assets/images/logos/logo_simple.png" alt="" />
                    <h2>Se connecter</h2>
                </div>


                <div className='input-container'>
                    <input type="text" placeholder='Email'/>
                    <input type="text" placeholder='Mot de passe'/>
                    <button className='submit' id="open-loading" onClick={redirect}>Se Connecter</button>
                    <IonLoading trigger="open-loading" message="Connection en cours" duration={1000} spinner="circles"  />
                    <a href="/signin" className='signin-link'>Je souhaite vous <span>rejoindre.</span></a>
                </div>
            </div>
        </main>
      </IonContent>
    </IonPage>
  );
};

export default Login;
