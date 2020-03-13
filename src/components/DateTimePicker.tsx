import React, {useState} from 'react';
import {IonItem, IonLabel, IonDatetime} from '@ionic/react';
import {IGoal} from "../Stitch/StitchGoals";
import {DATE_ENUMS} from "../Util/Enums";

interface DateProps {
    setDate: (goal: Partial<IGoal>) => void;
    goalState: Partial<IGoal> | undefined,
    dateType: string
}

const DateTimePicker: React.FC<DateProps> = (props) => {
    const d = new Date();
    const strDate = d.toISOString();
    const formattedStartDate = strDate.slice(0, strDate.length - 1);
    const [selectedDate, setSelectedDate] = useState<string>(d.toString().slice(-1));

    return (
        props.dateType === DATE_ENUMS.start ?
        <IonItem>
            <IonLabel>{props.dateType}</IonLabel>
            <IonDatetime
                placeholder="Select Date"
                name="start"
                min={formattedStartDate}
                value={selectedDate}
                max="2025"
                onIonChange={e => {
                    setSelectedDate(e.detail.value!);
                    props.setDate({...props.goalState, startDate:e.detail.value!});
                }}
            />
        </IonItem> :
            <IonItem>
                <IonLabel>{props.dateType}</IonLabel>
                <IonDatetime
                    placeholder="Select Date"
                    name="start"
                    min={formattedStartDate}
                    value={selectedDate}
                    max="2025"
                    onIonChange={e => {
                        setSelectedDate(e.detail.value!);
                        props.setDate({...props.goalState, endDate:e.detail.value!});
                    }}
                />
            </IonItem>
    )
};

export default DateTimePicker;
