import React from "react";
import {
    IonBackButton, IonButtons, IonContent, IonToolbar, IonHeader, IonPage, IonTitle
} from '@ionic/react';
import '../components/AddGoal.css';
import CompletedEpicContainer from "../components/CompleteEpicContainer";
import CompletedGoalContainer from "../components/CompletedGoalContainer";

export const CompletedItemView: React.FC = (() => {

    return (
        <IonPage>
            <IonContent>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonBackButton defaultHref="/home" icon="buttonIcon"/>
                        </IonButtons>
                        <IonTitle>Backlog</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <CompletedGoalContainer/>
                <CompletedEpicContainer/>
            </IonContent>
        </IonPage>
    )
});

export default CompletedItemView;
