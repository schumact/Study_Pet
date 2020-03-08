import React, {useState} from "react";
import {CreateAccount} from "../Stitch/authentication";
import validateNewUser from "../Util/ValidateNewUser";
import {IonButton, IonBackButton} from '@ionic/react';
import './AccountCreation.css';


const AccountCreation: React.FC = () => {

    interface ICreds {
        email: string,
        username: string,
        password: string,
        reEnterPassword: string
    }

    const [creds, UpdateCreds] = useState<ICreds>({email: "", username: "", password: "", reEnterPassword: ""});

    const createAccountHandler = () => {
        let [isValidInfo, errorMSG] = validateNewUser(creds);
        if (isValidInfo)
        {
            // TODO add request to create account. Remove this alert statement
            alert("Sending you an email now! Delete this message later");
            CreateAccount(creds.email, creds.password);
        }
        else { alert(errorMSG);}
    };

    return (
        <div>
            <IonBackButton defaultHref="/account"/>
            <div className="container">
                <h1>PLACE PURRSISTENT PET LOGO HERE</h1>
                <p style={{fontWeight: 'bold', color: "#1e90ff", fontStyle: "italic", fontSize: 25}}>
                    Welcome to Purrsistent Pet!</p>
                <p style={{marginTop: 20}}> Please fill out your account information. </p>
                <p style={{marginBottom: 10}}> You'll be using your email for login. </p>
                <input
                    className="input_style"
                    maxLength={30}
                    onChange={(text) =>
                        UpdateCreds({...creds, username: text.currentTarget.value})}
                    value={creds.username}
                    placeholder="Username"
                />
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
                <div style={{marginTop: 10}}>
                    <IonButton
                        color="primary"
                        shape="round"
                        onClick={() => { createAccountHandler()}}> Create Account
                    </IonButton>
                </div>
            </div>
        </div>
    )
};

export default AccountCreation;
