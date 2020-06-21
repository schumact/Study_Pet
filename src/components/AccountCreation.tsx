import React, {useState} from "react";
import {CreateAccount} from "../Stitch/authentication";
import {validateNewUser} from "../Util/ValidateNewUser";
import {IonAlert, IonButton, IonContent, IonItem, IonList, IonModal} from '@ionic/react';
import './AccountCreation.css';
import {useHistory} from "react-router-dom";
import PrivacyPolicy from "./PrivacyPolicy";

interface ICreds {
    email: string,
    password: string,
    reEnterPassword: string
}

const AccountCreation: React.FC = () => {
    const [creds, UpdateCreds] = useState<ICreds>({email: "", password: "", reEnterPassword: ""});
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [showAlert2, setShowAlert2] = useState<boolean>(false);
    const [showAlert3, setShowAlert3] = useState<boolean>(false);
    const [showAlert4, setShowAlert4] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [termsAgreed, setTermsAgreed] = useState<boolean>(false);
    const [termsOfServiceView, setTermsOfServiceViewed] = useState<boolean>(false);;
    const history = useHistory();

    const createAccountHandler = () => {
        if (termsOfServiceView) {
            if (termsAgreed) {
                let [isValidInfo, errorMSG] = validateNewUser(creds);
                if (isValidInfo) {
                    CreateAccount(creds.email, creds.password);
                } else
                    setShowAlert2(true);
            } else
                setShowAlert3(true);
        }
        else
            setShowAlert4(true);
    };

    return (
        <div>
            <div className="container">
                <p style={{fontWeight: 'bold', color: "#1e90ff", fontStyle: "italic", fontSize: 25, marginTop: "20%"}}>
                    Welcome to Purrsistent Pet!</p>
                <p style={{marginTop: 20}}> Please fill out your account information. </p>
                <p style={{marginBottom: 10}}> You'll be using your email for login. </p>
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
                    placeholder="Password"
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
                <IonList>
                    <IonItem lines="none">
                        <div style={{marginTop: "20px", marginBottom: "20px"}}>
                            <p style={{display: "inline-block", marginRight: "15px"}}> Acknowledge Privacy Policy </p>
                            <input
                                className="input_style2"
                                onChange={() => {
                                    setTermsAgreed(!termsAgreed)
                                }}
                                type="checkbox"
                                value={"Agreed"}
                                checked={termsAgreed}
                            />
                            <IonButton
                                expand="block"
                                color="secondary"
                                onClick={() => {
                                    setShowModal(true);
                                    setTermsOfServiceViewed(true);
                                }
                                }>
                                View Privacy Policy
                            </IonButton>
                        </div>
                    </IonItem>
                </IonList>
                <IonModal isOpen={showModal}>
                    <PrivacyPolicy/>
                    <IonButton
                        color="danger"
                        onClick={() => {
                            setShowModal(false);
                        }}
                        expand="block">
                        Close
                    </IonButton>
                </IonModal>
                <div style={{marginTop: 10, width: "70%"}}>
                    <IonButton
                        shape="round"
                        expand="block"
                        onClick={() => {
                            createAccountHandler()
                        }}> Create Account
                    </IonButton>
                </div>
            </div>
            <IonAlert
                isOpen={showAlert}
                onDidDismiss={() => {
                    setShowAlert(false);
                    history.goBack();
                }}
                header={'Hold Tight!'}
                message={"Your almost done. Please check your email and confirm your account."}
                buttons={["OK"]}
            />
            <IonAlert
                isOpen={showAlert2}
                onDidDismiss={() => {
                    setShowAlert2(false);
                }}
                header={'Whoops! Something went wrong.'}
                message={"Please make sure that you are using a valid email address, your " +
                "passwords match and are at a minimum 8 characters long, and that your username" +
                " is at minimum 5 characters long"}
                buttons={["OK"]}
            />
            <IonAlert
                isOpen={showAlert3}
                onDidDismiss={() => {
                    setShowAlert3(false);
                }}
                header={'Terms of service not accepted.'}
                message={"After having read our privacy policy, please mark that you agree."}
                buttons={["OK"]}
            />
            <IonAlert
                isOpen={showAlert4}
                onDidDismiss={() => {
                    setShowAlert4(false);
                }}
                header={'Terms of service not viewed'}
                message={"Please read our privacy policy and mark that you agree."}
                buttons={["OK"]}
            />
        </div>
    )
};

export default AccountCreation;
