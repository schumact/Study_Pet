import React, {useState} from "react";
import {useStitchAuth} from "./StitchAuth";
import {StyleSheet, Text, View, Button, TextInput} from 'react-native';
import {CreateAccount} from "../Stitch/authentication";
import validateNewUser from "../Util/ValidateNewUser";

export default function AccountCreation() {
    const [creds, UpdateCreds] = useState({email: "", username: "", password: "", reEnterPassword: ""});

    const createAccountHandler = () => {
        let isValidInfo = validateNewUser(creds);
        if (isValidInfo)
        {
            // TODO add request to create account. Remove this alert statement
            alert("Sending you an email now! Delete this message later")
        }
    };

    return (
        <View>
            <Text>PLACE PURRSISTENT PET LOGO HERE</Text>
            <Text style={{fontWeight: 'bold', color: "#1e90ff", fontStyle: "italic", fontSize: 25}}>
                Welcome to Purrsistent Pet!</Text>
            <Text style={{marginTop: 20}}> Please fill out your account information. </Text>
            <Text style={{marginTop: 10, fontWeight: 'bold', color: "#708090"}}>Username:</Text>
            <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 2, marginBottom: 10}}
                maxLength={20}
                onChangeText={text => UpdateCreds({...creds, username: text})}
                value={creds.username}
            />
            <Text style={{marginTop: 10, fontWeight: 'bold', color: "#708090"}}>Email:</Text>
            <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 2, marginBottom: 10}}
                maxLength={20}
                onChangeText={text => UpdateCreds({...creds, email: text})}
                value={creds.email}
            />
            <Text style={{fontWeight: 'bold', color: "#708090"}}>Password:</Text>
            <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 2, marginBottom: 10}}
                maxLength={20}
                onChangeText={text => UpdateCreds({...creds, password: text})}
                secureTextEntry={true}
                value={creds.password}
            />
            <Text style={{marginTop: 10, fontWeight: 'bold', color: "#708090"}}>Re-enter Password:</Text>
            <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 2, marginBottom: 20}}
                maxLength={20}
                onChangeText={text => UpdateCreds({...creds, reEnterPassword: text})}
                secureTextEntry={true}
                value={creds.reEnterPassword}
            />
            <Button title="Create Account" onPress={() => { createAccountHandler()
            }}/>
        </View>
    )
};



