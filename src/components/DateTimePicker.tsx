import React, {useState} from 'react';
import {IonItem, IonLabel, IonDatetime} from '@ionic/react';
import {IGoal} from "../Stitch/StitchGoals";
import {DATE_ENUMS} from "../Util/Enums";
import moment from "moment";

interface DateProps {
    setDate: (goal: Partial<IGoal>) => void;
    goalState: Partial<IGoal> | undefined,
    dateType: string
}

const DateTimePicker: React.FC<DateProps> = (props) => {
    const d = new Date();
    const strDate = d.toISOString();
    const formattedStartDate = strDate.slice(0, strDate.length - 1);
    const [selectedDate, setSelectedDate] = useState<string>();

    return (
        props.dateType === DATE_ENUMS.start ?
        <IonItem>
            <IonLabel>{props.dateType}</IonLabel>
            <IonDatetime
                placeholder={props.goalState?.startDate || "Select Date"}
                name="start"
                min={formattedStartDate}
                value={selectedDate}
                max="2025"
                onIonChange={e => {
                    setSelectedDate(e.detail.value!);
                    props.setDate({...props.goalState, startDate:
                            moment(e.detail.value!).format("YYYY-MM-DD")});
                }}
            />
        </IonItem> :
            <IonItem>
                <IonLabel>{props.dateType}</IonLabel>
                <IonDatetime
                    placeholder={ props.goalState?.endDate || "Select Date"}
                    name="start"
                    min={formattedStartDate}
                    value={selectedDate}
                    max="2025"
                    onIonChange={e => {
                        setSelectedDate(e.detail.value!);
                        props.setDate({...props.goalState, endDate:
                                moment(e.detail.value!).format("YYYY-MM-DD")});
                    }}
                />
            </IonItem>
    )
};

export default DateTimePicker;
