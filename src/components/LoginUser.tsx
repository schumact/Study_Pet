import React, {useState} from "react";
import {useStitchAuth} from "../Stitch/StitchAuth";
import {IonButton, IonAlert} from '@ionic/react';
import './LoginUser.css';
import {Link} from 'react-router-dom';

interface ICreds {
    email: string,
    password: string
}

const LoginUser: React.FC = () => {

    const [creds, UpdateCreds] = useState<ICreds>({email: "", password: ""});
    const [showLoginAlert, setShowLoginAlert] = useState(false);

    const {
        isLoggedIn,
        actions: {handleUserLogin},
    } = useStitchAuth();

    const handleLogin = async (email: string, password: string) => {
        const result:boolean = await handleUserLogin(email, password);
        console.log("logged in bool is ", result);
        if (!result)
            setShowLoginAlert(true);
    };

    return (
        <div className="test_container">
            <div className="title_container">
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
                    onClick={() =>
                        (async () => {
                            await handleLogin(creds.email, creds.password);
                        })()
                    }> Login
                </IonButton>
            </div>
            <div>
                <p style={{marginBottom: 10}}>Don't have an account?
                    <Link to={{pathname: "/sign_up"}}> Sign up</Link></p>
            </div>
            <div>
                <p style={{marginBottom: 10}}>
                    <Link to={{pathname: "/reset_password"}}>Forgot your password?</Link></p>
            </div>
            <IonAlert
                isOpen={showLoginAlert}
                onDidDismiss={() => setShowLoginAlert(false)}
                header={'Error'}
                message={'An account has not been registered under this email or the entered credentials' +
                ' were incorrect.'}
                buttons={['OK']}
            />
        </div>
    );
};

export default LoginUser;
