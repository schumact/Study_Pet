import React from "react";
import {authInfo, StitchAuthContext} from "../Stitch/StitchAuth";
import {IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonRouterLink} from '@ionic/react';
import './GoalItem.css';
import {IGoal} from "../Stitch/StitchGoals";

interface IEpicItem {
    title: string | undefined;
    desc?: string | undefined;
    startDate: string | undefined;
    endDate: string | undefined;
    isComplete: boolean | undefined;
    owner_id: string | undefined;
    key: string | undefined;
    goals: string[] | undefined
}


export const EpicItem: React.FC<IEpicItem> = (props: IEpicItem) => {

    const oneDay = 24 * 60 * 60 * 1000;
    let daysLeft = -1;
    if (props.endDate && props.startDate)
        daysLeft = Math.round(Math.abs(Date.parse(props.endDate) - Date.parse(props.startDate)) / oneDay);


    return (
        props.isComplete ?
            <IonCard type="button"
                     key={props.key}
                     href={`/edit_goal:${props.key}`}
                     routerDirection="forward"
                     button={true}
                     style={{backgroundImage: "linear-gradient(#b3ecff, #ffffff)"}}>
                <IonCardHeader>
                    <IonCardTitle>{props.title}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                    <p>Epic Complete!</p>
                    <p>Click me to Edit!</p>
                </IonCardContent>
            </IonCard> :
            <IonCard type="button"
                     key={props.key}
                     href={`/edit_epic/${props.key}`}
                     routerDirection="forward"
                     button={true}
                     style={{backgroundImage: "linear-gradient(#ffff80, #ffffff)"}}>
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

export default EpicItem;
