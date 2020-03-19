import {mongodb} from "./StitchApp";
import {
    INSERT_GOAL_RESULT,
    FIND_GOAL_RESULT,
    UPDATE_GOAL_RESULT,
    COMPLETE_GOAL_RESULT,
    INSERT_EPIC_RESULT,
    FIND_EPIC_RESULT,
    UPDATE_EPIC_RESULT
} from "../Util/Enums";

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
const epicCollection = mongodb.db("study_pet").collection("Epic");

// Goals
export const insertGoal = (goal: Partial<IGoal>): Promise<string> => {
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
    const goal = goalsCollection.find({_id:{$oid: id}})
        .toArray()
        .then(res => {
            console.log("here is the res");
            console.log(res);
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
            "points": goal.points
        }
    };
    const options = { "upsert": false };
    let outcome = UPDATE_GOAL_RESULT.fail;
    const result = goalsCollection.updateOne({_id:{$oid: id}}, update, options)
        .then(res => {
            const { matchedCount, modifiedCount } = res;
            if(matchedCount && modifiedCount) {
                outcome = UPDATE_GOAL_RESULT.pass;
            }
            return outcome;
        })
        .catch(err => {
            console.log(`${UPDATE_GOAL_RESULT.fail}: ${err}`);
            outcome = UPDATE_GOAL_RESULT.error;
            return outcome;
        });
    return result;
};

// Epics
export const insertEpic = (epic: Partial<IEpic>): Promise<string> => {
    let insertResult: Promise<string> = epicCollection.insertOne(epic)
        .then(result => {
            console.log(`Successfully inserted item with _id: ${result.insertedId}`);
            return INSERT_EPIC_RESULT.pass;
        })
        .catch(err => {
            console.error(`Failed to insert item: ${err}`);
            return INSERT_EPIC_RESULT.fail;
        });
    return insertResult;
};

export const selectAllEpics = () => {
    const epics = epicCollection.find()
        .toArray()
        .then(res => {
            return res;
        })
        .catch(err => {
            console.log(`${FIND_EPIC_RESULT}: ${err}`);
        });
    return epics;
};

export const findEpic = (id:string) => {
    const epic = epicCollection.find({_id:{$oid: id}})
        .toArray()
        .then(res => {
            console.log(res);
            return res;
        })
        .catch(err => {
            console.log(`${FIND_EPIC_RESULT}: ${err}`);
        });
    return epic;
};

export const updateEpic = (id:string, epic:any) => {
    const update = {
        "$set": {
            "epicTitle": epic.epicTitle,
            "epicDescription": epic.epicDescription,
            "startDate": epic.startDate,
            "endDate": epic.endDate,
            "goals": epic.goals  || []
        }
    };
    const options = { "upsert": false };
    let outcome = UPDATE_EPIC_RESULT.fail;
    const result = epicCollection.updateOne({_id:{$oid: id}}, update, options)
        .then(res => {
            const { matchedCount, modifiedCount } = res;
            if(matchedCount && modifiedCount) {
                outcome = UPDATE_EPIC_RESULT.pass;
            }
            return outcome;
        })
        .catch(err => {
            console.log(`${UPDATE_EPIC_RESULT.fail}: ${err}`);
            outcome = UPDATE_EPIC_RESULT.error;
            return outcome;
        });
    return result;
};
