import React, {useContext, useEffect, useState} from "react";
import {authInfo, StitchAuthContext} from "../Stitch/StitchAuth";
import {
    IonButton,
    IonList,
    IonInput,
    IonItem,
    IonTextarea,
    IonLabel,
    IonAlert
} from '@ionic/react';
import './AddGoal.css';
import {addGoalToEpic, IGoal, insertGoalForEpic} from "../Stitch/StitchGoals";
import DateTimePicker from "./DateTimePicker";
import {insertGoal, findEpic} from "../Stitch/StitchGoals";
import {DATE_ENUMS, INSERT_GOAL_RESULT} from "../Util/Enums";
import {dateValidation, titleValidation} from "../Util/GoalValidation";
import {BSON} from 'mongodb-stitch-browser-sdk';

interface INewGoal {
    modalHandler: (isOpen: boolean) => void;
    isUsedByEpic?: boolean;
    epicId?: string;
    updater?: (val:number) => void;
}

// TODO add in refresh for GoalContainer after a goal is successfully added

export const AddGoal: React.FC<INewGoal> = (props: INewGoal) => {
    const userInfo: authInfo = useContext(StitchAuthContext);
    const [showAlert1, setShowAlert1] = useState(false);
    const [showAlert2, setShowAlert2] = useState(false);
    const [showAlert3, setShowAlert3] = useState(false);
    const [showAlert4, setShowAlert4] = useState(false);
    const [showAlert5, setShowAlert5] = useState(false);
    const [resultMessage, setResultMessage] = useState();
    const [isApproved, setIsApproved] = useState(true);
    const [epicStartDate, setEpicStartDate] = useState();
    const [epicEndDate, setEpicEndDate] = useState();
    const [goal, setGoal] = useState<Partial<IGoal>>({
        points: 1,
        isInEpic: false,
        owner_id: userInfo.currentUser.id,
        isComplete: false,
        isExpired: false,
        last_updated: new Date()
    });

    const createGoal = async () => {
        // TODO add in a check to make sure that end date is after startDate
        const areDatesValid = dateValidation(goal.startDate, goal.endDate);
        const isTitleValid = titleValidation(goal.goalTitle);
        if (areDatesValid && isTitleValid) {
            // already validated points in render and description is optional
            if (props.isUsedByEpic) {
                const isValidStartDate = dateValidation(epicStartDate, goal.startDate);
                const isValidEndDate = dateValidation(goal.endDate, epicEndDate);
                if (!isValidStartDate || !isValidEndDate) {
                    setShowAlert5(true);
                } else {
                    let result: Promise<string> = insertGoalForEpic(goal);
                    result.then(res => {
                        return addGoalToEpic(props.epicId, res);
                        // setResultMessage(res);
                        // setShowAlert4(true);
                    }).then(res => {
                        setResultMessage(res);
                        if (props.updater)
                            props.updater(1);
                        setShowAlert4(true);
                    }).catch(err => {
                        setResultMessage(err);
                        setShowAlert4(true);
                    });
                    // TODO add ObjectId(goalId) to the epic's array of goals
                }
            } else {
                let result: Promise<string> = insertGoal(goal);
                result.then(res => {
                    setResultMessage(res);
                    if (props.updater)
                        props.updater(1);
                    setShowAlert4(true);
                }).catch(err => {
                    setResultMessage(err);
                    setShowAlert4(true);
                });
            }
        } else {
            if (!isTitleValid)
                setShowAlert3(true);
            else
                setShowAlert2(true);
        }
    };

    const validatePoints = (points: number) => {
        const pointValues = [1, 2, 3, 4, 5];
        if (pointValues.includes(points))
            setGoal({...goal, points: points});
        else {
            setShowAlert1(true);
        }
    };

    console.log("FROM add goal props updater ", props.updater);

    useEffect(() => {
        (async () => {
            if (props.isUsedByEpic && props.epicId) {
                const epic:any = await findEpic(props.epicId);
                // verify the dates are valid
                if (epic) {
                    setEpicStartDate(epic[0].startDate);
                    setEpicEndDate(epic[0].endDate);
                    const epicObjId = new BSON.ObjectId(props.epicId);
                    setGoal({...goal, isInEpic: props.isUsedByEpic, epicId: epicObjId});
                }
            }
        })();
    }, []);

    return (
        <IonList>
            <div style={{display: "flex", justifyContent: "center"}}>
                <h1 style={{fontWeight: "bold", textDecoration: "underline"}}>Goal Creator</h1>
            </div>
            <br/>
            <IonItem>
                <IonInput
                    value={goal?.goalTitle}
                    placeholder="Title"
                    required={true}
                    debounce={750}
                    clearInput={true}
                    minlength={1}
                    maxlength={50}
                    // onIonChange={e => setTitle(e.detail.value!)}
                    onIonChange={e => setGoal({...goal, goalTitle: e.detail.value!})}
                >
                </IonInput>
            </IonItem>
            <br/>
            <br/>
            <IonItem>
                <IonLabel position="floating">Description</IonLabel>
                <IonTextarea
                    value={goal?.goalDescription}
                    placeholder="Please enter your description here"
                    onIonChange={e => setGoal({...goal, goalDescription: e.detail.value!})}>
                </IonTextarea>
            </IonItem>
            <IonItem>
                <IonLabel position="floating">Point Value. Enter a goal value of 1 -5.</IonLabel>
                <IonInput
                    value={goal?.points || 1}
                    placeholder="Enter value of goal. 1 through 5"
                    required={true}
                    type="number"
                    debounce={750}
                    clearInput={true}
                    minlength={1}
                    maxlength={50}
                    onIonChange={e => validatePoints(parseInt(e.detail.value!))}>
                </IonInput>
            </IonItem>
            <br/>
            <br/>
            <DateTimePicker dateType={DATE_ENUMS.start} setDate={setGoal} goalState={goal}/>
            <br/>
            <br/>
            <DateTimePicker dateType={DATE_ENUMS.end} setDate={setGoal} goalState={goal}/>
            <br/>
            <br/>
            <IonButton
                expand="block"
                onClick={async () => createGoal()}>
                Add Goal
            </IonButton>
            <IonAlert
                isOpen={showAlert1}
                onDidDismiss={() => setShowAlert1(false)}
                header={'Point Error'}
                message={"A goal's point value must be either 1, 2, 3, 4 or 5."}
                buttons={["OK"]}
            />
            <IonAlert
                isOpen={showAlert2}
                onDidDismiss={() => setShowAlert2(false)}
                header={'Date Error'}
                message={"A start and end date must be selected and the start date must be before " +
                "the end date"}
                buttons={["OK"]}
            />
            <IonAlert
                isOpen={showAlert3}
                onDidDismiss={() => setShowAlert3(false)}
                header={'Title Error'}
                message={"Please make sure that you input a title and it is less than 30 characters long."}
                buttons={["OK"]}
            />
            <IonAlert
                isOpen={showAlert4}
                onDidDismiss={() => {
                    setShowAlert4(false);
                    // close modal if the insert was successful
                    if (resultMessage === INSERT_GOAL_RESULT.pass) {
                        props.modalHandler(false);
                    }
                }}
                header={resultMessage}
                buttons={["OK"]}
            />
            <IonAlert
                isOpen={showAlert5}
                onDidDismiss={() => setShowAlert5(false)}
                header={'Date Error'}
                message={"Please make sure that the goal's start and end dates fall between the epic's " +
                "start and dates."}
                buttons={["OK"]}
            />
        </IonList>
    )
};

export default AddGoal;
