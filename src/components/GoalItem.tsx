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
    key: string | undefined;
    isInEpic?: boolean;
    epicId?:any
}


export const GoalItem: React.FC<IGoalItem> = (props: IGoalItem) => {

    const oneDay = 24 * 60 * 60 * 1000;
    let daysLeft = -1;
    if (props.endDate && props.startDate)
        daysLeft = Math.round(Math.abs(Date.parse(props.endDate) - Date.parse(props.startDate)) / oneDay);

    return (
        props.isComplete ?
            <IonCard type="button"
                     key={props.key}
                     href={`/edit_goal/${props.key}`}
                     routerDirection="forward"
                     button={true}
                     style={{backgroundImage: "linear-gradient(#99ffcc, #ffffff)"}}>
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
                     href={`/edit_goal/${props.key}`}
                     routerDirection="forward"
                     button={true}
                     style={{backgroundImage: "linear-gradient(#ff6666, #ffffff)"}}>
                <IonCardHeader>
                    <IonCardTitle>{props.title}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                    <p style={{color: "red", fontWeight: "bold"}}>{daysLeft} days left!</p>
                    <p>Click me to Edit!</p>
                </IonCardContent>
            </IonCard>
    )
};

export default GoalItem;
