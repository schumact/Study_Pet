import React, { Component } from 'react';
import { TextInput, Text, View, Button, Alert } from 'react-native';
import styles from "../Misc/Styles.js";
import Aux from "../../hoc/auxiliary";

// TODO create state object later and include these values

function Separator () {
    return <View style={styles.seperator}></View>;
}

export default class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password:""
        };
    }

    onChangeUsernameText = (text) =>
    {
        this.setState({username: text});
    }

    onChangePasswordText = (text) =>
    {
        this.setState({password:text})
    }

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
                        value={this.state.username}
                        onChangeText={this.onChangeUsernameText}>
                    </TextInput>
                    <Separator/>
                    <Text>Password</Text>
                    <TextInput 
                        style={styles.textInp}
                        value={this.state.password}
                        onChangeText={this.onChangePasswordText}
                        secureTextEntry={true}>
                    </TextInput>
                    <Separator/>
                    <View style={styles.login_btn_comp}>
                        <Button
                            title="Login"
                            color="#80ffbf"
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



