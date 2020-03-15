import React from "react";
import {authInfo, StitchAuthContext} from "../Stitch/StitchAuth";
import {IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonRouterLink} from '@ionic/react';
import './GoalItem.css';
import {IGoal} from "../Stitch/StitchGoals";

interface IGoalItem{
    title:string | undefined;
    desc?: string | undefined;
    startDate: string | undefined;
    endDate: string | undefined;
    points: number | undefined;
    isComplete: boolean | undefined;
    owner_id: string | undefined;
    key: string | undefined
}


export const GoalItem:React.FC<IGoalItem> = (props:IGoalItem) => {
    console.log(props);

    return (
        <IonCard type="button"
                 key={props.key}
                 routerLink={`/edit_goal:${props.key}`}
                 routerDirection="forward"
                 button={true}
                 onClick={() => console.log("I'm tappable")}>
            <IonCardHeader>
                <IonCardTitle>{props.title}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                {props.desc}
                <br/>
                <p>Click me to Edit!</p>
            </IonCardContent>
        </IonCard>
    )
};

export default GoalItem;
