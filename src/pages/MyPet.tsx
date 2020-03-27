import React, {useEffect, useState} from 'react';
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
import {
    decreasePetPoints,
    getPet,
    increasePetHealth,
    increasePetHunger,
    increasePetHydration,
    IPet
} from "../Stitch/StitchGoals";
import PetCreation from "../components/PetCreation";
import PetDrinkOrder from "../components/PetDrinkOrder";
import PetSupplementsOrder from "../components/PetSupplementsOrder";
import PetFoodOrder from "../components/PetFoodOrder";

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

interface IShop {
    showFood: boolean;
    showDrink: boolean;
    showSupplement: boolean
}

interface IPetState {
    health: number;
    hydration: number;
    hunger: number;
    points: number;
    hasBeenSet: boolean;
    isMaxHealth: boolean;
    isMaxHydration: boolean;
    isMaxHunger: boolean;
}

const MyPet: React.FC = () => {
    const [pet, setPet] = useState<IPet>();
    const [petState, setPetState] = useState<IPetState>({
        health: 0,
        hydration: 0,
        hunger: 0,
        points: 0,
        hasBeenSet: false,
        isMaxHealth: false,
        isMaxHydration: false,
        isMaxHunger: false,
    });

    const [showShop, setShowShop] = useState<IShop>({
        showDrink: false,
        showFood: true,
        showSupplement: false
    });
    const [refresh, setRefresh] = useState<boolean>(false);


    useEffect(() => {
        (async () => {
            var my_pet = await getPet();
            if (my_pet)
                if (my_pet.length > 0) {
                    const p: any = my_pet[0];
                    setPet(p);
                    setPetState({
                        health: p.health_percent,
                        hasBeenSet: true,
                        hunger: p.hunger_percent,
                        hydration: p.hydration_percent,
                        points: p.points,
                        isMaxHydration: p.hydration_percent >= 100,
                        isMaxHunger: p.hunger_percent >= 100,
                        isMaxHealth: p.health_percent >= 100,
                    })
                }
        })();
    }, [petState.health, petState.hunger, petState.hydration, petState.points, refresh]);

    const displayFood = () => {
        setShowShop({...showShop, showFood: true, showSupplement: false, showDrink: false})
    };

    const displayDrinks = () => {
        setShowShop({...showShop, showFood: false, showSupplement: false, showDrink: true})
    };

    const displaySupplements = () => {
        setShowShop({...showShop, showFood: false, showSupplement: true, showDrink: false})
    };

    const updateHunger = async (increment: number) => {
        if (petState.hunger + increment >= 100) {
            setPetState({...petState, hunger: 100, isMaxHunger: true});
            if (pet)
                await increasePetHunger(100, pet._id);
        } else {
            const newValue = petState.hunger + increment;
            setPetState({...petState, hunger: newValue});
            if (pet)
                await increasePetHunger(newValue, pet._id);
        }

    };

    const updateHydration = async (increment: number) => {
        if (petState.hydration + increment >= 100) {
            setPetState({...petState, hydration: 100, isMaxHydration: true});
            if (pet)
                await increasePetHydration(100, pet._id);
        } else {
            const newValue = petState.hydration + increment;
            setPetState({...petState, hydration: newValue});
            if (pet)
                await increasePetHydration(newValue, pet._id);
        }
    };

    const updateHealth = async (increment: number) => {
        if (petState.health + increment >= 100) {
            setPetState({...petState, health: 100, isMaxHealth: true});
            if (pet)
                await increasePetHealth(100, pet._id);
        } else {
            const newValue = petState.health + increment;
            setPetState({...petState, health: newValue});
            if (pet)
                await increasePetHealth(newValue, pet._id);
        }
    };

    const subtractPetPoints = async (decrement: number) => {
        const newValue = petState.points - decrement;
        setPetState({...petState, points: petState.points - decrement});
        if (pet)
            await decreasePetPoints(newValue, pet._id);
    };

    const changeRefresher = (val:boolean) => {
        setRefresh(true);
    };

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
                        <IonItem lines={"none"}>
                            <h2 className={"monospace2"}>{pet.name}'s Purr Points: {petState.points}</h2>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">
                                Health
                            </IonLabel>
                            <IonProgressBar
                                value={petState.health / 100}
                                color={change_progress_color(petState.health)}/>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">
                                Hunger
                            </IonLabel>
                            <IonProgressBar
                                value={petState.hunger / 100}
                                color={change_progress_color(petState.hunger)}/>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">
                                Hydration {petState.hydration}
                            </IonLabel>
                            <IonProgressBar
                                value={petState.hydration / 100}
                                color={change_progress_color(petState.hydration)}/>
                        </IonItem>
                    </IonList>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <IonButton onClick={() => displayFood()}>
                            Food
                        </IonButton>
                        <IonButton onClick={() => displayDrinks()}>
                            Beverages
                        </IonButton>
                        <IonButton onClick={() => displaySupplements()}>
                            Supplements
                        </IonButton>
                    </div>
                    {showShop.showFood && <PetFoodOrder increment={updateHunger}
                                                        isMaxHunger={petState.isMaxHunger}
                                                        adjustPetPoints={subtractPetPoints}/>}
                    {showShop.showDrink && <PetDrinkOrder adjustPetPoints={subtractPetPoints}
                                                          isMaxHydration={petState.isMaxHydration}
                                                          increment={updateHydration}/>}
                    {showShop.showSupplement && <PetSupplementsOrder adjustPetPoints={subtractPetPoints}
                                                                     incrementHunger={updateHunger}
                                                                     isMaxHydration={petState.isMaxHydration}
                                                                     isMaxHealth={petState.isMaxHealth}
                                                                     isMaxHunger={petState.isMaxHunger}
                                                                     incrementHydration={updateHydration}
                                                                     incrementHealth={updateHealth}/>}
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
                    {!refresh && <PetCreation refresher={changeRefresher}/>}
                </IonContent>
            </IonPage>
    );
};

export default MyPet;
