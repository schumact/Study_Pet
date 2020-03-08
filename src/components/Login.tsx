import React, {useState} from "react";
import {useStitchAuth} from "../Stitch/StitchAuth";
import AccountCreation from "./AccountCreation";
import {IonButton} from '@ionic/react';
import './Login.css';
import {Link} from 'react-router-dom'

const Login: React.FC = () => {
    //  My thought process here is that we need to get these creds
    // over to useStitchAuth() with action.handleUserLoginStub().
    // My best guess is to use state to store these creds until the
    // login button is clicked.
    interface ICreds {
        email: string,
        password: string
    }

    const [creds, UpdateCreds] = useState<ICreds>({email: "", password: ""});

    // This will be set to true if a user presses the "create Account" button.
    const [isCreatingAcc, CreateAccount] = useState<boolean>(false);

    const {actions} = useStitchAuth();
    return (
        isCreatingAcc ?
            <AccountCreation/>
            :
            // This could probably be its own component
            <div className="container">
                <div className="title_container">
                    <p>PLACE PURRSISTENT PET LOGO HERE</p>
                    <p style={{fontWeight: 'bold', color: "#1e90ff", fontStyle: "italic", fontSize: 25}}>
                        Welcome to Purrsistent Pet!</p>
                </div>
                <div className="sub_container">
                    <input
                        className="input_style"
                        onChange={(text) =>
                            UpdateCreds({...creds, email: text.currentTarget.value})}
                        type="text"
                        value={creds.email}
                        placeholder="email"
                    />
                </div>
                <div className="sub_container">
                    <input
                        className="input_style"
                        onChange={(text) =>
                            UpdateCreds({...creds, password: text.currentTarget.value})}
                        type="password"
                        value={creds.password}
                        placeholder="password"
                    />
                </div>
                {/* TODO Switch actions.handleAnonymousLogin() to action.handleUserLoginStub() once auth is working
              Will have to pop up some sort of alert for wrong password here as well if incorrect. If valid user,
              App component will use isLoggedIn and change the component off of the current StitchLogin()*/}
                <div style={{margin: "0 0 20px 0", width: "70%"}}>
                    <IonButton
                        shape="round"
                        expand="block"
                        onClick={() => actions.handleAnonymousLogin()}> Login Anon
                    </IonButton>
                </div>
                <div>
                    <p style={{marginBottom: 10}}>Don't have an account?
                        <Link to={{pathname: "/sign_up"}}> Sign up</Link></p>
                </div>
            </div>
    );
};

export default Login;
