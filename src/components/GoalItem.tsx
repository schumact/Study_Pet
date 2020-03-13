import React, {useContext, useState} from "react";
import {authInfo, StitchAuthContext, useStitchAuth} from "../Stitch/StitchAuth";
import {IonButton, IonAlert, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent} from '@ionic/react';
import './GoalItem.css';
import {Link} from 'react-router-dom';
import {IGoal} from "../Stitch/StitchGoals";


export const GoalItem = () => {  // Going to need to set props to object that implements IGoal
    const userInfo: authInfo = useContext(StitchAuthContext);

    const myGoal: IGoal = {
        goalTitle: "random Goal",
        goalDescription: "Test Description",
        endDate: "2020-03-11",
        startDate: "2020-03-10",
        isComplete: true,
        owner_id: userInfo.currentUser.id
    };

    return (
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>{myGoal.goalTitle}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                {myGoal.goalDescription}
            </IonCardContent>
        </IonCard>
    )
};

export default GoalItem;
