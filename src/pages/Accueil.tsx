import React from 'react';
import './styles/accueil.css';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import Home from '../components/home/Home';
import {   useParams } from 'react-router';
import MonCompte from '../components/moncompte/MonCompte';
import Annonces from '../components/annonces/Annonces';
import { IonContent, IonRefresher, IonRefresherContent, RefresherEventDetail } from '@ionic/react';

interface RouteParams {
  page: string;
}

const Accueil: React.FC = () => {

  console.log(localStorage.getItem("token"));
  

  if (localStorage.getItem("token") == undefined  || localStorage.getItem("token") == null || localStorage.getItem("token") == "") {
    location.href = "/login";
  }

  const  param : RouteParams = useParams(); 

  let toRender = null;  
  if (param.page == "" || param.page == null || param.page == "home") {
    toRender = <Annonces />;
  }else if (param.page == "moncompte") {
    toRender = <MonCompte />;
  }else if (param.page == "annonces") {
    toRender = <Annonces />;
  }
  return (
    <>
        <Header/>
          <IonContent fullscreen className='main-accueil' >

              <div style={{height :"60px"}} ></div>
                
                {toRender}

              <div style={{height :"50px"}} ></div>
          </IonContent>

      <Navigation />
    </>

    );
};

export default Accueil;
