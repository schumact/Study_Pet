import React, {useContext, useState} from "react";
import {authInfo, StitchAuthContext, useStitchAuth} from "../Stitch/StitchAuth";
import {IonButton, IonAlert, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonInput, IonItem} from '@ionic/react';
import './GoalItem.css';
import {IGoal} from "../Stitch/StitchGoals";
import DateTimePicker from "./DateTimePicker";


export const AddGoal = () => {  // Going to need to set props to object that implements IGoal
    const userInfo: authInfo = useContext(StitchAuthContext);
    const [title, setTitle] = useState<string>();
    const [desc, setDesc] = useState<string>();
    const [startDate, setStartDate] = useState<string>();
    const [endDate, setEndDate] = useState<string>();

    // TODO add in a check to make sure that end date is after startDate

    return (
            <IonList>
                <IonItem>
                    <IonInput value={title}
                              placeholder="Title"
                              onIonChange={e => setTitle(e.detail.value!)}>
                    </IonInput>
                </IonItem>
                <IonItem>
                    <IonInput value={desc}
                              placeholder="Description"
                              onIonChange={e => setDesc(e.detail.value!)}>
                    </IonInput>
                </IonItem>
                <DateTimePicker setDate={setStartDate}/>
                <DateTimePicker setDate={setEndDate}/>
                <IonButton
                    expand="block"
                    onClick={() => console.log("Call insertOne() on goals collection here")}>
                    Add Goal
                </IonButton>
            </IonList>
    )
};

export default AddGoal;
