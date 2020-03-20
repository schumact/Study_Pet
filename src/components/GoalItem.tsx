import React from "react";
import {IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonCardSubtitle} from '@ionic/react';
import './GoalItem.css';

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
    if (props.endDate && props.startDate) {
        daysLeft = Math.round(Math.abs(Date.parse(props.endDate) - Date.parse(props.startDate)) / oneDay);
        if (daysLeft < 0)
            daysLeft = 0;
    }

    return (
        props.isComplete ?
            <IonCard type="button"
                     key={props.key}
                     href={`/edit_goal/${props.key}`}
                     routerDirection="forward"
                     button={true}
                     style={{backgroundImage: "linear-gradient(#99ffcc, #ffffff)"}}>
                <IonCardHeader>
                    <IonCardSubtitle>Goal Complete!</IonCardSubtitle>
                    <IonCardTitle>{props.title}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
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
                    <IonCardSubtitle color="dark">{daysLeft} days left!</IonCardSubtitle>
                    <IonCardTitle>{props.title}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                    <p>Click me to Edit!</p>
                </IonCardContent>
            </IonCard>
    )
};

export default GoalItem;
