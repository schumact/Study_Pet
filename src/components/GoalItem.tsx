import React, {useState} from "react";
import {useStitchAuth} from "../Stitch/StitchAuth";
import {IonButton, IonAlert, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent} from '@ionic/react';
import './GoalItem.css';
import {Link} from 'react-router-dom';

type GoalProps = {
    title:string,
    description:string,  // optional
    // startDate: Date,
    // endDate: Date,
    // points: number
}

export const GoalItem = ({ title, description }: GoalProps) => {
    return (
        <IonContent>
            <IonCard>
                <IonCardHeader>
                    <IonCardTitle>{title}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                    {description}
                </IonCardContent>
            </IonCard>
        </IonContent>
        )
};

export default GoalItem;
