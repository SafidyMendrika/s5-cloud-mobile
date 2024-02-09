import {
  IonButton,
  IonCard,
  IonCol,
  IonContent,
  IonFabButton,
  IonGrid,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonThumbnail,
  IonTitle,
  useIonLoading,
} from "@ionic/react";
import {
  addCircleSharp,
  camera,
  chevronBack,
  chevronForward,
  createOutline,
  imageOutline,
} from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { Filesystem, Directory } from "@capacitor/filesystem";
import { Storage } from "@capacitor/storage";
import AjoutPhoto from "./AjoutPhoto";
import { API_URL } from "../../context/urlContext";
import { AjoutAnnonceView } from "../../types/AjoutAnnonceView";
import { NewAnnonce } from "../../types/NewAnnonce";
import { jwtDecode } from "jwt-decode";
import { UserToken } from "../../types/UserToken";
import axios from "axios";
import PhotoGallery from "./PhotoGallery";
import { usePhotoGallery } from "../../hooks/usePhotoGallery";
import { showToast } from "../../hooks/PushNotificationHook";

const Ajout: React.FC = () => {
  let token = localStorage.getItem("token");
  if (token == null) {
    token = "";
  }
  const user : UserToken = jwtDecode(token);


  const temp: AjoutAnnonceView = {
    page: 1,
    marques: [],
    modeles: [],
    energies: [],
    moteurs: [],
    vitesses: [],
  };
  const [ajoutAnnonceView, setAjoutAnnonceView] = useState(temp);

  function nextPage() {
    setAjoutAnnonceView({ ...ajoutAnnonceView, page: 2 });
  }
  function previousPage() {
    setAjoutAnnonceView({ ...ajoutAnnonceView, page: 1 });
  }



  const findMoteurs = new Promise<any>((resolve, reject) => {
    fetch(API_URL + "/moteurs")
      .then((resp) => resp.json())
      .then((data) => {
        // console.log(data.data);

        resolve(data.data);
      });
  });

  const findMarques = new Promise<any>((resolve, reject) => {
    fetch(API_URL + "/marques")
      .then((resp) => resp.json())
      .then((data) => {
        // console.log(data.data);

        resolve(data.data);
      });
  });

  const findModeles = new Promise<any>((resolve, reject) => {
    fetch(API_URL + "/modeles")
      .then((resp) => resp.json())
      .then((data) => {

        resolve(data.data);
      });
  });

  const findVitesses = new Promise<any>((resolve, reject) => {
    fetch(API_URL + "/vitesses")
      .then((resp) => resp.json())
      .then((data) => {

        resolve(data.data);
      });
  });
  const findEnergies = new Promise<any>((resolve, reject) => {
    fetch(API_URL + "/energies")
      .then((resp) => resp.json())
      .then((data) => {

        resolve(data.data);
      });
  });
  
  const [selectedMarque , setSelectedMarque] = useState(0);
  const handleChangemarque = (e:any)=> setSelectedMarque(e.target.value);
  //
  useEffect(()=>{
    console.log(selectedMarque);
    
    console.log("niova");
  
  },[selectedMarque]);

  useEffect(() => {

    findMoteurs.then((moteurs) => {
      setAjoutAnnonceView((ajoutAnnonceView) => ({
        ...ajoutAnnonceView,
        moteurs: moteurs,
      }));
    });

    findMarques.then((marques) => {
      setAjoutAnnonceView((ajoutAnnonceView) => ({
        ...ajoutAnnonceView,
        marques: marques,
      }));
    });

    findModeles.then((modeles) => {
        setAjoutAnnonceView((ajoutAnnonceView) => ({
          ...ajoutAnnonceView,
          modeles: modeles,
        }));
      });

    findVitesses.then((vitesses) => {
        setAjoutAnnonceView((ajoutAnnonceView) => ({
          ...ajoutAnnonceView,
          vitesses: vitesses,
        }));
      });
    findEnergies.then((energies) => {
      setAjoutAnnonceView((ajoutAnnonceView) => ({
        ...ajoutAnnonceView,
        energies: energies,
      }));
    });
  }, []);

  const newAnnonceTemplate : NewAnnonce = {
    idutilisateur: user.idutilisateur,
    idmodele: 0,
    description:  "",
    prix: 0,
    date: new Date().toJSON(),
    idenergie: 0,
    idvitesse: 0,
    idmoteur: 0
  }
  const [annonce,setAnnonce] = useState(newAnnonceTemplate);

  const handleChangeModele = (e:any)=> setAnnonce({...annonce,idmodele : e.target.value})
  const handleChangeEnergie= (e:any)=> setAnnonce({...annonce,idenergie : e.target.value});
  const handleChangePrix= (e:any)=> setAnnonce({...annonce,prix : e.target.value});
  const handleChangeVitesse= (e:any)=> setAnnonce({...annonce,idvitesse : e.target.value});
  const handleChangeMoteur= (e:any)=> setAnnonce({...annonce,idmoteur : e.target.value});
  const handleChangeDescription= (e:any)=> setAnnonce({...annonce,description : e.target.value});

  const [present , dismiss] = useIonLoading();
  const sendAnnonce = async ()=>{
    present({
      message : "ajout en cours"
    })
   const formData = new FormData();
   Object.entries(annonce).forEach(([key, value]) => {
    formData.append(key, value);
  });

  for (const photo of photos) {
    try {
      const response = await fetch(photo.filePath);
      const blob = await response.blob();
      const file = new File([blob], photo.filePath ||"", { type: 'image/jpeg'});
      console.log(file);
      
      formData.append('files', file);
    } catch (error) {
      console.error('Error fetching file:', error);
    }
  }

  
    axios.post(API_URL+"/annonces", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        "Authorization" : "Bearer "+localStorage.getItem("token")
      }
    })
    .then(response => {
      console.log(response);
      
      const data = response.data;

      console.log(data);

      if (data.code == 200) {
        showToast("inseré avec succès")
        
      }
      dismiss();
      
    })
    .catch(error => {
      console.error(error);
    });
  }


  // photos -----

  const { photos,takePhoto,takeGallery, deletePhoto  } = usePhotoGallery();

  const send = ()=>{
      photos.forEach(photo =>{
          console.log(photo.filePath + " :: "+photo.webviewPath);
          console.log(photo);
      })
  }
  

  
      
  return (
    <IonPage className="ion-padding">
      <IonCard className="ion-padding" style={{ padding: "3%" }}>
        {ajoutAnnonceView.page == 1 && (
          <IonList>
            <IonItem>
              <IonSelect label="Marque" placeholder="Marques" onIonChange={handleChangemarque} >
                {ajoutAnnonceView.marques.map((marque) => (
                  <IonSelectOption value={marque.id} key={marque.id}>
                    {marque.nom}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
            <IonItem>
              <IonSelect label="Modeles" placeholder="Modeles" onIonChange={handleChangeModele}>
                {ajoutAnnonceView.modeles.map((modele) => (
                  <IonSelectOption value={modele.id} key={modele.id}>
                    {modele.nom}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>

            <IonItem>
              <IonSelect label="Energie" placeholder="Energies" onIonChange={handleChangeEnergie}>
              {ajoutAnnonceView.energies.map((energie) => (
                  <IonSelectOption value={energie.id} key={energie.id}>
                    {energie.nom}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>

            <IonItem>
              <IonInput label="Prix" onIonInput={handleChangePrix}/>
            </IonItem>

            <IonItem>
              <IonSelect label="Vitesse" placeholder="Vitesse" onIonChange={handleChangeVitesse}>
              {ajoutAnnonceView.vitesses.map((vitesse) => (
                  <IonSelectOption value={vitesse.id} key={vitesse.id}>
                    {vitesse.nom}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>

            <IonItem>
              <IonSelect label="Moteur" placeholder="Moteurs" onIonChange={handleChangeMoteur}>
                {ajoutAnnonceView.moteurs.map((moteur) => (
                  <IonSelectOption value={moteur.id} key={moteur.id}>
                    {moteur.nom}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>

            <IonItem>
              <IonLabel>Description</IonLabel>
              <IonTextarea autoGrow={true} onIonInput={handleChangeDescription}></IonTextarea>
            </IonItem>
          </IonList>
        )}

        {ajoutAnnonceView.page == 2 &&
           <div className="ion-padding">
           <PhotoGallery photos={photos} deletePhoto={deletePhoto} />

           <div className="ion-padding" style={{display : "flex" , justifyContent : "center"}}>
               <IonFabButton onClick={() => takeGallery()} color={"light"} style={{margin : "0% 2%"}}>
                   <IonIcon icon={imageOutline}></IonIcon>
               </IonFabButton>

               <IonFabButton onClick={() => takePhoto()} color={"warning"} style={{margin : "0% 2%"}}>
                   <IonIcon icon={camera}></IonIcon>
               </IonFabButton>
           </div>

       </div   >
        }

        <div style={{ display: "flex", padding: "2%" }}>
          {ajoutAnnonceView.page == 1 && (
            <IonButton
              color={"warning"}
              style={{ float: "right", width: "100%" }}
              size="small"
              onClick={nextPage}
            >
              <IonIcon icon={chevronForward} />
            </IonButton>
          )}

          {ajoutAnnonceView.page == 2 && (
            <>
              <IonButton
                color={"light"}
                style={{ float: "right", width: "50%" }}
                size="small"
                onClick={previousPage}
              >
                <IonIcon icon={chevronBack} />
              </IonButton>
              <IonButton
                color={"warning"}
                style={{ float: "right", width: "100%" }}
                size="small"
                onClick={sendAnnonce}
              >
                confirmer
              </IonButton>
            </>
          )}
        </div>
      </IonCard>
    </IonPage>
  );
};

export default Ajout;
