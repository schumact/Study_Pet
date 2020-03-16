import {mongodb} from "./StitchApp";
import {INSERT_GOAL_RESULT, FIND_GOAL_RESULT, UPDATE_GOAL_RESULT, COMPLETE_GOAL_RESULT} from "../Util/Enums";
import {BSON} from 'mongodb-stitch-browser-sdk';
import {object} from "prop-types";

export interface IGoal {
    goalTitle: string;
    goalDescription?: string;
    endDate: string;
    startDate: string;
    owner_id: any;
    isComplete: boolean,
    points: number
}

export interface IEpic {
    epicTitle: string;
    epicDescription?: string;
    endDate: string;
    startDate: string;
    owner_id: any;
    isComplete: boolean,
    goals: string[]  // I was thinking this would hold a goal's _id. When we query an epic, get all the goals
    // and query those when they need to represented
}

const goalsCollection = mongodb.db("study_pet").collection("Goals");

export const insertGoal = (goal: Partial<IGoal>): Promise<string> => {
    console.log(goal);
    let insertResult: Promise<string> = goalsCollection.insertOne(goal)
        .then(result => {
            console.log(`Successfully inserted item with _id: ${result.insertedId}`);
            return INSERT_GOAL_RESULT.pass;
        })
        .catch(err => {
            console.error(`Failed to insert item: ${err}`);
            return INSERT_GOAL_RESULT.fail;
        });
    return insertResult;
};

export const selectAllGoals = () => {
    const goals = goalsCollection.find()
        .toArray()
        .then(res => {
            return res;
        })
        .catch(err => {
            console.log(`${FIND_GOAL_RESULT}: ${err}`);
        });
    return goals;
};

export const findGoal = (id:string) => {
    const goal = goalsCollection.find({_id:id})
        .toArray()
        .then(res => {
            return res;
        })
        .catch(err => {
            console.log(`${FIND_GOAL_RESULT}: ${err}`);
        });
    return goal;
};

export const markGoalComplete = (id:string) => {
    const update = {
        "$set": {
            "isComplete": true,
        }
    };
    const options = { "upsert": false };
    const result = goalsCollection.updateOne({_id:id}, update, options)
        .then(res => {
            const { matchedCount, modifiedCount } = res;
            if(matchedCount && modifiedCount) {
                console.log(COMPLETE_GOAL_RESULT.pass);
            }
            return res;
        })
        .catch(err => {
            console.log(`${COMPLETE_GOAL_RESULT.fail}: ${err}`);
        });
    return result;
};


export const updateGoal = (id:string, goal:any) => {
    const update = {
        "$set": {
            "goalTitle": goal.goalTitle,
            "goalDescription": goal.goalDescription,
            "startDate": goal.startDate,
            "endDate": goal.endDate,
            "points": goal.Points
        }
    };
    const options = { "upsert": false };
    const result = goalsCollection.updateOne({_id:id}, update, options)
        .then(res => {
            const { matchedCount, modifiedCount } = res;
            if(matchedCount && modifiedCount) {
                console.log(UPDATE_GOAL_RESULT.pass)
            }
            return res;
        })
        .catch(err => {
            console.log(`${UPDATE_GOAL_RESULT.fail}: ${err}`);
        });
    return result;
};

// export const selectIncompleteGoals = (): void => {
//     var returnedGoals;
//     goalsCollection.find({isComplete: false})
//         .toArray()
//         .then(res => {
//             returnedGoals = res;
//         })
//         .catch(err => {
//             console.log(`${FIND_GOAL_RESULT}: ${err}`)
//         });
// };
//
