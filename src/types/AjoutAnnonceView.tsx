import { Energie } from "./Energie";
import { Marque } from "./Marque";
import { Modele } from "./Modele";
import { Moteur } from "./Moteur";
import { Vitesse } from "./Vitesse";

export interface AjoutAnnonceView{
    page : number
    marques : Marque[],
    modeles : Modele[],
    energies : Energie[],
    moteurs : Moteur[],
    vitesses : Vitesse[],
}
