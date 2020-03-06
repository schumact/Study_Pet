import React, {useState} from "react";
import {CreateAccount} from "../Stitch/authentication";
import validateNewUser from "../Util/ValidateNewUser";

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
            <h1>PLACE PURRSISTENT PET LOGO HERE</h1>
            <p style={{fontWeight: 'bold', color: "#1e90ff", fontStyle: "italic", fontSize: 25}}>
                Welcome to Purrsistent Pet!</p>
            <p style={{marginTop: 20}}> Please fill out your account information. </p>
            <p style={{marginTop: 10, fontWeight: 'bold', color: "#708090"}}>Username:</p>
            <input
                style={{height: 40, borderColor: 'gray', borderWidth: 2, marginBottom: 10}}
                maxLength={30}
                onChange={(text) =>
                    UpdateCreds({...creds, username: text.currentTarget.value})}
                value={creds.username}
            />
            <p style={{marginTop: 10, fontWeight: 'bold', color: "#708090"}}>Email:</p>
            <input
                style={{height: 40, borderColor: 'gray', borderWidth: 2, marginBottom: 10}}
                maxLength={50}
                onChange={(text) =>
                    UpdateCreds({...creds, email: text.currentTarget.value})}
                value={creds.email}
            />
            <p style={{fontWeight: 'bold', color: "#708090"}}>Password:</p>
            <input
                style={{height: 40, borderColor: 'gray', borderWidth: 2, marginBottom: 10}}
                maxLength={20}
                onChange={(text) =>
                    UpdateCreds({...creds, password: text.currentTarget.value})}
                type="password"
                value={creds.password}
            />
            <p style={{marginTop: 10, fontWeight: 'bold', color: "#708090"}}>Re-enter Password:</p>
            <input
                style={{height: 40, borderColor: 'gray', borderWidth: 2, marginBottom: 20}}
                maxLength={20}
                onChange={(text) =>
                    UpdateCreds({...creds, reEnterPassword: text.currentTarget.value})}
                type="password"
                value={creds.reEnterPassword}
            />
            <button title="Create Account" onClick={() => { createAccountHandler()}}/>
        </div>
    )
};

export default AccountCreation;
