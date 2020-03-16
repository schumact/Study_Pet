import React, {useContext, useState} from "react";
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
import {IGoal} from "../Stitch/StitchGoals";
import DateTimePicker from "./DateTimePicker";
import {insertGoal} from "../Stitch/StitchGoals";
import {DATE_ENUMS, INSERT_EPIC_RESULT} from "../Util/Enums";
import {dateValidation, titleValidation} from "../Util/GoalValidation";

interface INewEpic {
    modalHandler: (isOpen: boolean) => void
}
// TODO add in refresh for GoalContainer after a goal is successfully added

export const AddEpic:React.FC<INewEpic> = (props:INewEpic) => {
    const userInfo: authInfo = useContext(StitchAuthContext);
    const [showAlert1, setShowAlert1] = useState(false);
    const [showAlert2, setShowAlert2] = useState(false);
    const [showAlert3, setShowAlert3] = useState(false);
    const [showAlert4, setShowAlert4] = useState(false);
    const [resultMessage, setResultMessage] = useState();
    const [epic, setEpic] = useState<Partial<IGoal>>({points: 1,
        owner_id:userInfo.currentUser.id, isComplete: false});

    const createGoal = () => {
        // TODO add in a check to make sure that end date is after startDate
        const areDatesValid = dateValidation(epic.startDate, epic.endDate);
        const isTitleValid = titleValidation(epic.goalTitle);
        if (areDatesValid && isTitleValid){
            // already validated points in render and description is optional
            let result:Promise<string> = insertGoal(epic);
            result.then(res => {
                setResultMessage(res);
                setShowAlert4(true);
            }).catch(err => {
                setResultMessage(err);
                setShowAlert4(true);
            });
        }
        else
        {
            if (!isTitleValid)
                setShowAlert3(true);
            else
                setShowAlert2(true);
        }
    };

    return (
        <IonList>
            <div style={{display: "flex", justifyContent: "center"}}>
                <h1 style={{fontWeight: "bold", textDecoration: "underline"}}>Create Epic</h1>
            </div>
            <br/>
            <IonItem>
                <IonInput
                    value={epic?.goalTitle}
                    placeholder="Title"
                    required={true}
                    debounce={750}
                    clearInput={true}
                    minlength={1}
                    maxlength={50}
                    // onIonChange={e => setTitle(e.detail.value!)}
                    onIonChange={e => setEpic({...epic, goalTitle: e.detail.value!})}
                >
                </IonInput>
            </IonItem>
            <br/>
            <br/>
            <br/>
            <IonItem>
                <IonLabel position="floating">Description</IonLabel>
                <IonTextarea
                    value={epic?.goalDescription}
                    placeholder="Please enter your description here"
                    onIonChange={e => setEpic( {...epic, goalDescription: e.detail.value!})}>
                </IonTextarea>
            </IonItem>
            <br/>
            <br/>
            <br/>
            <DateTimePicker dateType={DATE_ENUMS.start} setDate={setEpic} goalState={epic}/>
            <br/>
            <br/>
            <br/>
            <DateTimePicker dateType={DATE_ENUMS.end} setDate={setEpic} goalState={epic}/>
            <br/>
            <br/>
            <br/>
            <IonButton
                expand="block"
                onClick={() => createGoal()}>
                Add Epic
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
                    if (resultMessage === INSERT_EPIC_RESULT.pass)
                        props.modalHandler(false);
                }}
                header={resultMessage}
                buttons={["OK"]}
            />
        </IonList>
    )
};

export default AddEpic;
