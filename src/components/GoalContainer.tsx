import React, {useState, useEffect} from "react";
import './GoalContainer.css';
import GoalItem from "./GoalItem";
import {selectAllGoals} from "../Stitch/StitchGoals";
import {IonAlert} from "@ionic/react";

// TODO see if I can get this to work with goals state object

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
        (async () => {
            try {
                const res = await selectAllGoals();
                if (res)
                    if (res.length === 0)
                        setEmptyGoals(true);
                    else
                    {
                        setGoals(JSON.stringify(res));
                        var goalItems = res.map((currGoal:any) => {
                            // seems like a mess waiting to happen
                            var newGoal = {title: currGoal.goalTitle, desc:currGoal.goalDescription,
                                startDate:currGoal.startDate, endDate:currGoal.endDate, points:currGoal.points,
                            owner_id: currGoal.owner_id, isComplete:currGoal.isComplete, key:currGoal._id.toString()};
                            return GoalItem(newGoal);
                        });
                        setGoalItems(goalItems);
                    }
                else
                {
                    setEmptyGoals(true);
                    setShowAlert1(true);
                }
            } catch (e) {
                if (e instanceof TypeError)
                    console.log("There was a type error. Excepted an array of goals");
                console.log(e);
            }
        })();
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
            {goalItemList}
        </div>
    );
};

export default GoalContainer;
