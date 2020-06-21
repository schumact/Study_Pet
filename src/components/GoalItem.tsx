import React from "react";
import {IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonCardSubtitle} from '@ionic/react';
import './GoalItem.css';
import {markGoalAsExpired, setGoalLastUpdatedDate, subtractLatePointsFromPet} from "../Stitch/StitchGoals";

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
    epicId?: any;
    isExpired: boolean;
    last_updated: Date;
}


export const GoalItem: React.FC<IGoalItem> = (props: IGoalItem) => {
    const oneDay = 24 * 60 * 60 * 1000;
    let daysLeft = -1;

    const setLastUpdated = async (daysLeft:number) => {
        const curr_date = new Date();
        const str_date = curr_date.toLocaleDateString();
        const last_updated_date_str = props.last_updated.toLocaleDateString();
        if (last_updated_date_str !== str_date) {
            await setGoalLastUpdatedDate(props.key, curr_date);
            await subtractLatePointsFromPet(daysLeft);
        }
    };


    if (props.endDate && props.startDate) {

        daysLeft = Math.round(Math.abs(Date.parse(props.endDate) - Date.parse(props.startDate)) / oneDay);
        if (daysLeft < 0) {
            // daysLeft = 0;
            // TODO take away a point from the pet.
            (async () => {
                if (!props.isExpired)
                    if (props.key)
                        await markGoalAsExpired(props.key);
                await setLastUpdated(daysLeft);
            })();
        }
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
                    <p>Click me to view details!</p>
                </IonCardContent>
            </IonCard> :
            <IonCard type="button"
                     key={props.key}
                     href={`/edit_goal/${props.key}`}
                     routerDirection="forward"
                     button={true}
                     style={{backgroundImage: "linear-gradient(#ff6666, #ffffff)"}}>
                <IonCardHeader>
                    <IonCardSubtitle color="dark"> {props.isExpired ? `${Math.abs(daysLeft)} days over due! Your pet is hurting!`
                        : `${daysLeft} days left`} </IonCardSubtitle>
                    <IonCardTitle>{props.title}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                    <p>Click me to Edit!</p>
                </IonCardContent>
            </IonCard>
    )
};

export default GoalItem;
