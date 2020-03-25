import React, {useEffect, useState} from "react";
import {dateValidation, titleValidation} from "../Util/GoalValidation";
import {useHistory} from "react-router-dom";
import {
    IonButton,
    IonList,
    IonInput,
    IonItem,
    IonTextarea,
    IonLabel,
    IonAlert,
    IonBackButton, IonButtons, IonContent, IonToolbar, IonHeader, IonPage, IonIcon, IonFabButton, IonFab
} from '@ionic/react';
import '../components/AddGoal.css';
import DateTimePicker from "../components/DateTimePicker";
import {findGoal, updateGoal, deleteGoal, completeGoal, getPet, updatePetPointsFromGoal} from "../Stitch/StitchGoals";
import {DATE_ENUMS, UPDATE_GOAL_RESULT, DELETE_GOAL_RESULT, COMPLETE_GOAL_RESULT} from "../Util/Enums";
import {RouteComponentProps} from "react-router-dom";
import {trashOutline, checkmarkDoneOutline} from 'ionicons/icons';

interface IEditGoal extends RouteComponentProps<{
    id: string;
}> {
}

interface IProps {
    updater?: (val:number) => void;
}

export const EditGoal: React.FC<IEditGoal> = ({match}, props:IProps) => {
    const [showAlert1, setShowAlert1] = useState(false);
    const [showAlert2, setShowAlert2] = useState(false);
    const [showAlert3, setShowAlert3] = useState(false);
    const [showAlert4, setShowAlert4] = useState(false);
    const [showAlert5, setShowAlert5] = useState(false);
    const [showAlert6, setShowAlert6] = useState(false);
    const [showAlert7, setShowAlert7] = useState(false);
    const [showAlert8, setShowAlert8] = useState(false);
    const [showAlert9, setShowAlert9] = useState(false);
    const [showAlert10, setShowAlert10] = useState(false);
    const [pet, setPet] = useState({petPoints: 0, id: ""});
    const [resultMessage, setResultMessage] = useState();
    const [goal, setGoal] = useState<any>();
    const history = useHistory();

    const UpdateGoal = () => {
        // TODO add in a check to make sure that end date is after startDate
        const areDatesValid = dateValidation(goal.startDate, goal.endDate);
        const isTitleValid = titleValidation(goal.goalTitle);
        if (areDatesValid && isTitleValid) {
            // already validated points in render and description is optional
            let result: any = updateGoal(match.params.id, goal);
            result.then((res: any) => {
                if (!res)
                    setResultMessage(UPDATE_GOAL_RESULT.fail);
                else
                    setResultMessage(res);
                setShowAlert4(true);
            }).catch((err: any) => {
                setResultMessage(err);
                setShowAlert4(true);
            });
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

    useEffect(() => {
        (async () => {
            const res:any = await findGoal(match.params.id);
            if (res[0])
                setGoal(res[0]);
            var my_pet:any = await getPet();
            if (my_pet)
                if (my_pet.length > 0){
                    setPet({petPoints: my_pet[0].points, id: my_pet[0]._id});
                }
        })();
    }, [pet.petPoints]);

    const updatePet = () => {
        (async() => {
            await updatePetPointsFromGoal(pet.id, pet.petPoints, goal.points);
        })();
    };

    return (
        <IonPage>
            <IonContent>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonBackButton defaultHref="/home" icon="buttonIcon"/>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonList>
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <h1 style={{fontWeight: "bold", textDecoration: "underline"}}>Edit Goal</h1>
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
                        onClick={() => UpdateGoal()}>
                        Edit Goal
                    </IonButton>
                    <IonFab horizontal="end" vertical="top" slot="fixed">
                        <IonFabButton color="danger" onClick={() => setShowAlert5(true)}>
                            <IonIcon icon={trashOutline}/>
                        </IonFabButton>
                    </IonFab>
                    <IonFab horizontal="start" vertical="top" slot="fixed">
                        <IonFabButton color="success" onClick={() => setShowAlert8(true)}>
                            <IonIcon icon={checkmarkDoneOutline}/>
                        </IonFabButton>
                    </IonFab>
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
                        }}
                        header={resultMessage}
                        buttons={["OK"]}
                    />
                    <IonAlert
                        isOpen={showAlert6}
                        onDidDismiss={() => setShowAlert6(false)}
                        header={'Error'}
                        message={DELETE_GOAL_RESULT.error}
                        buttons={["OK"]}
                    />
                    <IonAlert
                        isOpen={showAlert7}
                        onDidDismiss={() => setShowAlert7(false)}
                        header={'Success'}
                        message={DELETE_GOAL_RESULT.pass}
                        buttons={["OK"]}
                    />
                    <IonAlert
                        isOpen={showAlert9}
                        onDidDismiss={() => setShowAlert9(false)}
                        header={'Success'}
                        message={COMPLETE_GOAL_RESULT.pass}
                        buttons={["OK"]}
                    />
                    <IonAlert
                        isOpen={showAlert10}
                        onDidDismiss={() => setShowAlert10(false)}
                        header={'Error'}
                        message={COMPLETE_GOAL_RESULT.error}
                        buttons={["OK"]}
                    />
                    <IonAlert
                        isOpen={showAlert5}
                        onDidDismiss={() => {
                            setShowAlert5(false);
                            // close modal if the insert was successful
                        }}
                        header={'Delete Goal'}
                        message={"Are you sure that you would like to delete the selected goal?"}
                        buttons={[{
                            text: "NO",
                            handler: () => {
                                // do nothing
                            }
                        }, {
                            text: "YES",
                            handler: () => {
                                (async () => {
                                    const result = await deleteGoal(match.params.id);
                                    if (result === DELETE_GOAL_RESULT.pass) {
                                        setShowAlert7(true);
                                        if (props.updater)
                                            props.updater(1);
                                        history.goBack();
                                    }
                                    else
                                        setShowAlert6(true);
                                })();
                            }
                        }]}
                    />
                    <IonAlert
                        isOpen={showAlert8}
                        onDidDismiss={() => {
                            setShowAlert8(false);
                            // close modal if the insert was successful
                        }}
                        header={'Complete Goal'}
                        message={"Click YES to mark this goal as complete."}
                        buttons={[{
                            text: "NO",
                            handler: () => {
                                // do nothing
                            }
                        }, {
                            text: "YES",
                            handler: () => {
                                (async () => {
                                    const result = await completeGoal(match.params.id);
                                    if (result === COMPLETE_GOAL_RESULT.pass)
                                    {
                                        updatePet();
                                        setShowAlert9(true);
                                        history.goBack();
                                    }
                                    else
                                        setShowAlert10(true);
                                })();
                            }
                        }]}
                    />
                </IonList>
            </IonContent>
        </IonPage>
    )
};

export default EditGoal;
