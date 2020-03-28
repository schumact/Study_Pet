import React, {useState, useEffect, useContext} from "react";
import './GoalContainer.css';
import {IEpic, selectAllIncompleteEpics} from "../Stitch/StitchGoals";
import {IonAlert} from "@ionic/react";
import EpicItem from "./EpicItem";
import StudyPetService, {IBus} from '../Util/GlobalSingleton';
import {Observable, Subscription} from 'rxjs';

// TODO see if I can get this to work with goals state object
interface IEpicContainer {
    updaterCount:number
}

interface IEpicState {
    showAlert1: boolean;
    isEmptyEpic: boolean;
    epicItemList:any;
    updateForIncrease: number;
    epics:any
}

class EpicContainer extends React.Component<IEpicContainer, IEpicState> {
    appSub:Subscription | null = null;
    constructor(props:IEpicContainer) {
        super(props);
        this.state = {
            isEmptyEpic: false,
            showAlert1: false,
            updateForIncrease: props.updaterCount,
            epicItemList: [],
            epics: ""
        }
    }

    async refresh () {
        try {
            const res = await selectAllIncompleteEpics();
            if (res) {
                if (res.length === 0)
                    this.setState({isEmptyEpic:true});
                else {
                    let goalItems = res.map((currEpic: any) => {
                        let newEpic = {
                            title: currEpic.epicTitle,
                            desc: currEpic.epicDescription,
                            startDate: currEpic.startDate,
                            endDate: currEpic.endDate,
                            goals: currEpic.goals,
                            owner_id: currEpic.owner_id,
                            isComplete: currEpic.isComplete,
                            key: currEpic._id.toString(),
                            isExpired: currEpic.isExpired,
                        };
                        return EpicItem(newEpic);
                    });
                    this.setState({
                        epicItemList:goalItems,
                        isEmptyEpic: false
                    });
                }
            } else {
                this.setState({
                    isEmptyEpic: true,
                    showAlert1:true
                });
            }
        } catch (e) {
            if (e instanceof TypeError)
                console.log("There was a type error. Excepted an array of goals");
            console.log(e);
        }
    }

    async componentDidMount() {
        this.appSub = StudyPetService.getEventBus().subscribe(async e => {
            return await this.refresh();
        });
       return await this.refresh();
    }

    render(): React.ReactElement {
        return (
            this.state.isEmptyEpic ?
                <div>
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <p style={{fontWeight: "bold", fontSize: "20px"}}>No Epics to Show</p>
                    </div>
                    <IonAlert
                        isOpen={this.state.showAlert1}
                        onDidDismiss={() => {
                            this.setState({showAlert1: false});
                        }}
                        header={"Connection Error"}
                        message={"Unable to receive epics at this time."}
                        buttons={["OK"]}
                    />
                </div>
                :
                <div>
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <p style={{fontWeight: "bold", fontSize: "20px"}}>My Epics</p>
                    </div>
                    {this.state.epicItemList}
                </div>
        )
    }
}

export default EpicContainer;
