import React, {useEffect, useRef, useState} from "react";
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
import StudyPetService from '../Util/GlobalSingleton';

interface IEditEpic extends RouteComponentProps<{
    id: string;
}> {
}

export const EditEpic: React.FC<IEditEpic> = ({match}) => {
    const isMounted = useRef(true);
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
                isMounted.current && setResultMessage(res);
                isMounted.current && setShowAlert4(true);
            }).catch((err: any) => {
                isMounted.current && setResultMessage(err);
                isMounted.current && setShowAlert4(true);
            });
        } else {
            if (!isTitleValid)
                isMounted.current && setShowAlert3(true);
            else
                isMounted.current && setShowAlert2(true);
        }
    };

    useEffect(() => {
            (async () => {
                const res:any = await findEpic(match.params.id);
                if (res[0]) {
                    isMounted.current && setEpic(res[0]);
                }
                // set pet
                var my_pet:any = await getPet();
                if (my_pet)
                    if (my_pet.length > 0) {
                        isMounted.current && setPet({petPoints: my_pet[0].points, id: my_pet[0]._id});
                    }
            })();
        }, [pet.petPoints]
    );

    useEffect(() => {
       return () => {isMounted.current = false}
    }, []);

    const updatePet = async () => {
        await updatePetPointsFromEpic(pet.id, pet.petPoints);
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
                            onIonChange={e => isMounted.current && setEpic({...epic, epicTitle: e.detail.value!})}
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
                            onIonChange={e => isMounted.current && setEpic({...epic, epicDescription: e.detail.value!})}>
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
                        <IonFabButton color="danger" onClick={() => isMounted.current && setShowAlert5(true)}>
                            <IonIcon icon={trashOutline}/>
                        </IonFabButton>
                    </IonFab>
                    <IonFab horizontal="start" vertical="top" slot="fixed">
                        <IonFabButton color="success" onClick={() => isMounted.current && setShowAlert8(true)}>
                            <IonIcon icon={checkmarkDoneOutline}/>
                        </IonFabButton>
                    </IonFab>
                    <IonAlert
                        isOpen={showAlert2}
                        onDidDismiss={() => isMounted.current && setShowAlert2(false)}
                        header={'Date Error'}
                        message={"A start and end date must be selected and the start date must be before " +
                        "the end date"}
                        buttons={["OK"]}
                    />
                    <IonAlert
                        isOpen={showAlert3}
                        onDidDismiss={() => isMounted.current && setShowAlert3(false)}
                        header={'Title Error'}
                        message={"Please make sure that you input a title and it is less than 30 characters long."}
                        buttons={["OK"]}
                    />
                    <IonAlert
                        isOpen={showAlert4}
                        onDidDismiss={() => {
                            isMounted.current && setShowAlert4(false);
                            history.goBack();
                        }}
                        header={resultMessage}
                        buttons={["OK"]}
                    />
                    <IonAlert
                        isOpen={showAlert6}
                        onDidDismiss={() => isMounted.current && setShowAlert6(false)}
                        header={'Error'}
                        message={DELETE_EPIC_RESULT.error}
                        buttons={["OK"]}
                    />
                    <IonAlert
                        isOpen={showAlert7}
                        onDidDismiss={() => isMounted.current && setShowAlert7(false)}
                        header={'Success'}
                        message={DELETE_EPIC_RESULT.pass}
                        buttons={["OK"]}
                    />
                    <IonAlert
                        isOpen={showAlert9}
                        onDidDismiss={() => isMounted.current && setShowAlert9(false)}
                        header={'Success'}
                        message={COMPLETE_EPIC_RESULT.pass}
                        buttons={["OK"]}
                    />
                    <IonAlert
                        isOpen={showAlert10}
                        onDidDismiss={() => isMounted.current && setShowAlert10(false)}
                        header={'Error'}
                        message={COMPLETE_EPIC_RESULT.fail}
                        buttons={["OK"]}
                    />
                    <IonAlert
                        isOpen={showAlert11}
                        onDidDismiss={() => isMounted.current && setShowAlert11(false)}
                        header={'Error'}
                        message={DELETE_GOALS_IN_EPIC_RESULT.fail}
                        buttons={["OK"]}
                    />
                    <IonAlert
                        isOpen={showAlert5}
                        onDidDismiss={() => {
                            isMounted.current && setShowAlert5(false);
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
                                    // const x = await deleteAllGoalsInEpic(epic);
                                    const result = await deleteEpic(epic);
                                    // if (1 === 1){
                                    if (result === DELETE_EPIC_RESULT.pass) {
                                        isMounted.current && setShowAlert7(true);
                                        StudyPetService.sendAppEvent({increment: 0});
                                        history.goBack();
                                    }
                                    else
                                        isMounted.current && setShowAlert6(true);
                                })();
                            }
                        }]}
                    />
                    <IonAlert
                        isOpen={showAlert8}
                        onDidDismiss={() => {
                            isMounted.current && setShowAlert8(false);
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
                                        await updatePet();
                                        isMounted.current && setShowAlert9(true);
                                        StudyPetService.sendAppEvent({increment: 2});
                                        history.goBack();
                                    } else
                                        isMounted.current && setShowAlert10(true);
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
