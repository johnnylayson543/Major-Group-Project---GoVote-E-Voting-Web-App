import mongoose, { Document } from "mongoose";
import { getModel } from "./helpers/helpers";


export interface IElection extends Document {
    ballotID: String
} 

const electionSchema = new mongoose.Schema<IElection>({
    ballotID: {type: String, required: true, unique: true, ref: 'Ballot'}
});


class ElectionClass {
    static async add_election(x){
        try {
            const obj = {ballotID: x.ballotID};
            const election = await Election.create(obj);

            console.log("Election: ");
            console.log(election);
            return election;
        } catch (error) {
            console.error('An error occurred adding the election. ');
            console.error('Error occurred:', error.message);
        }
    }

    static async remove_election(x){
        try {
            const obj = {ballotID: x.ballotID};
            const election = await Election.deleteOne(obj);
        } catch (error) {
            console.error('An error occurred removing the election. ');
            console.error('Error occurred:', error.message);
        }
    }

    static async retrieve_elections(x){
        try {
            const obj = x;
            const elections = await Election.find(obj);
            console.log(elections);
            return elections;
        } catch (error) {
            console.error('An error occurred removing the election. ');
            console.error('Error occurred:', error.message);
        }
    }

    static async retrieve_the_election(x){
        try {
            const obj = x;
            const election = await Election.findOne(obj);
            console.log(election);
            return election;
        } catch (error) {
            console.error('An error occurred removing the election. ');
            console.error('Error occurred:', error.message);
        }
    }
}
electionSchema.loadClass(ElectionClass);
export const Election = getModel<IElection>({modelName: 'Election', modelSchema: electionSchema});

//export default Election;