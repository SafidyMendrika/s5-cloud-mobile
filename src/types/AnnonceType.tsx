import { Energie } from "./Energie";
import { Modele } from "./Modele";
import { Moteur } from "./Moteur";
import { UserType } from "./UserType";
import { Vitesse } from "./Vitesse";

export interface AnnonceType{
    id: number;
    modele: Modele;
    description: string;
    prix: number;
    dateValidation: string;
    dateAnnonce: string;
    moteur: Moteur;
    vitesse: Vitesse;
    energie: Energie;
    etat: number;
    utilisateur: UserType;
    photoAnnonces: any[]; // Vous pouvez remplacer 'any' par un type approprié pour les photos
    count: number;
}