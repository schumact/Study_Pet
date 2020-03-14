import React, {useState, useEffect, useContext} from "react";
import './GoalContainer.css';
import {IGoal} from "../Stitch/StitchGoals";
import GoalItem from "./GoalItem";
import {selectAllGoals} from "../Stitch/StitchGoals";
import {IonAlert, IonList} from "@ionic/react";
import {INSERT_GOAL_RESULT} from "../Util/Enums";

// TODO see if I can get this to work with goals state object
interface IGoalsList {
    goalList: IGoal[],
}


const GoalContainer: React.FC = () => {
    const [goals, setGoals] = useState<any>();
    const [showAlert1, setShowAlert1] = useState(false);
    const [isEmptyGoals, setEmptyGoals] = useState<boolean>(false);
    const [goalItemList, setGoalItems] = useState<any>();


    useEffect(() => {
        // query goals for a given user.
        // return all goals to an array
        // map() items in goals array to GoalItem objects
        // set goals state with new array inheriting from IGoalsList
        // console.log("use effect is this working");

        try {
            selectAllGoals().then(res => {
                if (res)
                    if (res.length === 0)
                        setEmptyGoals(true);
                    else
                    {
                        setGoals(JSON.stringify(res));
                        var goalItems = res.map(currGoal => {
                            console.log("here is the current goal" + currGoal);
                            GoalItem(currGoal)
                        });
                        setGoalItems(goalItems);
                    }
                else
                {
                    setEmptyGoals(true);
                    setShowAlert1(true);
                }
            }).catch(err => {
                console.log(`There was an error fetching goals. ${err}`)
            });
        } catch (e) {
            if (e instanceof TypeError)
                console.log("There was a type error. Excepted an array of goals");
            console.log(e);
        }
    }, [goals, isEmptyGoals]);


    return (
        isEmptyGoals ?
            <div>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <p style={{fontWeight: "bold", fontSize: "20px"}}>Add some goals to help your pet!</p>
                </div>
                <IonAlert
                    isOpen={showAlert1}
                    onDidDismiss={() => {
                        setShowAlert1(false);
                    }}
                    header={"Connection Error"}
                    message={"Unable to receive goals at this time."}
                    buttons={["OK"]}
                />
            </div>
            :
        <div>
            <div style={{display: "flex", justifyContent: "center"}}>
                <p style={{fontWeight: "bold", fontSize: "20px"}}>My Goals</p>
            </div>
            {/*<GoalItem/>*/}
        </div>
    );
};

export default GoalContainer;
