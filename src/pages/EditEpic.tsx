import React, {useContext, useEffect, useState} from "react";
import {authInfo, StitchAuthContext} from "../Stitch/StitchAuth";
import {dateValidation, titleValidation} from "../Util/GoalValidation";
import {
    IonButton,
    IonList,
    IonInput,
    IonItem,
    IonTextarea,
    IonLabel,
    IonAlert,
    IonBackButton, IonButtons, IonContent, IonToolbar, IonHeader, IonPage, IonFab, IonFabButton, IonIcon
} from '@ionic/react';
import '../components/AddGoal.css';
import DateTimePicker from "../components/DateTimePicker";
import {
    completeEpic,
    deleteEpic,
    findEpic,
    getPet,
    updateEpic,
    updatePetPointsFromEpic
} from "../Stitch/StitchGoals";
import {COMPLETE_EPIC_RESULT, DELETE_EPIC_RESULT, DATE_ENUMS, DELETE_GOALS_IN_EPIC_RESULT} from "../Util/Enums";
import {RouteComponentProps, useHistory} from "react-router-dom";
import {checkmarkDoneOutline, trashOutline} from "ionicons/icons";

interface IEditEpic extends RouteComponentProps<{
    id: string;
}> {
}

interface IProps {
    updater?: (val:number) => void;
}

export const EditEpic: React.FC<IEditEpic> = ({match}, props:IProps) => {
    const userInfo: authInfo = useContext(StitchAuthContext);
    const [showAlert2, setShowAlert2] = useState(false);
    const [showAlert3, setShowAlert3] = useState(false);
    const [showAlert4, setShowAlert4] = useState(false);
    const [showAlert5, setShowAlert5] = useState(false);
    const [showAlert6, setShowAlert6] = useState(false);
    const [showAlert7, setShowAlert7] = useState(false);
    const [showAlert8, setShowAlert8] = useState(false);
    const [showAlert9, setShowAlert9] = useState(false);
    const [showAlert10, setShowAlert10] = useState(false);
    const [showAlert11, setShowAlert11] = useState(false);
    const [resultMessage, setResultMessage] = useState();
    const [epic, setEpic] = useState<any>();
    const [pet, setPet] = useState({petPoints: 0, id: ""});
    const history = useHistory();

    const UpdateEpic = () => {
        // TODO add in a check to make sure that end date is after startDate
        const areDatesValid = dateValidation(epic.startDate, epic.endDate);
        const isTitleValid = titleValidation(epic.epicTitle);
        if (areDatesValid && isTitleValid) {
            // already validated points in render and description is optional
            let result: any = updateEpic(match.params.id, epic);
            result.then((res: any) => {
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

    useEffect(() => {
        (async () => {
            const res = await findEpic(match.params.id);
            if (res)
                setEpic(res[0]);
            // set pet
            var my_pet:any = await getPet();
            if (my_pet)
                if (my_pet.length > 0) {
                    setPet({petPoints: my_pet[0].points, id: my_pet[0]._id});
                }
        })();
    }, [pet.petPoints]);

    const updatePet = () => {
        (async() => {
            await updatePetPointsFromEpic(pet.id, pet.petPoints);
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
                        <h1 style={{fontWeight: "bold", textDecoration: "underline"}}>Edit Epic</h1>
                    </div>
                    <br/>
                    <IonItem>
                        <IonInput
                            value={epic?.epicTitle}
                            placeholder="Title"
                            required={true}
                            debounce={750}
                            clearInput={true}
                            minlength={1}
                            maxlength={50}
                            // onIonChange={e => setTitle(e.detail.value!)}
                            onIonChange={e => setEpic({...epic, epicTitle: e.detail.value!})}
                        >
                        </IonInput>
                    </IonItem>
                    <br/>
                    <br/>
                    <br/>
                    <IonItem>
                        <IonLabel position="floating">Description</IonLabel>
                        <IonTextarea
                            value={epic?.epicDescription}
                            placeholder="Please enter your description here"
                            onIonChange={e => setEpic({...epic, epicDescription: e.detail.value!})}>
                        </IonTextarea>
                    </IonItem>
                    <br/>
                    <br/>
                    <DateTimePicker dateType={DATE_ENUMS.start} setDate={setEpic} goalState={epic}/>
                    <br/>
                    <br/>
                    <DateTimePicker dateType={DATE_ENUMS.end} setDate={setEpic} goalState={epic}/>
                    <br/>
                    <br/>
                    <IonButton
                        expand="block"
                        onClick={() => UpdateEpic()}>
                        Edit Epic
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
                        message={DELETE_EPIC_RESULT.error}
                        buttons={["OK"]}
                    />
                    <IonAlert
                        isOpen={showAlert7}
                        onDidDismiss={() => setShowAlert7(false)}
                        header={'Success'}
                        message={DELETE_EPIC_RESULT.pass}
                        buttons={["OK"]}
                    />
                    <IonAlert
                        isOpen={showAlert9}
                        onDidDismiss={() => setShowAlert9(false)}
                        header={'Success'}
                        message={COMPLETE_EPIC_RESULT.pass}
                        buttons={["OK"]}
                    />
                    <IonAlert
                        isOpen={showAlert10}
                        onDidDismiss={() => setShowAlert10(false)}
                        header={'Error'}
                        message={COMPLETE_EPIC_RESULT.fail}
                        buttons={["OK"]}
                    />
                    <IonAlert
                        isOpen={showAlert11}
                        onDidDismiss={() => setShowAlert11(false)}
                        header={'Error'}
                        message={DELETE_GOALS_IN_EPIC_RESULT.fail}
                        buttons={["OK"]}
                    />
                    <IonAlert
                        isOpen={showAlert5}
                        onDidDismiss={() => {
                            setShowAlert5(false);
                            // close modal if the insert was successful
                        }}
                        header={'Delete Epic'}
                        message={"Are you sure that you would like to delete the selected epic? " +
                        "Goals associated with the epic will be deleted as well."}
                        buttons={[{
                            text: "NO",
                            handler: () => {
                                // do nothing
                            }
                        }, {
                            text: "YES",
                            handler: () => {
                                (async () => {
                                    const result = await deleteEpic(epic);
                                    if (result === DELETE_EPIC_RESULT.pass)
                                    {
                                        setShowAlert7(true);
                                        history.goBack();
                                    }
                                    else if (result === DELETE_GOALS_IN_EPIC_RESULT.fail)
                                        setShowAlert11(true);
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
                        header={'Complete Epic'}
                        message={"Click YES to mark this epic as complete."}
                        buttons={[{
                            text: "NO",
                            handler: () => {
                                // do nothing
                            }
                        }, {
                            text: "YES",
                            handler: () => {
                                (async () => {
                                    const result = await completeEpic(epic);
                                    if (result === COMPLETE_EPIC_RESULT.pass) {
                                        updatePet();
                                        setShowAlert9(true);
                                        if (props.updater)
                                            props.updater(1);
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

export default EditEpic;
