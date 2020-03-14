import React, {useContext} from "react";
import {authInfo, StitchAuthContext} from "../Stitch/StitchAuth";
import {IonCard, IonCardHeader, IonCardTitle, IonCardContent} from '@ionic/react';
import './GoalItem.css';
import {IGoal} from "../Stitch/StitchGoals";

export const GoalItem:React.FC<any> = (props:any) => {  // Going to need to set props to object that implements IGoal
   // TODO supply props to goalItem
    // const myGoal: IGoal = {
    //     goalTitle: "random Goal",
    //     goalDescription: "Test Description",
    //     endDate: "2020-03-11",
    //     startDate: "2020-03-10",
    //     isComplete: true,
    //     owner_id: userInfo.currentUser.id,
    //     points:1
    // };

    return (
        <IonCard type="button"
                 button={true}
                 onClick={() => console.log("I'm tappable")}>
            <IonCardHeader>
                <IonCardTitle>{props.goalTitle}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                {props.goalDescription}
            </IonCardContent>
        </IonCard>
    )
};

export default GoalItem;
