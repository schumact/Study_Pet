import React, {useContext, useState, useRef, useEffect} from "react";
import {
    IonButton,
    IonList,
    IonInput,
    IonItem,
    IonLabel, IonAlert,
} from '@ionic/react';
import './AddGoal.css';
import {authInfo, StitchAuthContext} from "../Stitch/StitchAuth";
import {insertPet} from "../Stitch/StitchGoals";
import {INSERT_PET_RESULT} from "../Util/Enums";

// TODO add in refresh for GoalContainer after a goal is successfully added

interface IProps {
    refresher:(shouldRefresh:boolean) => void;
}

export const PetCreation: React.FC<IProps> = (props:IProps) => {
    const userInfo: authInfo = useContext(StitchAuthContext);
    const [petName, setPetName] = useState<any>({owner_id: userInfo.currentUser.id});
    const [showAlert1, setShowAlert1] = useState(false);
    const [showAlert2, setShowAlert2] = useState(false);
    const isMounted = useRef(true);

    useEffect(() => {
        return () => {isMounted.current = false}
    }, []);

    const createNewPet = () => {
        (async () => {
            if (petName.name) {
                const res = await insertPet(petName);
                if (res === INSERT_PET_RESULT.pass) {
                    isMounted.current && setShowAlert1(true);
                }
                else {
                    isMounted.current &&  setShowAlert2(true);
                }
            }
        })();
    };

    return (
        <div>
            <IonList>
                <IonItem>
                    <IonLabel position="floating">
                        Give your pet a name!
                    </IonLabel>
                    <IonInput
                        value={petName.name}
                        placeholder="Name"
                        required={true}
                        debounce={750}
                        clearInput={true}
                        minlength={1}
                        maxlength={50}
                        onIonChange={e => isMounted.current &&  setPetName({...petName, name: e.detail.value!})}
                    />
                </IonItem>
            </IonList>
            <br/>
            <br/>
            <IonButton
                expand="block"
                onClick={() => createNewPet()}>
                Create Pet
            </IonButton>
            <IonAlert
                isOpen={showAlert1}
                onDidDismiss={() => isMounted.current &&  setShowAlert1(false)}
                header={'Hold tight!'}
                message={INSERT_PET_RESULT.pass}
                buttons= {[{
                    text: "OK",
                    handler: () => {
                        props.refresher(true);
                    }
                }]}
            />
            <IonAlert
                isOpen={showAlert2}
                onDidDismiss={() => isMounted.current &&  setShowAlert2(false)}
                header={'Error'}
                message={INSERT_PET_RESULT.fail}
                buttons={["OK"]}
            />
        </div>
    )
};

export default PetCreation;
