import React from 'react';

import "./styles/header.css";
import {  IonButtons, IonHeader, IonMenuButton, IonTitle, IonToolbar } from '@ionic/react';

const Header : React.FC = ()=>{

    return (
        <>
        <IonHeader className='app-header'>
            <IonToolbar>
                <a  href='/accueil/home'>
                    <IonTitle>
                        <img src='/assets/images/logo.png' className='app-logo'/>
                    </IonTitle>
                </a>
            </IonToolbar>
        </IonHeader>
        
        </>
    )
}

export default Header;