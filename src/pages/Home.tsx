import React from 'react';
import {IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import './Home.css';
import GoalItem from './../components/GoalItem';
import TestGoal from "../components/TestGoalSubmit";
import GoalContainer from "../components/GoalContainer";
import DateTimePicker from "../components/DateTimePicker";
import AddGoal from "../components/AddGoal";

const Home: React.FC = () => {
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
                {/*<IonButton onClick={}>*/}
                {/*    New Goal*/}
                {/*</IonButton>*/}
                {/*<DateTimePicker startDate={true} dateValue={undefined}/>*/}
                <AddGoal/>
                <GoalContainer/>
            </IonContent>
        </IonPage>
    );
};

export default Home;
