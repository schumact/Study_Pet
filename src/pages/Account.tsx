import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import './Account.css';
import {useStitchAuth} from "../Stitch/StitchAuth";
import Login from "./Login";

const Account: React.FC = () => {
    const {
        isLoggedIn,
        actions: {handleLogout},
    } = useStitchAuth();

    return (
        isLoggedIn ?
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Account</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Account</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <p> Component should go here with maybe an ion card with the user's account info.
                    Possibly some user stats.</p>
                <IonButton onClick={() => handleLogout()}>Log out</IonButton>
            </IonContent>
        </IonPage>:
            <Login/>
    );
};

export default Account;
