import React from 'react';
import {
    IonList,
    IonItem,
    IonButton,
} from '@ionic/react';
import './PetSupplementsOrder.css';

interface IProps {
    incrementHunger: any;
    incrementHydration: any;
    incrementHealth: any;
    adjustPetPoints: any;
    isMaxHydration: boolean;
    isMaxHealth: boolean;
    isMaxHunger: boolean;
}

const PetSupplementsOrder: React.FC<IProps> = (props: IProps) => {

    return (
        <IonList>
            <IonItem>
                <p>
                    <label style={{fontFamily: "monospace", marginRight: "15px"}}> Thirst Quencher</label>
                    <label className={"itemDetails"}> .....10pts</label>
                </p>
                {props.isMaxHydration ?
                    <IonButton color={"danger"}
                               shape={"round"}
                               slot="end"
                               disabled={true}
                    >
                        Order
                    </IonButton> :
                    <IonButton color={"success"}
                               shape={"round"}
                               slot="end"
                               onClick={() => {
                                   const addedHydration = 10 + (Math.floor(Math.random() * 3));
                                   props.incrementHydration(addedHydration);
                                   props.adjustPetPoints(10);
                               }}
                    >
                        Order
                    </IonButton>}
            </IonItem>
            <IonItem>
                <label style={{fontFamily: "monospace", marginRight: "15px"}}> Full Health </label>
                <label className={"itemDetails"}> .....22pts</label>
                {props.isMaxHealth ?
                    <IonButton color={"danger"}
                               shape={"round"}
                               slot="end"
                               disabled={true}
                    >
                        Order
                    </IonButton> :
                    <IonButton color={"success"}
                               shape={"round"}
                               slot="end"
                               onClick={() => {
                                   props.incrementHealth(100);
                                   props.adjustPetPoints(22);
                               }}
                    >
                        Order
                    </IonButton>}
            </IonItem>
            <IonItem>
                <label style={{fontFamily: "monospace", marginRight: "15px"}}> Iron Stomach </label>
                <label className={"itemDetails"}> .....10pts</label>
                {props.isMaxHunger ?
                    <IonButton color={"danger"}
                               shape={"round"}
                               slot="end"
                               disabled={true}
                    >
                        Order
                    </IonButton> :
                    <IonButton color={"success"}
                               shape={"round"}
                               slot="end"
                               onClick={() => {
                                   const addedHunger = 10 + (Math.floor(Math.random() * 3));
                                   props.incrementHunger(addedHunger);
                                   props.adjustPetPoints(10);
                               }}
                    >
                        Order
                    </IonButton>}
            </IonItem>
        </IonList>
    )
};

export default PetSupplementsOrder;
