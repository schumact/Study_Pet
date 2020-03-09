import React from 'react';
import {IonItem, IonLabel, IonDatetime, IonContent} from '@ionic/react';

interface DateProps {
    startDate?: boolean,
    endDate?: boolean
}


const DateTimePicker: React.FC<DateProps> = (props) => {
    let d = new Date();
    let month = ("0" + (d.getMonth() + 1)).slice(-2);  // 0 indexed
    let day = ("0" + d.getDate()).slice(-2);
    let year = d.getFullYear();
    const startDateString:string = `${year}-${month}-${day}`.toString();
    const endDateString:string = `${year + 10}-${month}-${day}`;


    return (
        props.startDate?
        <IonContent>
            <IonItem>
                <IonLabel>YYYY MM DD</IonLabel>
                <IonDatetime displayFormat="YYYY MM DD"
                             placeholder="Select Date"
                             name="start"
                             min={startDateString}
                />
            </IonItem>
        </IonContent> :
            <IonContent>
                <IonItem>
                    <IonLabel>MM DD YYYY</IonLabel>
                    <IonDatetime displayFormat="YYYY MM DD"
                                 placeholder="Select Date"
                                 name="endDate"
                                 max={endDateString}
                    />
                </IonItem>
            </IonContent>
    )
};

export default DateTimePicker;
