import React, {useContext} from 'react';
import {IonButton, IonContent} from '@ionic/react';
import {IGoal, insertGoal} from "../Stitch/StitchGoals";
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
        owner_id: userInfo.currentUser.id,
        points: 2
    };

    return (
        <IonContent>
            <IonButton onClick={() => insertGoal(testGoal)}> Add Test Goal </IonButton>
        </IonContent>
    )
};

export default TestGoal;
