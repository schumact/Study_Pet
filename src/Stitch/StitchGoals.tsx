import {mongodb} from "./StitchApp";
import {INSERT_GOAL_RESULT} from "../Util/Enums";

export interface IGoal {
    goalTitle: string;
    goalDescription?: string;
    endDate: string;
    startDate: string;
    owner_id:any;
    isComplete:boolean,
    points:number
}

const goalsCollection = mongodb.db("study_pet").collection("Goals");
export const testGoalsCollection = mongodb.db("study_pet").collection("test_goal");

export const insertGoal = (goal:Partial<IGoal>):Promise<string> => {
    console.log(goal);
    let insertResult:Promise<string> = goalsCollection.insertOne(goal)
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
