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
    IonBackButton, IonButtons, IonContent, IonToolbar, IonHeader, IonPage
} from '@ionic/react';
import '../components/AddGoal.css';
import DateTimePicker from "../components/DateTimePicker";
import {findEpic, updateEpic} from "../Stitch/StitchGoals";
import {DATE_ENUMS} from "../Util/Enums";
import {RouteComponentProps} from "react-router-dom";

interface UserDetailPageProps extends RouteComponentProps<{
    id: string;
}> {
}

export const EditEpic: React.FC<UserDetailPageProps> = ({match}) => {
    const userInfo: authInfo = useContext(StitchAuthContext);
    const [showAlert2, setShowAlert2] = useState(false);
    const [showAlert3, setShowAlert3] = useState(false);
    const [showAlert4, setShowAlert4] = useState(false);
    const [resultMessage, setResultMessage] = useState();
    const [epic, setEpic] = useState<any>();

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
        })();
    }, []);

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
                    <IonBackButton/>
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
                </IonList>
            </IonContent>
        </IonPage>
    )
};

export default EditEpic;
