import React from "react";
import "../styles/statistiques.css"
import { IonBadge, IonCard, IonIcon, IonText } from "@ionic/react";
import { arrowDownSharp, arrowUpSharp} from "ionicons/icons";
import Chart from "./Chart";
const Statistiques : React.FC = ()=>{
    return (

        <>

            <div className="stat-head" >
                <IonCard className="card">
                    <h1>5</h1>
                    <IonText>Voitures</IonText>
                </IonCard >
                <IonCard className="card">
                    <h1>9</h1>
                    <IonText>Vendus</IonText>
                </IonCard >
                <IonCard className="card">
                    <h1>10</h1>
                    <IonText>Discussions</IonText>
                </IonCard >
            </div>
            
            <div className="chart-container" >
                <Chart />
            </div>
            <div className="revenu-container" >
                <h2> Revenus <IonBadge color={"success"} > <IonIcon icon={arrowDownSharp} ></IonIcon></IonBadge> : </h2>
                <div className="revenu-content">
                    <IonBadge color={"success"} style={{padding : "3%"}}> 
                        <IonText>100 000 Ar</IonText>
                    </IonBadge>
                </div>
            </div>
            <div className="revenu-container" >
                <h2> Commissions <IonBadge color={"warning"} > <IonIcon icon={arrowUpSharp} ></IonIcon></IonBadge> : </h2>
                <div className="revenu-content">
                    <IonBadge color={"warning"} style={{padding : "3%"}}> 
                        <IonText>100 000 Ar</IonText>
                    </IonBadge>
                </div>
            </div>
        </>
    );
}

export default Statistiques;