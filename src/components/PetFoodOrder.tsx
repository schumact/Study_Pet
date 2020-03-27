import React from 'react';
import {
    IonList,
    IonItem,
    IonButton,
} from '@ionic/react';
import '../pages/MyPet.css';

interface IProps {
    increment:any;
    adjustPetPoints: any;
    isMaxHunger:boolean;
}

const PetFoodOrder:React.FC<IProps> = (props:IProps) => {

    const order = (cost:number) => {
        const addedHunger = cost + (Math.floor(Math.random() * 3));
        props.increment(addedHunger);
        props.adjustPetPoints(cost);
    };

    return (
        props.isMaxHunger ?
            <IonList>
                <IonItem>
                    <p>
                        <label className={"monospace"}> Hamburger</label>
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
                    <label className={"monospace"}> Cat Nip </label>
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
                    <label className={"monospace"}> Tootie Fruities </label>
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
                    <label className={"monospace"}> T-Bone Steak </label>
                    <label className={"itemDetails"}> .....4pts</label>
                    <IonButton color={"danger"}
                               shape={"round"}
                               slot="end"
                               disabled={true}
                    >
                        Order
                    </IonButton>
                </IonItem>
                <IonItem>
                    <label className={"monospace"}> Surprise Cereal </label>
                    <label className={"itemDetails"}> .....10pts</label>
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
                    <label className={"monospace"}> Hamburger</label>
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
                <label className={"monospace"}> Cat Nip </label>
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
                <label className={"monospace"}> Tootie Fruities </label>
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
                <label className={"monospace"}> T-Bone Steak </label>
                <label className={"itemDetails"}> .....4pts</label>
                <IonButton color={"success"}
                           shape={"round"}
                           slot="end"
                           onClick={() => order(4)}
                >
                    Order
                </IonButton>
            </IonItem>
            <IonItem>
                <label className={"monospace"}> Surprise Cereal </label>
                <label className={"itemDetails"}> .....10pts</label>
                <IonButton color={"success"}
                           shape={"round"}
                           slot="end"
                           onClick={() => order(10)}
                >
                    Order
                </IonButton>
            </IonItem>
        </IonList>
    )
};

export default PetFoodOrder;
