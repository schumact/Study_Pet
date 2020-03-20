import {mongodb} from "./StitchApp";
import {
    COMPLETE_GOAL_RESULT,
    FIND_EPIC_RESULT,
    FIND_GOAL_RESULT,
    INSERT_EPIC_RESULT,
    INSERT_GOAL_RESULT,
    UPDATE_EPIC_RESULT,
    UPDATE_GOAL_RESULT,
    DELETE_GOAL_RESULT, COMPLETE_EPIC_RESULT, DELETE_EPIC_RESULT, DELETE_GOALS_IN_EPIC_RESULT
} from "../Util/Enums";
import {BSON} from 'mongodb-stitch-browser-sdk';

export interface IGoal {
    goalTitle: string;
    goalDescription?: string;
    endDate: string;
    startDate: string;
    owner_id: any;
    isComplete: boolean;
    points: number;
    isInEpic: boolean;
    epicId?:any;
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
            return INSERT_GOAL_RESULT.error;
        });
};

export const deleteGoal = (id: string): Promise<string> => {
    return goalsCollection.deleteOne({_id: {$oid: id}})
        .then(result => {
            if (result.deletedCount > 0)
                return DELETE_GOAL_RESULT.pass;
            return DELETE_GOAL_RESULT.fail;
        })
        .catch(err => {
            console.error(`Failed to delete item: ${err}`);
            return DELETE_GOAL_RESULT.error;
        });
};

export const selectAllIncompleteGoals = () => {
    return goalsCollection.find({isInEpic: false, isComplete: false})
        .toArray()
        .then(res => {
            return res;
        })
        .catch(err => {
            console.log(`${FIND_GOAL_RESULT}: ${err}`);
        });
};

export const selectAllCompletedGoals = () => {
    return goalsCollection.find({isInEpic: false, isComplete: true})
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
            return res;
        })
        .catch(err => {
            console.log(`${FIND_GOAL_RESULT}: ${err}`);
        });
};

export const completeGoal = (id:string) => {
    const update = {
        "$set": {
            "isComplete": true,
        }
    };
    const options = { "upsert": false };
    return goalsCollection.updateOne({_id: {$oid: id}}, update, options)
        .then(res => {
            const {matchedCount, modifiedCount} = res;
            if (matchedCount && modifiedCount) {
                return COMPLETE_GOAL_RESULT.pass
            }
            return COMPLETE_GOAL_RESULT.fail;
        })
        .catch(err => {
            console.log(`${COMPLETE_GOAL_RESULT.fail}: ${err}`);
            return COMPLETE_GOAL_RESULT.error;
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

export const completeEpic = async (epic:any) => {
    let incompleteGoals = await selectIncompleteGoalsInEpic(epic);
    if (incompleteGoals)
        if (incompleteGoals.length > 0) {
            // all goals for an epic need to be complete in order to complete an epic
            console.log("one or more goals is yet to be completed.");
            return COMPLETE_EPIC_RESULT.fail;
        }

    const update = {
        "$set": {
            "isComplete": true,
        }
    };
    const options = { "upsert": false };
    return epicCollection.updateOne({_id: {$oid: epic._id.toString()}}, update, options)
        .then(res => {
            const {matchedCount, modifiedCount} = res;
            if (matchedCount && modifiedCount) {
                return COMPLETE_EPIC_RESULT.pass
            }
            return COMPLETE_EPIC_RESULT.fail;
        })
        .catch(err => {
            console.log(`${COMPLETE_GOAL_RESULT.fail}: ${err}`);
            return COMPLETE_EPIC_RESULT.error;
        });
};

export const insertGoalForEpic= (goal: Partial<IGoal>): Promise<string> => {
    return goalsCollection.insertOne(goal)
        .then(result => {
            console.log(`Successfully inserted item with _id: ${result.insertedId}`);
            return result.insertedId;
        })
        .catch(err => {
            console.error(`Failed to insert item: ${err}`);
            return INSERT_GOAL_RESULT.fail;
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

export const deleteEpic = async (epic:any): Promise<string> => {
    // delete goals associated with epic first
    const allGoalsDeleted = await deleteAllGoalsInEpic(epic);
    if (!allGoalsDeleted)
        return DELETE_GOALS_IN_EPIC_RESULT.fail;

    return epicCollection.deleteOne({_id: {$oid: epic._id.toString()}})
        .then(result => {
            if (result.deletedCount > 0)
                return DELETE_EPIC_RESULT.pass;
            return DELETE_EPIC_RESULT.fail;
        })
        .catch(err => {
            console.error(`Failed to delete item: ${err}`);
            return DELETE_EPIC_RESULT.error;
        });
};

export const selectAllCompletedEpics = () => {
    return epicCollection.find({isComplete: true})
        .toArray()
        .then(res => {
            return res;
        })
        .catch(err => {
            console.log(`${FIND_EPIC_RESULT}: ${err}`);
        });
};

export const selectAllIncompleteEpics = () => {
    return epicCollection.find({isComplete: false})
        .toArray()
        .then(res => {
            return res;
        })
        .catch(err => {
            console.log(`${FIND_EPIC_RESULT}: ${err}`);
        });
};

export const selectIncompleteGoalsInEpic= (epic:any) => {
    return goalsCollection.find({_id: {$in: epic.goals}, isComplete:false})
        .toArray()
        .then(res => {
            return res;
        })
        .catch(err => {
            console.log(`${FIND_EPIC_RESULT}: ${err}`);
        });
};

export const deleteAllGoalsInEpic= (epic:any) => {
    return goalsCollection.deleteMany({_id: {$in: epic.goals}})
        .then(res => {
            return DELETE_GOALS_IN_EPIC_RESULT.pass;
        })
        .catch(err => {
            console.log(`${FIND_EPIC_RESULT}: ${err}`);
            return DELETE_GOALS_IN_EPIC_RESULT.fail;
        });
};

export const addGoalToEpic= (epicId:any, goalId:string) => {
    const objGoalId = new BSON.ObjectId(goalId);
    const update = {
        "$push": {
            "goals": objGoalId
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
    const epic = await findEpic(id);
    if (!epic[0].goals)
        return undefined;
    else if (epic[0].goals.length === 0)
        return undefined;
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
