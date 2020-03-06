import React, {useState} from "react";
import { useStitchAuth } from "../Stitch/StitchAuth";
import AccountCreation from "./AccountCreation";

const StitchLogin : React.FC = () => {
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

    const { actions } = useStitchAuth();
    return (
        isCreatingAcc ?
            <AccountCreation/>
            :
            // This could probably be its own component
            <div>
                <div style={{flex: 1, alignItems: "center"}}>
                    <p>PLACE PURRSISTENT PET LOGO HERE</p>
                    <p style={{fontWeight: 'bold', color: "#1e90ff", fontStyle: "italic", fontSize: 25}}>
                        Welcome to Purrsistent Pet!</p>
                </div>
                <p style={{marginTop: 10, fontWeight: 'bold', color: "#708090"}}>Email:</p>
                <input
                    style={{ height: 40, borderColor: 'gray', borderWidth: 2, marginBottom: 10 }}
                    onChange={(text) =>
                        UpdateCreds({...creds, email: text.currentTarget.value})}
                    value={creds.email}
                />
                <p style={{fontWeight: 'bold', color: "#708090"}}>Password:</p>
                <input
                    style={{ height: 40, borderColor: 'gray', borderWidth: 2, marginBottom: 10 }}
                    onChange={(text) =>
                        UpdateCreds( {...creds, password: text.currentTarget.value})}
                    type="password"
                    value={creds.password}
                />
                {/* TODO Switch actions.handleAnonymousLogin() to action.handleUserLoginStub() once auth is working
              Will have to pop up some sort of alert for wrong password here as well if incorrect. If valid user,
              App component will use isLoggedIn and change the component off of the current StitchLogin()*/}
                <button title="Login Anon" onClick={() => actions.handleAnonymousLogin()}/>
                <div>
                    <p style={{marginBottom: 10}}>Don't have an account?</p>
                    <button title="Create Account" onClick={() => {CreateAccount(true)}}/>
                </div>
            </div>
    );
};

export default StitchLogin;
