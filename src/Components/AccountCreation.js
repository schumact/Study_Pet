import React, {useState} from "react";
import { useStitchAuth } from "./StitchAuth";
import { StyleSheet, Text, View, Button, TextInput} from 'react-native';
import {CreateAcouunt} from "../Stitch/authentication";

export default function AccountCreation() {
    const [creds, UpdateCreds] = useState({email: "", password: "", reEnterPassword: ""});

  return (
      <View>
          <Text>PLACE PURRSISTENT PET LOGO HERE</Text>
          <Text style={{fontWeight: 'bold', color: "#1e90ff", fontStyle: "italic", fontSize: 25}}>
              Welcome to Purrsistent Pet!</Text>
          <Text style={{marginTop: 20}}> Please enter an email and password for your account. </Text>
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
          <Text style={{marginTop: 10, fontWeight: 'bold', color: "#708090"}}>Re-enter Password:</Text>
          <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 2, marginBottom: 20 }}
              onChangeText={text => UpdateCreds( {...creds, reEnterPassword: text})}
              secureTextEntry={true}
              value={creds.reEnterPassword}
          />
          <Button title="Create Account" onPress={() => {CreateAccount(true)}}/>
      </View>
  )
};



