import { useState, useEffect } from 'react';
import { isPlatform } from '@ionic/react';
import { Camera, CameraResultType, CameraSource, Photo as CameraPhoto } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Capacitor } from '@capacitor/core';
import { Photo } from '../types/Photo';

async function base64FromPath(path: string): Promise<string> {
	const response = await fetch(path);
	const blob = await response.blob();

	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onerror = reject;
		reader.onload = () => {
			if (typeof reader.result === 'string') {
				resolve(reader.result);
			} else {
				reject('method did not return a string');
			}
		};

		reader.readAsDataURL(blob);
	});
}
export const usePhotoGallery = () => {
    const savePhoto = async (photo: CameraPhoto, fileName: string): Promise<Photo> => {
        let base64Data: any;
    
        if (isPlatform('hybrid')) {
            const file = await Filesystem.readFile({
                path: photo.path!
            });
            base64Data = file.data ;
        } else {
            base64Data = await base64FromPath(photo.webPath!);
        }
    
        const savedFile = await Filesystem.writeFile({
            path: fileName,
            data: base64Data,
            directory: Directory.Data
        });
    
        if (isPlatform('hybrid')) {
            return {
                filePath: savedFile.uri,
                webviewPath: Capacitor.convertFileSrc(savedFile.uri)
            };
        }
    
        return {
            filePath: fileName,
            webviewPath: photo.webPath
        };
    };
	const [photos, setPhotos] = useState<Photo[]>([]);

	const takePhoto = async () => {
        try {
            const width  = 800;
            const heigth  = 800;

            const photo: CameraPhoto = await Camera.getPhoto({
                resultType: CameraResultType.Uri,
                source: CameraSource.Camera,
                quality: 100,
                width : width,
                height : heigth
            });
    
            const fileName = new Date().getTime() + '.jpeg';
            const savedFileImage = await savePhoto(photo, fileName);
    
            const newPhotos = [...photos, savedFileImage];
            setPhotos(newPhotos);

        } catch (e) {
            return;
        }
    };

    const takeGallery = async () => {
        try {
            const width  = 800;
            const heigth  = 800;

            const photo: CameraPhoto = await Camera.getPhoto({
                resultType: CameraResultType.Uri,
                source: CameraSource.Photos,
                quality: 100,
                width : width,
                height : heigth
            });
    
            const fileName = new Date().getTime() + '.jpeg';
            const savedFileImage = await savePhoto(photo, fileName);
    
            const newPhotos = [...photos, savedFileImage];
            setPhotos(newPhotos);

        } catch (e) {
            return;
        }
    };

	const deletePhoto = async (fileName: string) => {
        setPhotos(photos.filter((photo) => photo.filePath !== fileName));
        await Filesystem.deleteFile({
            path: fileName,
            directory: Directory.Data
        });
    };

	return {
		photos,
        setPhotos,
		takePhoto,
		takeGallery,
		deletePhoto,
        savePhoto
	};
};