import React from 'react';
import { IonAlert, IonContent, IonPage } from '@ionic/react';
import './styles/login.css';

const Signin: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <main>
            <div className='container'>
                <div className='header'>
                    <img src="assets/images/logos/logo_simple.png" alt="" />
                    <h2>S&apos;inscrire</h2>
                </div>


                <div className='input-container signin'>
                    <input type="text" placeholder='Nom'/>
                    <input type="text" placeholder='Prenom'/>
                    <input type="text" placeholder='Email'/>
                    <input type="text" placeholder='Mot de passe'/>
                    <input type="text" placeholder='Confirmer votre mot de passe'/>
                    <button className='submit' id="present-alert">S&apos;inscrire</button>
                    <IonAlert
                        trigger="present-alert"
                        header="Inscription"
                        message="Vous allez vous inscrire"
                        buttons={['Fermer']}
                      
                    ></IonAlert>
                    <a href="/login" className='signin-link'>J&apos;ai déjà un <span>compte.</span></a>
                </div>
            </div>
        </main>
      </IonContent>
    </IonPage>
  );
};

export default Signin;
