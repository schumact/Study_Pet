import React, {useState} from 'react';
import {IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonModal} from '@ionic/react';
import './Home.css';
import GoalContainer from "../components/GoalContainer";
import AddGoal from "../components/AddGoal";
import AddEpic from "../components/AddEpic";
import EpicContainer from "../components/EpicContainer";

const Home: React.FC = () => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showModal2, setShowModal2] = useState<boolean>(false);
    // TODO do I need a goal successfully added state in here or something to make
    // sure that the component rerenders on added goals. I want GoalContainer to rerender

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Home</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Home</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonModal isOpen={showModal}>
                    <AddGoal modalHandler={setShowModal}/>
                    <IonButton
                        color="danger"
                        onClick={() => setShowModal(false)}
                        expand="block">
                        Close
                    </IonButton>
                </IonModal>
                <IonModal isOpen={showModal2}>
                    <AddEpic modalHandler={setShowModal2}/>
                    <IonButton
                        color="danger"
                        onClick={() => setShowModal2(false)}
                        expand="block">
                        Close
                    </IonButton>
                </IonModal>
                <br/>
                <IonButton
                    expand="block"
                    onClick={() => setShowModal(true)}>
                    Create New Goal!
                </IonButton>
                <br/>
                <IonButton
                    expand="block"
                    color="secondary"
                    onClick={() => setShowModal2(true)}>
                    Create New Epic!
                </IonButton>
                <br/>
                <IonButton
                    expand="block"
                    color="tertiary"
                    href={"/completed_view"}
                    onClick={() => console.log("replace this with a page")}>
                    View Completed Goals and Epics
                </IonButton>
                <GoalContainer/>
                <EpicContainer/>
            </IonContent>
        </IonPage>
    );
};

export default Home;
