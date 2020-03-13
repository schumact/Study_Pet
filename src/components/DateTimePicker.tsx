import React, {useState} from 'react';
import {IonItem, IonLabel, IonDatetime} from '@ionic/react';

interface DateProps {
    setDate: (updatedDate:string | undefined) => void;
}

const DateTimePicker: React.FC<DateProps> = (props) => {
    const d = new Date();
    const strDate = d.toISOString();
    const [startDate, setStartDate] = useState<string>(strDate.slice(0, strDate.length - 1));
    const [selectedDate, setSelectedDate] = useState<string>(d.toString().slice(-1));
    // const [startDate, setStartDate] = useState<string>('2012-12-15T13:47:20.789');
    // const [endDate, setEndDate] = useState<string>(end.toString());
    // const [selectedDate, setSelectedDate] = useState<string>('2012-12-15T13:47:20.789');

    return (
            <IonItem>
                <IonLabel>YYYY MM DD</IonLabel>
                <IonDatetime displayFormat="YYYY MM DD"
                             placeholder="Select Date"
                             name="start"
                             min={startDate}
                             value={selectedDate}
                             max="2025"
                             onIonChange={e => {
                                 setSelectedDate(e.detail.value!);
                                 props.setDate(e.detail.value!);
                             }}
                />
            </IonItem>
    )
};

export default DateTimePicker;
