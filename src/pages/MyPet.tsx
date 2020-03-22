import React, {useEffect, useState, useContext} from 'react';
import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonProgressBar,
    IonList,
    IonItem,
    IonLabel, IonButton
} from '@ionic/react';
import './MyPet.css';
import {getPet} from "../Stitch/StitchGoals";
import PetCreation from "../components/PetCreation";


interface IPetStats {
    health_color: any;
    hunger_color: any;
    hydration_color: any;
}

const PROGRESS_COLORS = {
    0: "#0080ff",
    1: "#ff0000",
    2: "#e65c00",
    3: "#ff8533",
    4: "#ccffcc",
    5: "#99ff99",
    6: "#00ff00"
};


const MyPet: React.FC = () => {
    const [petStats, setPetStats] = useState<IPetStats>(
        {
            health_color: PROGRESS_COLORS[0],
            hunger_color: PROGRESS_COLORS[0],
            hydration_color: PROGRESS_COLORS[0]
        });
    const [pet, setPet] = useState<any>();

    const change_health_color = (pet_attr: number) => {
        // change the attribute's color depending on pet_attr value
        if (pet_attr < 10)
            setPetStats({...petStats, health_color: PROGRESS_COLORS[1]});
        else if (pet_attr < 30)
            setPetStats({...petStats, health_color: PROGRESS_COLORS[2]});
        else if (pet_attr < 50)
            setPetStats({...petStats, health_color: PROGRESS_COLORS[3]});
        else if (pet_attr < 75)
            setPetStats({...petStats, health_color: PROGRESS_COLORS[4]});
        else if (pet_attr < 90)
            setPetStats({...petStats, health_color: PROGRESS_COLORS[5]});
        else
            setPetStats({...petStats, health_color: PROGRESS_COLORS[6]});
    };

    const change_hydration_color = (pet_attr: number) => {
        // change the attribute's color depending on pet_attr value
        if (pet_attr < 10)
            setPetStats({...petStats, hydration_color: PROGRESS_COLORS[1]});
        else if (pet_attr < 30)
            setPetStats({...petStats, hydration_color: PROGRESS_COLORS[2]});
        else if (pet_attr < 50)
            setPetStats({...petStats, hydration_color: PROGRESS_COLORS[3]});
        else if (pet_attr < 75)
            setPetStats({...petStats, hydration_color: PROGRESS_COLORS[4]});
        else if (pet_attr < 90)
            setPetStats({...petStats, hydration_color: PROGRESS_COLORS[5]});
        else
            setPetStats({...petStats, hydration_color: PROGRESS_COLORS[6]});
    };

    const change_hunger_color = (pet_attr: number) => {
        // change the attribute's color depending on pet_attr value
        if (pet_attr < 10)
            setPetStats({...petStats, hunger_color: PROGRESS_COLORS[1]});
        else if (pet_attr < 30)
            setPetStats({...petStats, hunger_color: PROGRESS_COLORS[2]});
        else if (pet_attr < 50)
            setPetStats({...petStats, hunger_color: PROGRESS_COLORS[3]});
        else if (pet_attr < 75)
            setPetStats({...petStats, hunger_color: PROGRESS_COLORS[4]});
        else if (pet_attr < 90)
            setPetStats({...petStats, hunger_color: PROGRESS_COLORS[5]});
        else
            setPetStats({...petStats, hunger_color: PROGRESS_COLORS[6]});
    };

    useEffect(() => {
        console.log("running useEffect");
        (async () => {
            var my_pet = await getPet();
            if (my_pet)
                if (my_pet.length > 0) {
                    const p: any = my_pet[0];
                    setPet(p);
                    change_health_color(p.health_percent);
                    change_hunger_color(p.hunger_percent);
                    change_hydration_color(p.hydration_percent);
                }
        })();
    }, []);

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
                                value={pet.health_percent / 100 || 0}
                                color={petStats?.health_color || "blue"}/>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">
                                Hunger
                            </IonLabel>
                            <IonProgressBar
                                value={pet.hunger_percent / 100 || 0}
                                color={petStats?.hunger_color || "blue"}/>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">
                                Hydration
                            </IonLabel>
                            <IonProgressBar
                                value={(pet.hydration_percent / 100) || 0}
                                color={petStats?.hydration_color || "blue"}/>
                        </IonItem>
                    </IonList>
                    <IonButton
                        onClick={() => {
                            console.log("pet stats", petStats);
                            console.log("pet ", pet)
                        }}
                    >
                        Infomation
                    </IonButton>
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
