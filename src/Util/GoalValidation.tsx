export const dateValidation = (startDate: string | undefined, endDate: string | undefined): boolean => {
    console.log("start date", startDate);
    console.log("end date", endDate);
    let isValid: boolean = false;
    if (startDate === undefined || endDate === undefined)
        isValid = false;
    else {
        const d1: number = Date.parse(startDate);
        const d2: number = Date.parse(endDate);
        console.log(d1);
        console.log(d2);
        if (d1 <= d2)
            isValid = true;
    }
    return isValid;
};



export const titleValidation = (title: string | undefined): boolean => {
    let isValid: boolean = false;
    if (title !== undefined) {
        if (title.length >= 1 && title.length < 51)
            isValid = true;
    }
    return isValid;
};

