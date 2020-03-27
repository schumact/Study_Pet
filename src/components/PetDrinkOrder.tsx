import React from 'react';
import {
    IonList,
    IonItem,IonButton,
} from '@ionic/react';
import '../pages/MyPet.css';

interface IProps {
    increment:any;
    adjustPetPoints: any;
    isMaxHydration: boolean;
}

const PetDrinkOrder:React.FC<IProps> = (props:IProps) => {

    const order = (cost:number) => {
        const addedHydration = cost + (Math.floor(Math.random() * 3));
        props.increment(addedHydration);
        props.adjustPetPoints(cost);
    };

    return (
        props.isMaxHydration ?
            <IonList>
                <IonItem>
                    <p>
                        <label className={"monospace"}> Loco Choco Shake</label>
                        <label className={"itemDetails"}> .....2pts</label>
                    </p>
                    <IonButton color={"danger"}
                               shape={"round"}
                               slot="end"
                               disabled={true}
                    >
                        Order
                    </IonButton>
                </IonItem>
                <IonItem>
                    <label className={"monospace"}> Bowl O' Whip </label>
                    <label className={"itemDetails"}> .....1pts</label>
                    <IonButton color={"danger"}
                               shape={"round"}
                               slot="end"
                               disabled={true}
                    >
                        Order
                    </IonButton>
                </IonItem>
                <IonItem>
                    <label className={"monospace"}> Fresh Milk </label>
                    <label className={"itemDetails"}> .....3pts</label>
                    <IonButton color={"danger"}
                               shape={"round"}
                               slot="end"
                               disabled={true}
                    >
                        Order
                    </IonButton>
                </IonItem>
                <IonItem>
                    <label className={"monospace"}> Super Shake </label>
                    <label className={"itemDetails"}> .....5pts</label>
                    <IonButton color={"danger"}
                               shape={"round"}
                               slot="end"
                               disabled={true}
                    >
                        Order
                    </IonButton>
                </IonItem>
                <IonItem>
                    <label className={"monospace"}> Plasma Juice </label>
                    <label className={"itemDetails"}> .....7pts</label>
                    <IonButton color={"danger"}
                               shape={"round"}
                               slot="end"
                               disabled={true}
                    >
                        Order
                    </IonButton>
                </IonItem>
            </IonList>
            :
        <IonList>
            <IonItem>
                <p>
                    <label className={"monospace"}> Loco Choco Shake</label>
                    <label className={"itemDetails"}> .....2pts</label>
                </p>
                <IonButton color={"success"}
                           shape={"round"}
                           slot="end"
                           onClick={() => order(2)}
                >
                    Order
                </IonButton>
            </IonItem>
            <IonItem>
                <label className={"monospace"}> Bowl O' Whip </label>
                <label className={"itemDetails"}> .....1pts</label>
                <IonButton color={"success"}
                           shape={"round"}
                           slot="end"
                           onClick={() => order(1)}
                >
                    Order
                </IonButton>
            </IonItem>
            <IonItem>
                <label className={"monospace"}> Fresh Milk </label>
                <label className={"itemDetails"}> .....3pts</label>
                <IonButton color={"success"}
                           shape={"round"}
                           slot="end"
                           onClick={() => order(3)}
                >
                    Order
                </IonButton>
            </IonItem>
            <IonItem>
                <label className={"monospace"}> Super Shake </label>
                <label className={"itemDetails"}> .....5pts</label>
                <IonButton color={"success"}
                           shape={"round"}
                           slot="end"
                           onClick={() => order(5)}
                >
                    Order
                </IonButton>
            </IonItem>
            <IonItem>
                <label className={"monospace"}> Plasma Juice </label>
                <label className={"itemDetails"}> .....7pts</label>
                <IonButton color={"success"}
                           shape={"round"}
                           slot="end"
                           onClick={() => order(7)}
                >
                    Order
                </IonButton>
            </IonItem>
        </IonList>
    )
};

export default PetDrinkOrder;
