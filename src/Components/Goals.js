import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import {useStitchAuth} from "./StitchAuth";
import GoalItem from "./GoalItem";
import TouchableOpacity from "react-native-web/src/exports/TouchableOpacity";

export default function Goals() {
    // these goals will be retrieved from db. There should be some sort of ORM ability from data in db
    // const [goals, setPeople] = useState([
    //     {goal: <GoalItem title="title 1" description="desc1" startDate="2020-03-01" endDate="2020-03-20"/>, id: "1"},
    //     {goal: <GoalItem title="title 2" description="desc2" startDate="2020-03-04" endDate="2020-03-25"/>, id: "1"},
    // ]);
    // HERE is what I was thinking about using GoalItem components in a FlatList. I was wrong, turns out you cannot do.
    // SO, fetching data from db, shoving into goals as key: value and displaying in TouchOpacity should work fine

    // TODO pull this info from db and populate state. Look at useEffect
    const [goals, setGoals] = useState([
        {title: "goal 1", status: "DueToday", id: "1"},
        {title: "goal 2", status: "InProgress", id: "2"},
    ]);

    // use useEffect to fetch goals from db
    useEffect(() => {
       // Do fetching of goals here and set state with goals retrieved from db
        // TODO write db query to fetch all of a user's goals from db
        console.log("Fetching goals from db and using them to set state.")
    });

    // TODO Need some sort of function to grab all goals
    // from db and for each goal, have a value set specifying
    // the type of goal. The names should match with the key names
    // in styles object in ./GoalItem.js . Grab x amount of goals,
    // create component for each goal, add them in a list
    // and put them in this container
    const {currentUser} = useStitchAuth();
    return (
            <View>
                <Text> Here are my fake goals for now! </Text>
                <FlatList
                    keyExtractor={item => item.id}
                    data={goals}
                    renderItem={({item}) => (
                        <GoalItem item={item}/>
                    )}
                />
            </View>
        )
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        paddingTop: 40,
        paddingHorizontal: 20
    }
});
