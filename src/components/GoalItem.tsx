import React from "react";
import {authInfo, StitchAuthContext} from "../Stitch/StitchAuth";
import {IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonRouterLink} from '@ionic/react';
import './GoalItem.css';
import {IGoal} from "../Stitch/StitchGoals";

interface IGoalItem {
    title: string | undefined;
    desc?: string | undefined;
    startDate: string | undefined;
    endDate: string | undefined;
    points: number | undefined;
    isComplete: boolean | undefined;
    owner_id: string | undefined;
    key: string | undefined
}


export const GoalItem: React.FC<IGoalItem> = (props: IGoalItem) => {
    console.log(props);
    console.log(props.startDate);
    console.log(props.endDate);

    const oneDay = 24 * 60 * 60 * 1000;
    let daysLeft = -1;
    if (props.endDate && props.startDate)
        daysLeft = Math.round(Math.abs(Date.parse(props.endDate) - Date.parse(props.startDate)) / oneDay);


    return (
        props.isComplete ?
            <IonCard type="button"
                     key={props.key}
                     routerLink={`/edit_goal:${props.key}`}
                     routerDirection="forward"
                     button={true}
                     style={{backgroundImage: "linear-gradient(#99ffcc, #ffffff)"}}
                     onClick={() => console.log("I'm tappable")}>
                <IonCardHeader>
                    <IonCardTitle>{props.title}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                    <p>Goal Complete!</p>
                    <p>Click me to Edit!</p>
                </IonCardContent>
            </IonCard> :
            <IonCard type="button"
                     key={props.key}
                     routerLink={`/edit_goal:${props.key}`}
                     routerDirection="forward"
                     button={true}
                     style={{backgroundImage: "linear-gradient(#ff6666, #ffffff)"}}
                     onClick={() => console.log("I'm tappable")}>
                <IonCardHeader>
                    <IonCardTitle>{props.title}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                    <p style={{color: "red", fontWeight:"bold"}}>{daysLeft} days left!</p>
                    <p>Click me to Edit!</p>
                </IonCardContent>
            </IonCard>

    )
};

export default GoalItem;
