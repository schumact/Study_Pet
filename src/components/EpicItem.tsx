import React from "react";
import {IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonCardSubtitle} from '@ionic/react';
import './GoalItem.css';
import {Link} from "react-router-dom";

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
    if (props.endDate && props.startDate) {
        daysLeft = Math.round(Math.abs(Date.parse(props.endDate) - Date.parse(props.startDate)) / oneDay);
        if (daysLeft < 0)
            daysLeft = 0;
    }

    return (
        props.isComplete ?
            <IonCard
                     key={props.key}
                     style={{backgroundImage: "linear-gradient(#b3ecff, #ffffff)"}}>
                <IonCardHeader>
                    <IonCardSubtitle>Epic Complete!</IonCardSubtitle>
                    <IonCardTitle>{props.title}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                    <Link to={`/edit_epic/${props.key}`}>Click me to Edit!</Link>
                    <br/>
                    <Link to={`/epic_goals/${props.key}`}> Epic's Goals </Link>
                </IonCardContent>
            </IonCard> :
            <IonCard
                     key={props.key}
                     style={{backgroundImage: "linear-gradient(#ffff80, #ffffff)"}}>
                <IonCardHeader>
                    <IonCardSubtitle color="dark">{daysLeft} days left!</IonCardSubtitle>
                    <IonCardTitle>{props.title}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                    <Link to={`/edit_epic/${props.key}`}>Click me to Edit!</Link>
                    <br/>
                    <Link to={`/epic_goals/${props.key}`}> Epic's Goals </Link>
                </IonCardContent>
            </IonCard>
    )
};

export default EpicItem;
