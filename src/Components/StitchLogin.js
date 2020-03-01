import React, {useState} from "react";
import { useStitchAuth } from "./StitchAuth";
import { StyleSheet, Text, View, Button, TextInput} from 'react-native';
import {CreateAcouunt} from "../Stitch/authentication";
import AccountCreation from "./AccountCreation";

StitchLogin.propTypes = {};
export default function StitchLogin() {
    //  My thought process here is that we need to get these creds
    // over to useStitchAuth() with action.handleUserLoginStub().
    // My best guess is to use state to store these creds until the
    // login button is clicked.
    const [creds, UpdateCreds] = useState({email: "", password: ""});

    // This will be set to true if a user presses the "create Account" button.
    const [isCreatingAcc, CreateAccount] = useState(false);

  const { actions } = useStitchAuth();
  return (
      isCreatingAcc ?
      <AccountCreation/>
          :
          <View style={styles.container}>
              <View style={{flex: 1, alignItems: "center"}}>
                  <Text>PLACE PURRSISTENT PET LOGO HERE</Text>
                  <Text style={{fontWeight: 'bold', color: "#1e90ff", fontStyle: "italic", fontSize: 25}}>
                      Welcome to Purrsistent Pet!</Text>
              </View>
              <Text style={{marginTop: 10, fontWeight: 'bold', color: "#708090"}}>Email:</Text>
              <TextInput
                  style={{ height: 40, borderColor: 'gray', borderWidth: 2, marginBottom: 10 }}
                  onChangeText={text => UpdateCreds({...creds, email: text})}
                  value={creds.email}
              />
              <Text style={{fontWeight: 'bold', color: "#708090"}}>Password:</Text>
              <TextInput
                  style={{ height: 40, borderColor: 'gray', borderWidth: 2, marginBottom: 10 }}
                  onChangeText={text => UpdateCreds( {...creds, password: text})}
                  secureTextEntry={true}
                  value={creds.password}
              />
              {/* TODO Switch actions.handleAnonymousLogin() to action.handleUserLoginStub() once auth is working
              Will have to pop up some sort of alert for wrong password here as well if incorrect. If valid user,
              App component will use isLoggedIn and change the component off of the current StitchLogin()*/}
              <Button title="Login Anon" onPress={() => actions.handleAnonymousLogin()}/>
              <View style={styles.NewAccount}>
                  <Text style={{marginBottom: 10}}>Don't have an account?</Text>
                  <Button title="Create Account" onPress={() => {CreateAccount(true)}}/>
              </View>
          </View>
  );
}

const styles = StyleSheet.create({
    NewAccount: {
        flex: 1,
        marginTop: 35,
    },
    container: {
        width: "35%",
    }
});
