import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';
import Home from './pages/Home';
import MyPet from './pages/MyPet';
import Account from './pages/Account';
import SignUp from "./pages/SignUp";

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/account" component={Account} exact={true} />
          <Route path="/home" component={Home} exact={true} />
          <Route path="/my_pet" component={MyPet} />
          <Route path="/sign_up" component={SignUp} />
          <Route path="/" render={() => <Redirect to="/account" />} exact={true} />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="Account" href="/account">
            <IonIcon icon={triangle} />
            <IonLabel>Account</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Home" href="/home">
            <IonIcon icon={ellipse} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="MyPet" href="/my_pet">
            <IonIcon icon={square} />
            <IonLabel>MyPet</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
