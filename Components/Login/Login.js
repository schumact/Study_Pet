import React, { Component } from 'react';
import { TextInput, Text, View, Button, Alert } from 'react-native';
import Oval from '../Misc/Oval';
import styles from "../Misc/Styles.js";
import Aux from "../../hoc/auxiliary";

// TODO create state object later and include these values
const stub_username = ""; 
const stub_password = "";

function Separator () {
    return <View style={styles.seperator}></View>;
}

export default class Login extends Component {
    render() {
        return (
            <Aux>
                <View style={{flex: 2, backgroundColor: "white"}}>
                    <Text>Picture of study pet goes here</Text>
                </View>
                <View style={styles.login_style}>
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
                    <View style={styles.login_btn_comp}>
                        <Button
                            title="Login"
                            color="#80ffbf"
                            s
                        />
                </View> 
                <Separator/>
                <Text><Text style={styles.link}>Forgot your password?</Text></Text>
                </View>
                <View style={{flex:1, flexDirection: 'column', justifyContent: 'center',
                 alignItems: "center", backgroundColor: "#ff6666"}}>
                    <Text styles={styles.baseText}>
                        <Text style={styles.title}>Don't have an account?</Text>
                        <Text>{'\n\n'}</Text>
                        Click on <Text style={styles.link}>this link</Text> to sign up!
                    </Text>
                </View>
            </Aux>
        );
    }
}



