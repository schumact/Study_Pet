import React, {useContext, useState} from "react";
import {authInfo, StitchAuthContext} from "../Stitch/StitchAuth";
import {
    IonButton,
    IonList,
    IonInput,
    IonItem,
    IonTextarea,
    IonLabel,
    IonAlert
} from '@ionic/react';
import './AddGoal.css';


export const TestCom:React.FC = () => {
    const userInfo: authInfo = useContext(StitchAuthContext);

    return (
        <div>
            <p>Here is my test component</p>
        </div>
    )
};

export default TestCom;
