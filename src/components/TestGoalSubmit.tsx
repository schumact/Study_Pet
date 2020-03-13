import React, {useContext} from 'react';
import {IonButton, IonContent} from '@ionic/react';
import {ITestGoal, IActualTestGoal, IanotherCollection, insertAnotherCollection, insertGoal, insertTestGoal} from "../Stitch/StitchGoals";
import {StitchAuthContext} from "../Stitch/StitchAuth";
import {authInfo} from "../Stitch/StitchAuth";

const TestGoal:React.FC = () => {
    const userInfo:authInfo = useContext(StitchAuthContext);

    const testGoal:ITestGoal = {
        goalTitle: "random Goal",
        goalDescription: "Test Description",
        endDate: "2020-03-11",
        startDate: "2020-03-10",
        owner_id: userInfo.currentUser.id
    };

    const actualTestGoal:IActualTestGoal = {
        goalTitle: "Here here goal",
        owner_id: userInfo.currentUser.id
    };

    const anotherColl:IanotherCollection = {
        owner_id: userInfo.currentUser.id,
        my_field: "Please work again"
    };

    return (
        <IonContent>
            <IonButton onClick={() => insertGoal(testGoal)}> Add Test Goal </IonButton>
            <IonButton onClick={() => insertTestGoal(actualTestGoal)}> Add Actual Test Test Goal </IonButton>
            <IonButton onClick={() => insertAnotherCollection(anotherColl)}> Insert another collection </IonButton>
        </IonContent>
    )
};

export default TestGoal;
