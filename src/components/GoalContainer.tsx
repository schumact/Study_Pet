import React, {useState, useEffect} from "react";
import './GoalContainer.css';
import GoalItem from "./GoalItem";
import {selectAllIncompleteGoals, selectGoalsForEpic} from "../Stitch/StitchGoals";

interface IGoalContainer {
    isUsedByEpic?: boolean;
    epicId?: string;
    updaterCount:number;
    updater?: (val:number) => void;
}

const GoalContainer: React.FC<IGoalContainer> = (props: IGoalContainer) => {
    const [goals, setGoals] = useState<any>();
    const [isEmptyGoals, setEmptyGoals] = useState<boolean>(false);
    const [goalItemList, setGoalItems] = useState<any>();
    const [updateForIncrease, setUpdateForIncrease] = useState<number>(props.updaterCount);

    useEffect(() => {
        // query goals for a given user.
        // return all goals to an array
        // map() items in goals array to GoalItem objects
        // set goals state with new array inheriting from IGoalsList
        (async () => {
            setUpdateForIncrease(props.updaterCount);
            try {
                let res: any;
                if (props.isUsedByEpic) {
                    if (props.epicId){
                        res = await selectGoalsForEpic(props.epicId);
                    }
                } else
                    res = await selectAllIncompleteGoals();
                if (res) {
                    if (res.length === 0)
                        setEmptyGoals(true);
                    else {
                        setGoals(JSON.stringify(res));
                        var goalItems = res.map((currGoal: any) => {
                            // seems like a mess waiting to happen
                            var newGoal = {
                                title: currGoal.goalTitle,
                                desc: currGoal.goalDescription,
                                startDate: currGoal.startDate,
                                endDate: currGoal.endDate,
                                points: currGoal.points,
                                owner_id: currGoal.owner_id,
                                isComplete: currGoal.isComplete,
                                key: currGoal._id.toString()
                            };
                            return GoalItem(newGoal);
                        });
                        setGoalItems(goalItems);
                        setEmptyGoals(false);
                    }
                } else {
                    setEmptyGoals(true);
                }
            } catch (e) {
                if (e instanceof TypeError)
                    console.log("There was a type error. Excepted an array of goals");
                console.log(e);
            }
        })();
    }, [goals, isEmptyGoals, props.updaterCount]);

    return (
        isEmptyGoals ?
            <div>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <p style={{fontWeight: "bold", fontSize: "20px"}}>Add some goals to help your pet!</p>
                </div>
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
