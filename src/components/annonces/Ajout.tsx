import {
  IonButton,
  IonCard,
  IonCol,
  IonContent,
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
} from "@ionic/react";
import {
  addCircleSharp,
  chevronBack,
  chevronForward,
  createOutline,
} from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { Filesystem, Directory } from "@capacitor/filesystem";
import { Storage } from "@capacitor/storage";
import AjoutPhoto from "./AjoutPhoto";
import { API_URL } from "../../context/urlContext";
import { AjoutAnnonceView } from "../../types/AjoutAnnonceView";

const Ajout: React.FC = () => {
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

  const [photos, setPhotos] = useState<any>([]);

  const handleFileChange = (event: any) => {
    setPhotos([...photos, ...event.target.files]);
  };

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

  }, []);
  return (
    <IonPage className="ion-padding">
      <IonCard className="ion-padding" style={{ padding: "3%" }}>
        {ajoutAnnonceView.page == 1 && (
          <IonList>
            <IonItem>
              <IonSelect label="Marque" placeholder="Marques">
                {ajoutAnnonceView.marques.map((marque) => (
                  <IonSelectOption value="{marque.id}" key={marque.id}>
                    {marque.nom}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
            <IonItem>
              <IonSelect label="Modeles" placeholder="Modeles">
                {ajoutAnnonceView.modeles.map((modele) => (
                  <IonSelectOption value="{modele.id}" key={modele.id}>
                    {modele.nom}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>

            <IonItem>
              <IonSelect label="Energie" placeholder="Energies">
                <IonSelectOption value="apple">Kely</IonSelectOption>
                <IonSelectOption value="banana">Be</IonSelectOption>
                <IonSelectOption value="orange">Antonony</IonSelectOption>
              </IonSelect>
            </IonItem>

            <IonItem>
              <IonInput label="Prix" />
            </IonItem>

            <IonItem>
              <IonSelect label="Vitesse" placeholder="Favorite Fruit">
              {ajoutAnnonceView.vitesses.map((vitesse) => (
                  <IonSelectOption value="{vitesse.id}" key={vitesse.id}>
                    {vitesse.nom}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>

            <IonItem>
              <IonSelect label="Moteur" placeholder="Moteurs">
                {ajoutAnnonceView.moteurs.map((moteur) => (
                  <IonSelectOption value="{moteur.id}" key={moteur.id}>
                    {moteur.nom}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>

            <IonItem>
              <IonLabel>Description</IonLabel>
              <IonTextarea autoGrow={true}></IonTextarea>
            </IonItem>
          </IonList>
        )}

        {ajoutAnnonceView.page == 2 && <AjoutPhoto />}

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
                onClick={nextPage}
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
