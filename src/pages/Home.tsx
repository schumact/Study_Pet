import React, {useState} from 'react';
import {IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonModal} from '@ionic/react';
import './Home.css';
import GoalItem from './../components/GoalItem';
import GoalContainer from "../components/GoalContainer";
import AddGoal from "../components/AddGoal";

const Home: React.FC = () => {
    const [showModal, setShowModal] = useState<boolean>(false);

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
                    <AddGoal/>
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
                    Create New Goal!
                </IonButton>
                <GoalContainer/>
            </IonContent>
        </IonPage>
    );
};

export default Home;
