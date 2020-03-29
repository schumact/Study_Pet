import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {
    IonApp,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs
} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';
import {ellipse, square, triangle} from 'ionicons/icons';
import Home from './pages/Home';
import MyPet from './pages/MyPet';
import Login from './pages/Login';
import SignUp from "./pages/SignUp";
import Account from "./pages/Account";
import EditGoal from "./pages/EditGoal";
import EditEpic from "./pages/EditEpic";
import EpicGoals from "./pages/EpicGoals";
import CompletedItemView from "./pages/CompletedItemView";
import PasswordReset from "./pages/PasswordReset";

import {StitchAuthProvider, useStitchAuth} from "./Stitch/StitchAuth";

import '@ionic/react/css/core.css';

import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import './theme/variables.css';

const App: React.FC = () => (
    <StitchAuthProvider>
        <AppUI/>
    </StitchAuthProvider>
);

function AppUI() {
    const {
        isLoggedIn,
        actions: {handleLogout, handleUserLogin},
    } = useStitchAuth();

    return (
            <IonApp>
                <IonReactRouter>
                        <IonTabs>
                                <IonRouterOutlet>
                                    <Route path="/account" component={Account} exact={true}/>
                                    <Route path="/home" component={Home} exact={true}/>
                                    <Route path="/my_pet" component={MyPet}/>
                                    <Route path="/edit_goal/:id" component={EditGoal} exact={true}/>
                                    <Route path="/edit_epic/:id" component={EditEpic} exact={true}/>
                                    <Route path="/epic_goals/:id" component={EpicGoals} exact={true}/>
                                    <Route path="/completed_view" component={CompletedItemView}/>
                                    <Route path="/login" component={Login} exact={true}/>
                                    <Route path="/sign_up" component={SignUp}/>
                                    <Route path="/reset_password" component={PasswordReset}/>
                                    <Route path="/" render={ () => isLoggedIn ? <Redirect to="/account"/> :
                                        <Redirect to="/login"/> } exact={true}/>
                                </IonRouterOutlet>
                            <IonTabBar slot="bottom">
                                <IonTabButton tab="Account" href={isLoggedIn ? "/account" : "/login"}>
                                    <IonIcon icon={triangle}/>
                                    <IonLabel>Account</IonLabel>
                                </IonTabButton>
                                <IonTabButton tab="Home" href={isLoggedIn ? "/home" : "/login"}>
                                    <IonIcon icon={ellipse}/>
                                    <IonLabel>Home</IonLabel>
                                </IonTabButton>
                                <IonTabButton tab="MyPet" href={isLoggedIn ? "/my_pet" : "/login"}>
                                    <IonIcon icon={square}/>
                                    <IonLabel>MyPet</IonLabel>
                                </IonTabButton>
                            </IonTabBar>
                        </IonTabs>
                </IonReactRouter>
            </IonApp>
    );
}

export default App;
