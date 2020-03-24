import React, {useEffect, useState, useReducer} from 'react';
import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonProgressBar,
    IonList,
    IonItem,
    IonLabel
} from '@ionic/react';
import './MyPet.css';
import {getPet, IPet} from "../Stitch/StitchGoals";
import PetCreation from "../components/PetCreation";

type State = {
    health: number;
    hunger: number;
    hydration: number;
    points: number
};

type ChangeHealth = {
    readonly type: "ChangeHealth";
    readonly diff: number;  // this number is going to need to be divided by 100
}

type ChangeHunger = {
    readonly type: "ChangeHunger";
    readonly diff: number; // this number is going to need to be divided by 100
}

type ChangeHydration = {
    readonly type: "ChangeHydration";
    readonly diff: number; // this number is going to need to be divided by 100
}

type ChangePoints = {
    readonly type: "ChangePoints";
    readonly diff: number;
}

type SetPoints = {
    readonly type: "SetPoints";
    readonly set: number;
}

type SetHealth = {
    readonly type: "SetHealth";
    readonly set: number;  // this number is going to need to be divided by 100
}

type SetHunger = {
    readonly type: "SetHunger";
    readonly set: number; // this number is going to need to be divided by 100
}

type SetHydration = {
    readonly type: "SetHydration";
    readonly set: number; // this number is going to need to be divided by 100
}


type Actions = ChangeHealth | ChangeHunger | ChangeHydration | ChangePoints |
    SetPoints | SetHealth | SetHydration | SetHunger;

function reducer(state: State, action: Actions): State {
    // TODO making note that useEffect or wherever a cleanup function goes when the
    // component is unmounted, I will need to multiply all these values by 100 and
    // push values to db
    switch (action.type) {
        case "ChangeHealth":
            return (() => {
                let new_health = (state.health + action.diff) / 100;
                if (new_health > 1)
                    new_health = 1;
                return {...state, health: new_health};
            } )();
        case "ChangeHunger":
            return (() => {
                let new_hunger = (state.hunger + action.diff) / 100;
                if (new_hunger > 1)
                    new_hunger = 1;
                return {...state, hunger: new_hunger};
            } )();
        case "ChangeHydration":
            return (() => {
                let new_hydration = (state.hydration + action.diff) / 100;
                if (new_hydration > 1)
                    new_hydration = 1;
                return {...state, hydration: new_hydration};
            } )();
        case "ChangePoints":
            return (() => {
                let new_points = (state.points - action.diff);
                // TODO might need to revisit this
                if (new_points < 0)
                    new_points = 0;
                return {...state, points: new_points};
            } )();
        case "SetPoints":
            return (() => {
                let new_points = (action.set);
                return {...state, points: new_points};
            } )();
        case "SetHydration":
            return (() => {
                let starting_hydration = (action.set);
                return {...state, hydration: starting_hydration};
            } )();
        case "SetHealth":
            return (() => {
                let starting_health = (action.set);
                return {...state, health: starting_health};
            } )();
        case "SetHunger":
            return (() => {
                let starting_hunger = (action.set);
                return {...state, hunger: starting_hunger};
            } )();
    }
}

const PROGRESS_COLORS = {
    0: "danger",
    1: "danger",
    2: "warning",
    3: "warning",
    4: "success",
    5: "success",
    6: "success"
};

const change_progress_color = (pet_percentage: any) => {
    // change the attribute's color depending on pet_attr value
    let color;
    if (pet_percentage < .10)
        color = PROGRESS_COLORS[1];
    else if (pet_percentage < .30)
        color = PROGRESS_COLORS[2];
    else if (pet_percentage < .50)
        color = PROGRESS_COLORS[3];
    else if (pet_percentage < .75)
        color = PROGRESS_COLORS[4];
    else if (pet_percentage < .90)
        color = PROGRESS_COLORS[5];
    else
        color = PROGRESS_COLORS[6];
    return color;
};


const MyPet: React.FC = () => {
    const [pet, setPet] = useState<IPet>();
    const [state, dispatch] = useReducer<React.Reducer<State, Actions>>(reducer,
        {health: 0, hydration: 0, hunger: 0, points: 0});

    useEffect(() => {
        (async () => {
            var my_pet = await getPet();
            if (my_pet)
                if (my_pet.length > 0) {
                    const p: any = my_pet[0];
                    setPet(p);
                    dispatch({type: "ChangeHealth", diff: p.health_percent});
                    dispatch({type: "ChangeHunger", diff: p.hunger_percent});
                    dispatch({type: "SetPoints", set: p.points});
                    dispatch({type: "ChangeHydration", diff: p.hydration_percent});
                }
        })();
    }, [state.health, state.hunger, state.hydration, state.points]);

    return (
        pet ?
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>My Pet</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonHeader collapse="condense">
                        <IonToolbar>
                            <IonTitle size="large">My Pet</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonList>
                        <IonItem>
                            <IonLabel position="floating">
                                Health
                            </IonLabel>
                            <IonProgressBar
                                value={state.health}
                                color={change_progress_color(state.health)}/>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">
                                Hunger
                            </IonLabel>
                            <IonProgressBar
                                value={state.hunger}
                                color={change_progress_color(state.hunger)}/>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">
                                Hydration
                            </IonLabel>
                            <IonProgressBar
                                value={state.hydration}
                                color={change_progress_color(state.hydration)}/>
                        </IonItem>
                    </IonList>
                </IonContent>
            </IonPage> :
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>My Pet</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonHeader collapse="condense">
                        <IonToolbar>
                            <IonTitle size="large">My Pet</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <PetCreation/>
                </IonContent>
            </IonPage>
    );
};

export default MyPet;
