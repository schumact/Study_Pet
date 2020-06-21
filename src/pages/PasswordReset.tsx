import React, {useState} from 'react';
import {
    IonAlert,
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import './SignUp.css';
import {validateNewPassword} from "../Util/ValidateNewUser";
import {resetAccPass} from "../Stitch/authentication";
import {useHistory} from "react-router-dom";

interface ICreds {
    email: string,
    password: string,
    reEnterPassword: string
}

const PasswordReset: React.FC = () => {
    const [creds, UpdateCreds] = useState<ICreds>({email: "", password: "", reEnterPassword: ""});
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [showAlert2, setShowAlert2] = useState<boolean>(false);
    const history = useHistory();

    const resetPasswordHandler = () => {
        let [isValidInfo, errorMSG] = validateNewPassword(creds);
        if (isValidInfo) {
            resetAccPass(creds.email, creds.password);
            setShowAlert(true);
        } else
            setShowAlert2(true);

    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Reset Password</IonTitle>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/login" icon="buttonIcon"/>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Reset Password</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <div>
                    <div className="container">
                        <p style={{
                            fontWeight: 'bold',
                            color: "#1e90ff",
                            fontStyle: "italic",
                            fontSize: 25,
                            marginTop: "20%"
                        }}>
                            Welcome Back!</p>
                        <p style={{marginTop: 20}}> Please enter your email and new password information below. </p>
                        <input
                            className="input_style"
                            maxLength={50}
                            onChange={(text) =>
                                UpdateCreds({...creds, email: text.currentTarget.value})}
                            value={creds.email}
                            placeholder="Email"
                        />
                        <input
                            className="input_style"
                            maxLength={20}
                            onChange={(text) =>
                                UpdateCreds({...creds, password: text.currentTarget.value})}
                            type="password"
                            value={creds.password}
                            placeholder="New Password"
                        />
                        <input
                            className="input_style"
                            maxLength={20}
                            onChange={(text) =>
                                UpdateCreds({...creds, reEnterPassword: text.currentTarget.value})}
                            type="password"
                            value={creds.reEnterPassword}
                            placeholder="Re-enter Password"
                        />
                        <div style={{marginTop: 10, width: "70%"}}>
                            <IonButton
                                shape="round"
                                expand="block"
                                onClick={() => resetPasswordHandler()}> Reset Password
                            </IonButton>
                        </div>
                    </div>
                </div>
                <IonAlert
                    isOpen={showAlert}
                    onDidDismiss={() => {
                        setShowAlert(false);
                        history.goBack();
                    }}
                    header={'Hold Tight!'}
                    message={`If an account exists for ${creds.email}, then an email to reset your 
                    password will appear right away. If after 5 minutes you don't see an email, please
                    try resetting your password again.`}
                    buttons={["OK"]}
                />
                <IonAlert
                    isOpen={showAlert2}
                    onDidDismiss={() => {
                        setShowAlert2(false);
                    }}
                    header={'Whoops! Something went wrong.'}
                    message={"The supplied passwords didn't match or weren't a minimum of 8 characters."}
                    buttons={["OK"]}
                />
            </IonContent>
        </IonPage>
    );
};

export default PasswordReset;
