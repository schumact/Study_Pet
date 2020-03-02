import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {useStitchAuth} from "./StitchAuth";
import Goals from "./Goals";

// will be the component that a user sees as soon as they login
export default function DashBoard() {
    const {currentUser} = useStitchAuth();
    return (
        <View style={styles.container}>
            <Text> Navbar should be placed up here  NavBar component in Layout.Navbar</Text>
            <Text> My goals should be underneath navbar in Goals component! </Text>
            <Goals>

            </Goals>

        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
});
