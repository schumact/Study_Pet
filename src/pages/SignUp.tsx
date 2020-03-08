import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './SignUp.css';
import AccountCreation from "../components/AccountCreation";

const SignUp: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Sign Up</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Sign Up</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <AccountCreation/>
            </IonContent>
        </IonPage>
    );
};

export default SignUp;
