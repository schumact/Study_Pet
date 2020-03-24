import {mongodb} from "./StitchApp";
import {
    COMPLETE_EPIC_RESULT,
    COMPLETE_GOAL_RESULT,
    DELETE_EPIC_RESULT,
    DELETE_GOAL_RESULT,
    DELETE_GOALS_IN_EPIC_RESULT,
    FIND_EPIC_RESULT,
    FIND_GOAL_RESULT,
    FIND_PET_RESULT,
    INSERT_EPIC_RESULT,
    INSERT_GOAL_RESULT,
    INSERT_PET_RESULT,
    UPDATE_EPIC_RESULT,
    UPDATE_GOAL_RESULT,
    UPDATE_PET_POINTS_RESULT
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
    epicId?: any;
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

export interface IPet {
    owner_id: string;
    health_percent?: number;
    hydration_percent?: number;
    hunger_percent?: number;
    points: number;
    name: string
}

const goalsCollection = mongodb.db("study_pet").collection("Goals");
const epicCollection = mongodb.db("study_pet").collection("Epic");
const petCollection = mongodb.db("study_pet").collection("Pet");

// Pet
export const insertPet = async (petName: IPet): Promise<string> => {
    petName.health_percent = 100;
    petName.hunger_percent = 100;
    petName.hydration_percent = 100;
    petName.points = 0;
    try {
        let res = await petCollection.insertOne(petName);
        console.log(`Successfully inserted item with _id: ${res.insertedId}`);
        return INSERT_PET_RESULT.pass;
    } catch (err) {
        console.error(`Failed to insert pet: ${err}`);
        return INSERT_PET_RESULT.fail;
    }
};

export const getPet = async () => {
    try {
        return await petCollection.find()
            .toArray();
    } catch (err) {
        console.log("Error finding pet ", err);
        return FIND_PET_RESULT.fail;
    }
};

export const updatePetPointsFromEpic = async (id: string, petPoints: number) => {
    let bonus = Math.floor(Math.random() * 30);
    if (bonus < 5)
        // don't want them getting stiffed out of epic points. set 5 as min
        bonus = 5;
    const update = {
        "$set": {
            "points": petPoints + bonus,
        }
    };
    const options = {"upsert": false};
    try {
        let res = await petCollection.updateOne({_id: {$oid: id.toString()}}, update, options);
        const {matchedCount, modifiedCount} = res;
        if (matchedCount && modifiedCount) {
            return UPDATE_PET_POINTS_RESULT.pass
        }
        return UPDATE_PET_POINTS_RESULT.fail;
    } catch (err) {
        console.log(`${UPDATE_PET_POINTS_RESULT.fail}: ${err}`);
        return UPDATE_PET_POINTS_RESULT.fail;
    }
};

export const updatePetPointsFromGoal = async (id: string, petPoints: number, pointsFromGoal: number) => {
    let multiplier = Math.floor(Math.random() * 6);
    pointsFromGoal = pointsFromGoal * multiplier;
    if (pointsFromGoal > 30)
        pointsFromGoal = 30;
    if (pointsFromGoal === 0)
        pointsFromGoal = 1;
    const update = {
        "$set": {
            "points": petPoints + pointsFromGoal,
        }
    };
    const options = {"upsert": false};
    try {
        let res = await petCollection.updateOne({_id: {$oid: id.toString()}}, update, options);
        const {matchedCount, modifiedCount} = res;
        if (matchedCount && modifiedCount) {
            return UPDATE_PET_POINTS_RESULT.pass
        }
        return UPDATE_PET_POINTS_RESULT.fail;
    } catch (err) {
        console.log(`${UPDATE_PET_POINTS_RESULT.fail}: ${err}`);
        return UPDATE_PET_POINTS_RESULT.fail;
    }
};

// Goals
export const insertGoal = async (goal: Partial<IGoal>): Promise<string> => {
    try {
        let result = await goalsCollection.insertOne(goal);
        console.log(`Successfully inserted item with _id: ${result.insertedId}`);
        return INSERT_GOAL_RESULT.pass;
    } catch (err) {
        console.error(`Failed to insert goal: ${err}`);
        return INSERT_GOAL_RESULT.error;
    }
};

export const deleteGoal = async (id: string): Promise<string> => {
    try {
        let result = await goalsCollection.deleteOne({_id: {$oid: id}});
        if (result.deletedCount > 0)
            return DELETE_GOAL_RESULT.pass;
        return DELETE_GOAL_RESULT.fail;
    } catch (err) {
        console.error(`Failed to delete item: ${err}`);
        return DELETE_GOAL_RESULT.error;
    }
};

export const selectAllIncompleteGoals = async () => {
    try {
        return await goalsCollection.find({isInEpic: false, isComplete: false})
            .toArray();
    } catch (err) {
        console.log(`${FIND_GOAL_RESULT}: ${err}`);
    }
};

export const selectAllCompletedGoals = async () => {
    try {
        return await goalsCollection.find({isInEpic: false, isComplete: true})
            .toArray();
    } catch (err) {
        console.log(`${FIND_GOAL_RESULT}: ${err}`);
    }
};

export const findGoal = (id: string) => {
    return goalsCollection.find({_id: {$oid: id}})
        .toArray()
        .then(res => {
            return res;
        })
        .catch(err => {
            console.log(`${FIND_GOAL_RESULT}: ${err}`);
        });
};

export const completeGoal = (id: string) => {
    const update = {
        "$set": {
            "isComplete": true,
        }
    };
    const options = {"upsert": false};
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

export const updateGoal = async (id: string, goal: any) => {
    const update = {
        "$set": {
            "goalTitle": goal.goalTitle,
            "goalDescription": goal.goalDescription,
            "startDate": goal.startDate,
            "endDate": goal.endDate,
            "points": goal.points
        }
    };
    const options = {"upsert": false};
    let outcome = UPDATE_GOAL_RESULT.fail;
    try {
        let res = await goalsCollection.updateOne({_id: {$oid: id}}, update, options);
        const {matchedCount, modifiedCount} = res;
        if (matchedCount && modifiedCount) {
            outcome = UPDATE_GOAL_RESULT.pass;
        } else
            outcome = UPDATE_GOAL_RESULT.fail;
        return outcome;
    } catch (err) {
        console.log(`${UPDATE_GOAL_RESULT.fail}: ${err}`);
        outcome = UPDATE_GOAL_RESULT.error;
        return outcome;
    }
};

// Epics
export const insertEpic = async (epic: Partial<IEpic>): Promise<string> => {
    try {
        let result = await epicCollection.insertOne(epic);
        console.log(`Successfully inserted item with _id: ${result.insertedId}`);
        return INSERT_EPIC_RESULT.pass;
    } catch (err) {
        console.error(`Failed to insert item: ${err}`);
        return INSERT_EPIC_RESULT.fail;
    }
};

export const completeEpic = async (epic: any) => {
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
    const options = {"upsert": false};
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

export const insertGoalForEpic = async (goal: Partial<IGoal>): Promise<string> => {
    try {
        let result = await goalsCollection.insertOne(goal);
        console.log(`Successfully inserted item with _id: ${result.insertedId}`);
        return result.insertedId;
    } catch (err) {
        console.error(`Failed to insert item: ${err}`);
        return INSERT_GOAL_RESULT.fail;
    }
};
export const deleteEpic = async (epic: any): Promise<string> => {
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

export const selectAllCompletedEpics = async () => {
    try {
        return await epicCollection.find({isComplete: true})
            .toArray();
    } catch (err) {
        console.log(`${FIND_EPIC_RESULT}: ${err}`);
    }
};

export const selectAllIncompleteEpics = async () => {
    try {
        return await epicCollection.find({isComplete: false})
            .toArray();
    } catch (err) {
        console.log(`${FIND_EPIC_RESULT}: ${err}`);
    }
};

export const selectIncompleteGoalsInEpic = async (epic: any) => {
    try {
        return await goalsCollection.find({_id: {$in: epic.goals}, isComplete: false})
            .toArray();
    } catch (err) {
        console.log(`${FIND_EPIC_RESULT}: ${err}`);
    }
};

export const deleteAllGoalsInEpic = async (epic: any) => {
    try {
        await goalsCollection.deleteMany({_id: {$in: epic.goals}});
        return DELETE_GOALS_IN_EPIC_RESULT.pass;
    } catch (err) {
        console.log(`${FIND_EPIC_RESULT}: ${err}`);
        return DELETE_GOALS_IN_EPIC_RESULT.fail;
    }
};

export const addGoalToEpic = async (epicId: any, goalId: string) => {
    const objGoalId = new BSON.ObjectId(goalId);
    const update = {
        "$push": {
            "goals": objGoalId
        }
    };
    const options = {"upsert": false};
    let outcome = UPDATE_EPIC_RESULT.fail;
    try {
        let res = await epicCollection.updateOne({_id: {$oid: epicId}}, update, options);
        const {matchedCount, modifiedCount} = res;
        if (matchedCount && modifiedCount) {
            outcome = UPDATE_EPIC_RESULT.pass;
        }
        return outcome;
    } catch (err) {
        console.log(`${UPDATE_EPIC_RESULT.error}: ${err}`);
        outcome = UPDATE_EPIC_RESULT.error;
        return outcome;
    }
};


export const selectGoalsForEpic = async (id: string) => {
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

export const findEpic = (id: string): any => {
    return epicCollection.find({_id: {$oid: id}})
        .toArray()
        .then(res => {
            return res;
        })
        .catch(err => {
            console.log(`${FIND_EPIC_RESULT}: ${err}`);
        });
};

export const updateEpic = async (id: string, epic: any) => {
    const update = {
        "$set": {
            "epicTitle": epic.epicTitle,
            "epicDescription": epic.epicDescription,
            "startDate": epic.startDate,
            "endDate": epic.endDate,
            "goals": epic.goals || []
        }
    };
    const options = {"upsert": false};
    let outcome;
    try {
        let res = await epicCollection.updateOne({_id: {$oid: id}}, update, options);
        const {matchedCount, modifiedCount} = res;
        if (matchedCount && modifiedCount) {
            outcome = UPDATE_EPIC_RESULT.pass;
        } else
            outcome = UPDATE_EPIC_RESULT.fail;
        return outcome;
    } catch (err) {
        console.log(`${UPDATE_EPIC_RESULT.fail}: ${err}`);
        outcome = UPDATE_EPIC_RESULT.error;
        return outcome;
    }
};
