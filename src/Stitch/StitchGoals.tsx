import {mongodb} from "./StitchApp";
import {
    COMPLETE_GOAL_RESULT,
    FIND_EPIC_RESULT,
    FIND_GOAL_RESULT,
    INSERT_EPIC_RESULT,
    INSERT_GOAL_RESULT,
    UPDATE_EPIC_RESULT,
    UPDATE_GOAL_RESULT
} from "../Util/Enums";

export interface IGoal {
    goalTitle: string;
    goalDescription?: string;
    endDate: string;
    startDate: string;
    owner_id: any;
    isComplete: boolean;
    points: number;
    isInEpic: boolean;
    epicId?:any
}

export interface IEpic {
    epicTitle: string;
    epicDescription?: string;
    endDate: string;
    startDate: string;
    owner_id: any;
    isComplete: boolean,
    goals: any[]  // I was thinking this would hold a goal's _id. When we query an epic, get all the goals
    // and query those when they need to represented
}

const goalsCollection = mongodb.db("study_pet").collection("Goals");
const epicCollection = mongodb.db("study_pet").collection("Epic");

// Goals
export const insertGoal = (goal: Partial<IGoal>): Promise<string> => {
    return goalsCollection.insertOne(goal)
        .then(result => {
            console.log(`Successfully inserted item with _id: ${result.insertedId}`);
            return INSERT_GOAL_RESULT.pass;
        })
        .catch(err => {
            console.error(`Failed to insert item: ${err}`);
            return INSERT_GOAL_RESULT.fail;
        });
};

export const selectAllGoals = () => {
    return goalsCollection.find({isInEpic: false})
        .toArray()
        .then(res => {
            return res;
        })
        .catch(err => {
            console.log(`${FIND_GOAL_RESULT}: ${err}`);
        });
};

export const findGoal = (id:string) => {
    return goalsCollection.find({_id: {$oid: id}})
        .toArray()
        .then(res => {
            console.log("here is the res");
            console.log(res);
            return res;
        })
        .catch(err => {
            console.log(`${FIND_GOAL_RESULT}: ${err}`);
        });
};

export const markGoalComplete = (id:string) => {
    const update = {
        "$set": {
            "isComplete": true,
        }
    };
    const options = { "upsert": false };
    return goalsCollection.updateOne({_id: id}, update, options)
        .then(res => {
            const {matchedCount, modifiedCount} = res;
            if (matchedCount && modifiedCount) {
                console.log(COMPLETE_GOAL_RESULT.pass);
            }
            return res;
        })
        .catch(err => {
            console.log(`${COMPLETE_GOAL_RESULT.fail}: ${err}`);
        });
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
    return goalsCollection.updateOne({_id: {$oid: id}}, update, options)
        .then(res => {
            const {matchedCount, modifiedCount} = res;
            if (matchedCount && modifiedCount) {
                outcome = UPDATE_GOAL_RESULT.pass;
            } else
                outcome = UPDATE_GOAL_RESULT.fail;
            return outcome;
        })
        .catch(err => {
            console.log(`${UPDATE_GOAL_RESULT.fail}: ${err}`);
            outcome = UPDATE_GOAL_RESULT.error;
            return outcome;
        });
};

// Epics
export const insertEpic = (epic: Partial<IEpic>): Promise<string> => {
    return epicCollection.insertOne(epic)
        .then(result => {
            console.log(`Successfully inserted item with _id: ${result.insertedId}`);
            return INSERT_EPIC_RESULT.pass;
        })
        .catch(err => {
            console.error(`Failed to insert item: ${err}`);
            return INSERT_EPIC_RESULT.fail;
        });
};

export const selectAllEpics = () => {
    return epicCollection.find()
        .toArray()
        .then(res => {
            return res;
        })
        .catch(err => {
            console.log(`${FIND_EPIC_RESULT}: ${err}`);
        });
};

export const selectGoalsInEpic= (id:string) => {
    return epicCollection.find({_id: {$oid: id}})
        .toArray()
        .then(res => {
            return res;
        })
        .catch(err => {
            console.log(`${FIND_EPIC_RESULT}: ${err}`);
        });
};

export const addGoalToEpic= (epicId:string, goalId:string) => {
    const update = {
        "$push": {
            "goals": goalId
        }
    };
    const options = { "upsert": false };
    let outcome = UPDATE_EPIC_RESULT.fail;
    return epicCollection.updateOne({_id: {$oid: epicId}}, update, options)
        .then(res => {
            const {matchedCount, modifiedCount} = res;
            if (matchedCount && modifiedCount) {
                outcome = UPDATE_EPIC_RESULT.pass;
            }
            return outcome;
        })
        .catch(err => {
            console.log(`${UPDATE_EPIC_RESULT.error}: ${err}`);
            outcome = UPDATE_EPIC_RESULT.error;
            return outcome;
        });
};


export const selectGoalsForEpic= async (id:string) => {
    console.log("id is " + id);
    const epic = await findEpic(id);
    return goalsCollection.find({_id: {$in: epic[0].goals}})
        .toArray()
        .then(res => {
            return res;
        })
        .catch(err => {
            console.log(`${FIND_EPIC_RESULT}: ${err}`);
        });
};

export const findEpic = (id:string):any => {
    return epicCollection.find({_id: {$oid: id}})
        .toArray()
        .then(res => {
            console.log(res);
            return res;
        })
        .catch(err => {
            console.log(`${FIND_EPIC_RESULT}: ${err}`);
        });
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
    return epicCollection.updateOne({_id: {$oid: id}}, update, options)
        .then(res => {
            const {matchedCount, modifiedCount} = res;
            if (matchedCount && modifiedCount) {
                outcome = UPDATE_EPIC_RESULT.pass;
            } else
                outcome = UPDATE_EPIC_RESULT.fail;
            return outcome;
        })
        .catch(err => {
            console.log(`${UPDATE_EPIC_RESULT.fail}: ${err}`);
            outcome = UPDATE_EPIC_RESULT.error;
            return outcome;
        });
};
