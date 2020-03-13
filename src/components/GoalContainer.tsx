import React, {useState, useEffect, useContext} from "react";
import './GoalContainer.css';
import {StitchAuthContext, authInfo} from "../Stitch/StitchAuth";
import {IGoal} from "../Stitch/StitchGoals";
import GoalItem from "./GoalItem";
import { IonContent } from "@ionic/react";

interface IGoalsList {
    goalList: IGoal[],
}


const GoalContainer: React.FC = () => {
    const userInfo:authInfo = useContext(StitchAuthContext);
    const [goals, setGoals] = useState<IGoalsList>();

    useEffect(() => {
        // query goals for a given user.
        // return all goals to an array
        // map() items in goals array to GoalItem objects
        // set goals state with new array inheriting from IGoalsList
        console.log("use effect is this working")
    }, [goals]);


    return (
        <IonContent>
            <div style={{display:"flex", justifyContent:"center"}}>
                <p style={{ fontWeight:"bold", fontSize: "20px"}}>My Goals</p>
            </div>
            <GoalItem/>
        </IonContent>
    );
};

export default GoalContainer;
