import {Text, View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.bar = 10;
        this.state = {
            username: "",
            password: ""
        };
    };

    change_bar = () => {
        alert(`${this.bar} is bar value`);
    };

    render() {
        return (
            <View style = {{flex: 1}}>
                <View style = {{flex:2}}>
                    <Text>TODO: An Image needs to be placed here of a pet or something</Text>
                </View>
                <View style={{flex: 2, backgroundColor: "#F75449"}}>
                    <View style={styles.signIn}>
                        <Text>Username: </Text>
                        <TextInput style={styles.textBox}
                                   placeholder="Enter username"
                                   onChangeText={(text) => {this.setState({...this.state, username: text});}}
                                   value={this.state.username}/>
                    </View>
                    <View style={styles.signIn}>
                        <Text>Password: </Text>
                        <TextInput style={styles.textBox}
                                   placeholder="Enter password"
                                   onChangeText={(text) => {this.setState({...this.state, password: text});}}
                                   value={this.state.password}/>
                    </View>
                    <View style={styles.login}>
                        <TouchableOpacity style={styles.button} onPress={() => {alert(this.state.username +
                            " logging in with password: " + this.state.password);}}>
                            <Text>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style = {styles.noAccount}>
                    <Text style = {styles.h2}>Don't have an account???</Text>
                        <TouchableOpacity style={styles.button} onPress={this.change_bar}>
                            <Text>Create Account</Text>
                        </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create(
    {
        bigBlue: {
            color: 'blue',
            fontWeight: 'bold',
            fontSize: 30,
        },
        red: {
            color: 'red',
        },
        h2: {
            fontSize: 25,
            fontWeight: "bold",
        },
        noAccount: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#59C2F3",
        },
        login: {
            flex: 4,
            alignItems: "center",
            justifyContent: "center",
        },
        signIn : {
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center"
        },
        textBox: {
            height: 35,
            margin: 5,
            borderRadius: 10,
            width: "50%",
            borderColor: "black",
            borderWidth: 2,
            backgroundColor: "#FFFFFF"
        },
        button: {
            alignItems: "center",
            color: "black",
            backgroundColor: "#FFFFFF",
            padding: 10,
            borderWidth: 2,
            width: "70%",
            borderRadius: 20,
            margin: 20,
        }
    }
);