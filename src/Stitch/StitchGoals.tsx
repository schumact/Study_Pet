import {mongodb} from "./StitchApp";

export interface IGoal {
    goalTitle: string;
    goalDescription?: string;
    endDate: string;
    startDate: string;
    owner_id:any;
    isComplete:boolean
    // not sure how user_id gets incorporated
}

export interface IActualTestGoal {
    goalTitle: string;
    owner_id:string
    // not sure how user_id gets incorporated
}

export interface IanotherCollection {
    owner_id:string,
    my_field: string
}

const goalsCollection = mongodb.db("study_pet").collection("Goals");
export const testGoalsCollection = mongodb.db("study_pet").collection("test_goal");


// This is attempting to use as a stitch function
// export const insertGoal = (goal:ITestGoal) => {
//     stitchApp.callFunction("AddGoals", [goal])
//         .then(result => console.log(result));
// };

export const insertGoal = (goal:IGoal) => {
    console.log(goal.owner_id);
    console.log(typeof goal.owner_id);
    // goal.owner_id = new BSON.ObjectId(goal.owner_id);
    console.log(goal.owner_id);
    console.log(typeof goal.owner_id);
    goalsCollection.insertOne(goal)
        .then(result => console.log(`Successfully inserted item with _id: ${result.insertedId}`))
        .catch(err => console.error(`Failed to insert item: ${err}`))
};

export const insertTestGoal = (goal:IActualTestGoal) => {
    console.log(goal.owner_id);
    console.log(typeof goal.owner_id);
    // goal.owner_id = new BSON.ObjectId(goal.owner_id);
    console.log(goal.owner_id);
    console.log(typeof goal.owner_id);
    testGoalsCollection.insertOne(goal)
        .then(result => console.log(`Successfully inserted item with _id: ${result.insertedId}`))
        .catch(err => {console.error(`Failed to insert item: ${err.errorCodeName}`); console.error(`Error message: ${err.message}`)})
};
