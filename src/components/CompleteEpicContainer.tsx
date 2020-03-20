import React, {useState, useEffect} from "react";
import './GoalContainer.css';
import {selectAllCompletedEpics} from "../Stitch/StitchGoals";
import {IonAlert} from "@ionic/react";
import EpicItem from "./EpicItem";

// TODO see if I can get this to work with goals state object

const CompletedEpicContainer: React.FC = () => {
    const [epics, setEpics] = useState<any>();
    const [showAlert1, setShowAlert1] = useState(false);
    const [isEmptyEpic, setEmptyEpic] = useState<boolean>(false);
    const [epicItemList, setEpicItems] = useState<any>();


    useEffect(() => {
        // query goals for a given user.
        // return all goals to an array
        // map() items in goals array to GoalItem objects
        // set goals state with new array inheriting from IGoalsList
        (async () => {
            try {
                const res = await selectAllCompletedEpics();
                if (res) {
                    if (res.length === 0)
                        setEmptyEpic(true);
                    else {
                        setEpics(JSON.stringify(res));
                        var goalItems = res.map((currEpic: any) => {
                            // seems like a mess waiting to happen
                            var newEpic = {
                                title: currEpic.epicTitle,
                                desc: currEpic.epicDescription,
                                startDate: currEpic.startDate,
                                endDate: currEpic.endDate,
                                goals: currEpic.goals,
                                owner_id: currEpic.owner_id,
                                isComplete: currEpic.isComplete,
                                key: currEpic._id.toString()
                            };
                            return EpicItem(newEpic);
                        });
                        setEpicItems(goalItems);
                    }
                } else {
                    setEmptyEpic(true);
                    setShowAlert1(true);
                }
            } catch (e) {
                if (e instanceof TypeError)
                    console.log("There was a type error. Excepted an array of goals");
                console.log(e);
            }
        })();
    }, [epics, isEmptyEpic]);


    return (
        isEmptyEpic ?
            <div>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <p style={{fontWeight: "bold", fontSize: "20px"}}>No Completed Epics to Show</p>
                </div>
                <IonAlert
                    isOpen={showAlert1}
                    onDidDismiss={() => {
                        setShowAlert1(false);
                    }}
                    header={"Connection Error"}
                    message={"Unable to receive epics at this time."}
                    buttons={["OK"]}
                />
            </div>
            :
            <div>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <p style={{fontWeight: "bold", fontSize: "20px"}}>Completed Epics</p>
                </div>
                {epicItemList}
            </div>
    );
};

export default CompletedEpicContainer;
