import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity } from 'react-native';
import DatePick from "../Util/DatePick";

// TODO Right now everything is being set manually through props
// When goals are grabbed from the db, values that GoalItem
// components use will have to be set differently.

export default function GoalItem({item}) {
    // may not be able to set this up right if all
    // goals are being supplied directly from db.
    // my only thought is that the stitch function
    // would need to handle setting props.style based
    // on certain conditions
    let goalStyle;
    switch (item.status) {
        case "DueToday":
            goalStyle = styles.DueToday;
            break;
        case "InProgress":
            goalStyle = styles.DueToday;
            break;
        case "Completed":
            goalStyle = styles.DueToday;
            break;
        case "Suspended":
            goalStyle = styles.DueToday;
            break;
    }


    return (
        <TouchableOpacity style={goalStyle}>
            <Text>{item.title}</Text>
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
    DueToday: {
        backgroundColor: "#ff6347",
        borderWidth: 1,
        borderRadius: 5,
        paddingTop: 20,
        paddingBottom: 20,
        marginTop: 10,
        textAlign: "center"
    },
    InProgress: {
        backgroundColor: "#6495ed",
        borderWidth: 1,
        borderRadius: 5,
        paddingTop: 20,
        paddingBottom: 20,
        marginTop: 10,
        textAlign: "center"
    },
    Completed: {
        backgroundColor: "#90ee90",
        borderWidth: 1,
        borderRadius: 5,
        paddingTop: 20,
        paddingBottom: 20,
        marginTop: 10,
        textAlign: "center"
    },
    Suspended: {
        backgroundColor: "#dc143c",
        borderWidth: 1,
        borderRadius: 5,
        paddingTop: 20,
        paddingBottom: 20,
        marginTop: 10,
        textAlign: "center"
    },
    InputBoxes: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 2,
        marginBottom: 10
    }
});