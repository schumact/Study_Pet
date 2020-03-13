import React, {useContext} from 'react';
import {IonButton, IonContent} from '@ionic/react';
import {IGoal, IActualTestGoal, insertGoal, insertTestGoal} from "../Stitch/StitchGoals";
import {StitchAuthContext} from "../Stitch/StitchAuth";
import {authInfo} from "../Stitch/StitchAuth";

const TestGoal:React.FC = () => {
    const userInfo:authInfo = useContext(StitchAuthContext);

    const testGoal:IGoal = {
        goalTitle: "random Goal",
        goalDescription: "Test Description",
        endDate: "2020-03-11",
        startDate: "2020-03-10",
        isComplete: true,
        owner_id: userInfo.currentUser.id
    };

    const actualTestGoal:IActualTestGoal = {
        goalTitle: "Here here goal",
        owner_id: userInfo.currentUser.id
    };

    return (
        <IonContent>
            <IonButton onClick={() => insertGoal(testGoal)}> Add Test Goal </IonButton>
            <IonButton onClick={() => insertTestGoal(actualTestGoal)}> Add Actual Test Test Goal </IonButton>
        </IonContent>
    )
};

export default TestGoal;
