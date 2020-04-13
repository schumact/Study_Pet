import React, {useEffect, useState} from 'react';
import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButton,
    IonModal,
    IonCard,
    IonItem,
    IonList,
    IonAlert, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent
} from '@ionic/react';
import './Account.css';
import {useStitchAuth} from "../Stitch/StitchAuth";
import Login from "./Login";
import Logo from '../Util/Images/Logo.png';
import PrivacyPolicy from "../components/PrivacyPolicy";
import {getPet} from '../Stitch/StitchGoals';
import {IPet} from "../Stitch/StitchGoals";

const Account: React.FC = () => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [pet, setPet] = useState<IPet>();
    const [pet_DOB, setPetDOB] = useState<string>("unknown");

    const {
        isLoggedIn,
        actions: {handleLogout},
    } = useStitchAuth();

    const convertPetDOB = (my_pet: any) => {
        if (my_pet.date_created) {
            const str_date:string = my_pet.date_created.toISOString().substring(0, 10);
            setPetDOB(str_date);
        }
    };

    const selectPet = () => {
        (async () => {
            const myPet: any = await getPet();
            if (myPet) {
                if (myPet.length > 0) {
                    setPet(myPet[0]);
                    convertPetDOB(myPet[0]);
                }
            }
        })();
    };

    useEffect(() => {
        selectPet();
    }, []);

    return (
        isLoggedIn ?
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Account</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonHeader collapse="condense">
                        <IonToolbar>
                            <IonTitle size="large">Account</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonButton expand={"block"}
                               onClick={() => handleLogout()}>Log out
                    </IonButton>
                    <br/>
                    <IonCard>
                        <img src={Logo}/>
                        <IonCardHeader>
                            <IonCardSubtitle>
                                Account Info
                            </IonCardSubtitle>
                            <IonCardTitle>
                                {pet ? pet.name : "Whoops. We can't find the birth certificate. Please refresh"}
                            </IonCardTitle>
                        </IonCardHeader>
                        {pet ? <IonCardContent>
                                Proud owner of {pet.name}. {pet.name} was born on {pet_DOB}.
                                Together with {pet.name}, completing goals and staying on track is a breeze.
                                Here's to no regrets and many completed goals to come!
                            </IonCardContent> :
                            <IonCardContent>
                                Your pet seems to have ran off somewhere. Please refresh the page and allow
                                us to look for your pet.
                            </IonCardContent>}
                    </IonCard>
                    <IonList>
                        <IonItem>
                            <p>Reset Password</p>
                            <IonButton slot="end"
                                       color="secondary"
                                       onClick={() => {
                                           setShowAlert(true)
                                       }}>
                                Reset
                            </IonButton>
                        </IonItem>
                        <IonItem>
                            <p>View Privacy Policy</p>
                            <IonButton slot="end"
                                       color="secondary"
                                       onClick={() => setShowModal(true)}>
                                View
                            </IonButton>
                        </IonItem>
                    </IonList>
                    <br/>
                    <IonModal isOpen={showModal}>
                        <PrivacyPolicy/>
                        <IonButton
                            color="danger"
                            onClick={() => {
                                setShowModal(false);
                            }}
                            expand="block">
                            Close
                        </IonButton>
                    </IonModal>
                    <IonAlert
                        isOpen={showAlert}
                        onDidDismiss={() => setShowAlert(false)}
                        header={'Hang Tight!'}
                        message={"We're sending you a link to reset your password right now. If you don't" +
                        " receive an email in the next 5 minutes, try resetting your password again. "}
                        buttons={["OK"]}
                    />
                </IonContent>
            </IonPage> :
            <Login/>
    );
};

export default Account;
