import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import DatePick from "./Util/DatePick";

// TODO Right now everything is being set manually through props
// When goals are grabbed from the db, values that GoalItem
// components use will have to be set differently.

export default function GoalItem(props) {
    // may not be able to set this up right if all
    // goals are being supplied directly from db.
    // my only thought is that the stitch function
    // would need to handle setting props.style based
    // on certain conditions
    let style;
    switch (props.style) {
        case "DueToday":
            style = styles.DueToday;
            break;
        case "InProgress":
            style = styles.DueToday;
            break;
        case "Completed":
            style = styles.DueToday;
            break;
        case "Suspended":
            style = styles.DueToday;
            break;
    }


    return (
            <View style={style}>
                {/*  Design for how a goal should look still needs to be made.
                This will be largely dependent on whatever the schema for a
                goal looks like in mongo
                A goal should have:
                Title:
                Description:
                Start Date:
                Due Date:

                Maybe different type of goals so that you can add child goals.
                ***NOTE Epic component should do this. Unless more customization is needed
                there may not need to be different types of goals
                */}
                {/* TODO if a user clicks a button to edit, make all the textInput components editable=true*/}
                <Text> Title: </Text>
                <TextInput style={styles.InputBoxes} editable={false}> {props.title}</TextInput>
                <Text> Description: </Text>
                <TextInput style={styles.InputBoxes} editable={false}> {props.description}</TextInput>
                {/* TODO Assuming DatePicker will fail and will need tweaking*/}
                <Text> Start Date: </Text>
                <DatePick startDate = {props.startDate}/>
                {/* <TextInput style={styles.InputBoxes} editable={false}> {props.startDate}</TextInput> */}
                <Text> Due Date: </Text>
                <DatePick endDate = {props.endDate}/>
                {/*  <TextInput style={styles.InputBoxes} editable={false}> {props.dueDate}</TextInput>  */}
                {/* TODO Importance value? Something to weight the importance of goal. Add it? Don't need it?*/}
            </View>
        )
}

const styles = StyleSheet.create({
    DueToday: {
        flex: 1,
        backgroundColor: 'blue'
    },
    InProgress: {
        flex: 2
    },
    Completed: {
        flex: 3,
        backgroundColor: "green"
    },
    Suspended: {
        flex: 4,
        backgroundColor: "red"
    },
    InputBoxes: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 2,
        marginBottom: 10
    }
});