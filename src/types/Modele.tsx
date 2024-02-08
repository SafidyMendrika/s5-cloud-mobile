import { Categorie } from "./Categorie";
import { Marque } from "./Marque";

export interface Modele{
    id : number,
    marque : Marque,
    categorie : Categorie,
    nom : string
}