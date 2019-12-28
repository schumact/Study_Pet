import React, { Component } from "react";
import {View} from "react-native";
import styles from "../Misc/Styles.js";
import Aux from "../../hoc/auxiliary";
import Login from '../Login/Login';


export default class Layout extends Component {
    // style={styles.root_flex} should be on View for sytle
    render() {
        return (
            // <View style={styles.root_flex}> 
            <View style={{flex:1}}> 
               <Login/>
            </View>
        )
    }
}