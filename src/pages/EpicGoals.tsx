import React, {useState} from 'react';
import {
    IonButton,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonModal,
    IonButtons,
    IonBackButton
} from '@ionic/react';
import './Home.css';
import GoalContainer from "../components/GoalContainer";
import AddGoal from "../components/AddGoal";
import {RouteComponentProps} from "react-router-dom";

interface IEditGoals extends RouteComponentProps<{
    id: string;
}> {
}

const EpicGoals: React.FC<IEditGoals> = ({match}) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    // TODO do I need a goal successfully added state in here or something to make
    // sure that the component rerenders on added goals. I want GoalContainer to rerender

    return (
        <IonPage>
            <IonContent>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonBackButton defaultHref="/home" icon="buttonIcon"/>
                        </IonButtons>
                        <IonTitle>Epic Goal Viewer</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonModal isOpen={showModal}>
                    <AddGoal modalHandler={setShowModal} isUsedByEpic={true} epicId={match.params.id}/>
                    <IonButton
                        color="danger"
                        onClick={() => setShowModal(false)}
                        expand="block">
                        Close
                    </IonButton>
                </IonModal>
                <br/>
                <IonButton
                    expand="block"
                    onClick={() => setShowModal(true)}>
                    Add New Goal!
                </IonButton>
                <br/>
                <GoalContainer isUsedByEpic={true} epicId={match.params.id}/>
            </IonContent>
        </IonPage>
    );
};

export default EpicGoals;
