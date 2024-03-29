import React from "react";
import PhotoGallery from './PhotoGallery';
import { usePhotoGallery } from '../../hooks/usePhotoGallery';
import { IonButton, IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { camera, card, glasses, imageOutline, phonePortraitOutline } from 'ionicons/icons';
import { Filesystem, FilesystemDirectory } from "@capacitor/filesystem";
import axios from 'axios';
import { API_URL } from "../../context/urlContext";
import "../styles/ajout-photo.css"
import { Photo } from "../../types/Photo";


function AjoutPhoto() {

    const { photos,takePhoto,takeGallery, deletePhoto  } = usePhotoGallery();

    const send = ()=>{
        photos.forEach(photo =>{
            console.log(photo.filePath + " :: "+photo.webviewPath);
            console.log(photo);
        })
    }
    
        
    const uploadPhotos = async () => {
        const formData = new FormData;
    
        // photos.forEach((photo, index) => {
        //   // Read the file from the filesystem
        //   const file = await Filesystem.readFile({
        //     path: photo.filePath
        //   });
    
        //   formData.append(`photo${index}`, new Blob([file.data]), `photo${index}.jpeg`);
        // });
    
        // Send the form data to your server
        try {
        const response = await axios.post(API_URL, formData, {
            headers: {
            'Content-Type': 'multipart/form-data'
            }
        });
        console.log('Photos uploaded successfully:', response);
        } catch (error) {
        console.error('Error uploading photos:', error);
        }
    };



    return (
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
    )
}

export default AjoutPhoto;