import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './MyPet.css';

const MyPet: React.FC = () => {
  return (
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
        <ExploreContainer name="My Pet" />
      </IonContent>
    </IonPage>
  );
};

export default MyPet;
