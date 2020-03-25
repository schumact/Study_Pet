import React, {useState, useEffect} from "react";
import './GoalContainer.css';
import {IEpic, selectAllIncompleteEpics} from "../Stitch/StitchGoals";
import {IonAlert} from "@ionic/react";
import EpicItem from "./EpicItem";

// TODO see if I can get this to work with goals state object
interface IEpicContainer {
    updaterCount:number
}

const EpicContainer: React.FC<IEpicContainer> = (props:IEpicContainer) => {
    const [epics, setEpics] = useState<any>();
    const [showAlert1, setShowAlert1] = useState(false);
    const [isEmptyEpic, setEmptyEpic] = useState<boolean>(false);
    const [epicItemList, setEpicItems] = useState<any>();
    const [updateForIncrease, setUpdateForIncrease] = useState<number>(props.updaterCount);

    useEffect(() => {
        // query goals for a given user.
        // return all goals to an array
        // map() items in goals array to GoalItem objects
        // set goals state with new array inheriting from IGoalsList
        (async () => {
            setUpdateForIncrease(props.updaterCount);
            try {
                const res = await selectAllIncompleteEpics();
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
                        setEmptyEpic(false);
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
    }, [isEmptyEpic, props.updaterCount]);

    return (
        isEmptyEpic ?
            <div>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <p style={{fontWeight: "bold", fontSize: "20px"}}>No Epics to Show</p>
                    <p>Delete me later. Count of epics is actually {epicItemList ? epicItemList.length : -1}</p>
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
                    <p style={{fontWeight: "bold", fontSize: "20px"}}>My Epics</p>
                </div>
                {epicItemList}
            </div>
    );
};

export default EpicContainer;
