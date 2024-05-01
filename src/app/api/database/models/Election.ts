import mongoose, { Document, Model } from "mongoose";
import { getModel } from "./helpers/helpers";
import { election_type } from "../../Forms/Basic/election_type";
import { DeleteResult } from "mongodb";
import { ballot_type } from "../../Forms/Basic/ballot_type";


export interface IElection extends Document {
    ballotID: String
} 

const electionSchema = new mongoose.Schema<IElection>({
    ballotID: {type: String, required: true, unique: true, ref: 'Ballot'}
});


class ElectionClass {
    static async add_election(x:ballot_type):Promise<IElection & Document>{
        try {
            const obj = {ballotID: x._id};
            const election = await Election.create(obj);

            console.log("Election: ");
            console.log(election);
            return election;
        } catch (error) {
            console.error('An error occurred adding the election. ');
            console.error('Error occurred:', error.message);
        }
    }

    static async remove_election(x:ballot_type): Promise<DeleteResult>{
        try {
            const obj = {ballotID: x._id};
            const election = await Election.deleteOne(obj);
            return election;
        } catch (error) {
            console.error('An error occurred removing the election. ');
            console.error('Error occurred:', error.message);
        }
    }

    static async retrieve_elections(x?:election_type):Promise<Array<IElection & Document>>{
        try {
            const obj = {};
            const elections = await Election.find(obj);
            console.log(elections);
            return elections;
        } catch (error) {
            console.error('An error occurred removing the election. ');
            console.error('Error occurred:', error.message);
        }
    }

    static async retrieve_the_election(x:ballot_type):Promise<IElection & Document>{
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

interface IElectionModel extends Model<IElection>{
    add_election(x:ballot_type):Promise<IElection & Document>;
    remove_election(x:ballot_type): Promise<DeleteResult>;
    retrieve_elections(x?:election_type):Promise<Array<IElection & Document>>;
    retrieve_the_election(x:ballot_type):Promise<IElection & Document>;
}

electionSchema.loadClass(ElectionClass);
export const Election = getModel<IElection, IElectionModel>({modelName: 'Election', modelSchema: electionSchema});

//export default Election;