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
    dailyModifyPet,
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
import Cat from '../components/Cat';

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
    if (pet_percentage < 10)
        color = PROGRESS_COLORS[1];
    else if (pet_percentage < 30)
        color = PROGRESS_COLORS[2];
    else if (pet_percentage < 50)
        color = PROGRESS_COLORS[3];
    else if (pet_percentage < 75)
        color = PROGRESS_COLORS[4];
    else if (pet_percentage < 90)
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
    const [count, setCount] = useState<number>(0);
    const [showShop, setShowShop] = useState<IShop>({
        showDrink: false,
        showFood: true,
        showSupplement: false
    });
    const [refresh, setRefresh] = useState<boolean>(false);

    //
    const setLastUpdated = async (pet: any) => {
        const curr_date = new Date();
        const str_date = curr_date.toLocaleDateString();
        if (pet) {
            const last_update_date = pet.last_updated;
            const last_updated_date_str = last_update_date.toLocaleDateString();
            if (last_updated_date_str !== str_date) {
                // get the difference in number of days
                const days_diff = Math.floor((Date.UTC(curr_date.getFullYear(), curr_date.getMonth(),
                    curr_date.getDate()) - Date.UTC(last_update_date.getFullYear(),
                    last_update_date.getMonth(), last_update_date.getDate())) / (1000 * 60 * 60 * 24));

                // use days diff to lower health, hunger and hydration of pet
                // for each day subtract 1-3 points
                await dailyModifyPet(days_diff, pet, curr_date);
                setCount(count + 1);
            }
        }
    };

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
                    });
                    await setLastUpdated(p);
                }
        })();
    }, [petState.health, petState.hunger, petState.hydration, petState.points, refresh, count]);

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
        let new_hunger = petState.hunger + increment;
        let new_health = petState.health + Math.ceil(increment / 2);
        if (new_health > 100)
            new_health = 100;
        if (new_hunger > 100)
            new_hunger = 100;
        if (pet) {
            if (new_hunger === 100 && new_health === 100)
                setPetState({
                    ...petState, hunger: new_hunger,
                    health: new_health, isMaxHunger: true, isMaxHealth: true
                });
            else if (new_hunger === 100)
                setPetState({...petState, hunger: new_hunger, health: new_health, isMaxHunger: true});
            else if (new_health === 100)
                setPetState({...petState, hunger: new_hunger, health: new_health, isMaxHealth: true});
            else {
                setPetState({...petState, hunger: new_hunger, health: new_health});
            }
            await increasePetHunger(new_hunger, new_health, pet._id);
        }
    };

    const updateHydration = async (increment: number) => {
        let new_hydration = petState.hydration + increment;
        let new_health = petState.health + Math.ceil(increment / 2);
        if (new_health > 100)
            new_health = 100;
        if (new_hydration > 100)
            new_hydration = 100;
        if (pet) {
            if (new_hydration === 100 && new_health === 100)
                setPetState({
                    ...petState, hydration: new_hydration,
                    health: new_health, isMaxHydration: true, isMaxHealth: true
                });
            else if (new_hydration === 100)
                setPetState({...petState, hydration: new_hydration, health: new_health, isMaxHydration: true});
            else if (new_health === 100)
                setPetState({...petState, hydration: new_hydration, health: new_health, isMaxHealth: true});
            else {
                setPetState({...petState, hydration: new_hydration, health: new_health});
            }
            await increasePetHydration(new_hydration, new_health, pet._id);
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

    const changeRefresher = (val: boolean) => {
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
                    <div style={{display: "flex", flexDirection: "column", height: "100%"}}>
                        <Cat health={petState.health}/>
                        <div style={{flex: 3}}>
                            <IonList>
                                <IonItem lines={"none"}>
                                    <h2 className={"monospace2"}>{pet.name}'s Purr Points: {petState.points}</h2>
                                </IonItem>
                                <IonItem>
                                    <IonLabel position="floating">
                                        Health: {petState.health}%
                                    </IonLabel>
                                    <IonProgressBar
                                        value={petState.health / 100}
                                        color={change_progress_color(petState.health)}/>
                                </IonItem>
                                <IonItem>
                                    <IonLabel position="floating">
                                        Hunger: {petState.hunger}%
                                    </IonLabel>
                                    <IonProgressBar
                                        value={petState.hunger / 100}
                                        color={change_progress_color(petState.hunger)}/>
                                </IonItem>
                                <IonItem>
                                    <IonLabel position="floating">
                                        Hydration: {petState.hydration}%
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
                        </div>
                    </div>
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
