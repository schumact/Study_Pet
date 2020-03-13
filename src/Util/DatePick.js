import React, {useState} from 'react';
import DatePicker from 'react-native-datepicker';

// TODO need to use props? to pass in date's retrieved for goal from db
export default function MyDatePicker(props) {
    const [decidedDate, SetDate] = useState();

    // this block of code may come in handy once I 100% figure out how date
    // will be populated for goals that are already created and are
    // retrieved from db
    let currentTime = new Date();
    let dd = String(currentTime.getDate()).padStart(2, '0');
    let mm = String(currentTime.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = currentTime.getFullYear();
    currentTime = yyyy + '-' + mm + '-' + dd;
    SetDate(currentTime);
    let maxTime = (yyyy + 5) + '-' + mm + '-' + dd;

    return (
        props.startDate ?
        <DatePicker
            style={{width: 200}}
            date={props.startDate}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD"
            minDate={currentTime}
            maxDate = {maxTime}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
                dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                },
                dateInput: {
                    marginLeft: 36
                }
                // ... You can check the source to find the other keys.
            }}
            onDateChange={(date) => {
                SetDate({date})
            }}
        /> :
            <DatePicker
                style={{width: 200}}
                date={props.endDate}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                minDate={currentTime}
                maxDate = {maxTime}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                    dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0
                    },
                    dateInput: {
                        marginLeft: 36
                    }
                    // ... You can check the source to find the other keys.
                }}
                onDateChange={(date) => {
                    SetDate({date})
                }}
            />
    )
}
