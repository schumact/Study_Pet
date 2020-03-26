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
            updateForIncrease: 0,
            epicItemList: [],
            epics: ""
        }
    }

    async refresh () {
        try {
            console.log("component did mount");
            const res = await selectAllIncompleteEpics();
            if (res) {
                if (res.length === 0)
                    this.setState({isEmptyEpic:true});
                else {
                    console.log("component mount else statement");
                    console.log("res obj ", res);
                    // this.setState({epics:JSON.stringify(res)});
                    let goalItems = res.map((currEpic: any) => {
                        // seems like a mess waiting to happen
                        let newEpic = {
                            title: currEpic.epicTitle,
                            desc: currEpic.epicDescription,
                            startDate: currEpic.startDate,
                            endDate: currEpic.endDate,
                            goals: currEpic.goals,
                            owner_id: currEpic.owner_id,
                            isComplete: currEpic.isComplete,
                            key: currEpic._id.toString()
                        };
                        return EpicItem(newEpic);
                    });
                    console.log("goal items is ", goalItems);
                    this.setState({
                        epicItemList:goalItems,
                        isEmptyEpic: false
                    });
                }
                console.log("From component did mount. I just updated the state ", this.state);
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
        console.log("My state is ", this.state);
        // return super.render();
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
//
// const EpicContainer2: React.FC<IEpicContainer> = (props:IEpicContainer) => {
//     const [epics, setEpics] = useState<any>();
//     const [showAlert1, setShowAlert1] = useState(false);
//     const [isEmptyEpic, setEmptyEpic] = useState<boolean>(false);
//     const [epicItemList, setEpicItems] = useState<any>();
//     const [updateForIncrease, setUpdateForIncrease] = useState<number>(props.updaterCount);
//
//
//     useEffect(() => {
//         // query goals for a given user.
//         // return all goals to an array
//         // map() items in goals array to GoalItem objects
//         // set goals state with new array inheriting from IGoalsList
//         (async () => {
//             setUpdateForIncrease(props.updaterCount);
//             try {
//                 const res = await selectAllIncompleteEpics();
//                 if (res) {
//                     if (res.length === 0)
//                         setEmptyEpic(true);
//                     else {
//                         setEpics(JSON.stringify(res));
//                         var goalItems = res.map((currEpic: any) => {
//                             // seems like a mess waiting to happen
//                             var newEpic = {
//                                 title: currEpic.epicTitle,
//                                 desc: currEpic.epicDescription,
//                                 startDate: currEpic.startDate,
//                                 endDate: currEpic.endDate,
//                                 goals: currEpic.goals,
//                                 owner_id: currEpic.owner_id,
//                                 isComplete: currEpic.isComplete,
//                                 key: currEpic._id.toString()
//                             };
//                             return EpicItem(newEpic);
//                         });
//                         setEpicItems(goalItems);
//                         setEmptyEpic(false);
//                     }
//                 } else {
//                     setEmptyEpic(true);
//                     setShowAlert1(true);
//                 }
//             } catch (e) {
//                 if (e instanceof TypeError)
//                     console.log("There was a type error. Excepted an array of goals");
//                 console.log(e);
//             }
//         })();
//     }, [isEmptyEpic, props.updaterCount]);
//
//     return (
//         isEmptyEpic ?
//             <div>
//                 <div style={{display: "flex", justifyContent: "center"}}>
//                     <p style={{fontWeight: "bold", fontSize: "20px"}}>No Epics to Show</p>
//                 </div>
//                 <IonAlert
//                     isOpen={showAlert1}
//                     onDidDismiss={() => {
//                         setShowAlert1(false);
//                     }}
//                     header={"Connection Error"}
//                     message={"Unable to receive epics at this time."}
//                     buttons={["OK"]}
//                 />
//             </div>
//             :
//             <div>
//                 <div style={{display: "flex", justifyContent: "center"}}>
//                     <p style={{fontWeight: "bold", fontSize: "20px"}}>My Epics</p>
//                 </div>
//                 {epicItemList}
//             </div>
//     );
// };

export default EpicContainer;
