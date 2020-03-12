import React from 'react';
import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import GoalItem from './../components/GoalItem';
import DateTimePicker from "../components/DateTimePicker";
import TestGoal from "../components/TestGoalSubmit";

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
                {/*<GoalItem title="my hardcoded goal" description="my hardcoded description"/>*/}
                {/*<DateTimePicker startDate={true}/>*/}
                <TestGoal/>
            </IonContent>
        </IonPage>
    );
};

export default Home;
