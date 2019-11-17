import React, { Component } from 'react';
import { TextInput, Text, View, Button, Alert } from 'react-native';
import Oval from '../Misc/Oval';
import styles from "../Misc/Styles.js";

// TODO create state object later and include these values
const stub_username = ""; 
const stub_password = "";

function Separator () {
    return <View style={styles.seperator}></View>;
}

export default class Login extends Component {
    render() {
        return (
        <View>
            <Oval></Oval>
            <Separator/>
            <Text>Username</Text>
            <TextInput 
                style={styles.textInp}
                value={stub_username}>
            </TextInput>
            <Separator/>
            <Text>Password</Text>
            <TextInput 
                style={styles.textInp}
                value={stub_password}>
            </TextInput>
            <Separator/>
            <Button style= {styles.login_btn} color="#b3ffd9" title="Login" onPress={() => Alert.alert("LOGIN", "Logging in")}></Button>
            <Separator/>
            <Button style= {styles.login_btn} color="#ffb3b3" title="Reset" onPress={() => Alert.alert("RESET", "Reseting Account")}></Button>
            <Separator/>
            <Text styles={styles.baseText}>
                <Text style={styles.title}>Don't have an account?</Text>
                <Text>{'\n\n'}</Text>
                Click on <Text style={styles.link}>this link</Text> to sign up!
            </Text>
        </View>
        );
    }
}



