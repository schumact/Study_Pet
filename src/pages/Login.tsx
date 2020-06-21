import React from 'react';
import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import LoginUser from '../components/LoginUser';
import './Login.css';
import Logo from '../Util/Images/Logo.png';

const Login: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Login</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Login</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <div style={{display:"flex", flexDirection: "column", height: "100%"}}>
                    <div style={backgroundStyle}/>
                    <div style={{flex:3}}>
                        <LoginUser/>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
};

var backgroundStyle = {
    flex:1,
    padding:"3rem",
    backgroundImage: `url(${Logo})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat"
};

export default Login;
