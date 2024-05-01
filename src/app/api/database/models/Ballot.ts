import mongoose, { Document, Model } from "mongoose";
import { getModel } from "./helpers/helpers";
import { ballot_type } from "../../Forms/Basic/ballot_type";
import { DeleteResult, UpdateResult } from "mongodb";

export interface IBallot extends Document {
    title: string;
    closing_datetime: Date;
}

const ballotSchema = new mongoose.Schema<IBallot>({
    //id: {type: String, required: true, unique: true},
    title: {type: String, required: false},
    closing_datetime: {type: Date, required: true}
})


class BallotClass {

    static async add_ballot(x:ballot_type):Promise<IBallot & Document>{
        try {
            const obj = x;
            const ballot = await Ballot.create(obj);
            return ballot;
        } catch (error) {
            console.error('Error creating the ballot: ', error);
            console.error('Error occurred:', error.message);
        }
    }

    static async remove_ballot(x : ballot_type): Promise<DeleteResult>{
        try {
            const obj_filter = {_id: x._id};
            console.log("obj_filter: ");
            console.log(obj_filter);
            const ballot = await Ballot.deleteOne(obj_filter);
            return ballot;
        } catch (error) {
            console.error('Error removing the ballot: ', error);
            console.error('Error occurred:', error.message);
        }
    }

    static async retrieve_ballots(x : object):Promise<Array<IBallot & Document>>{
        try {
            console.log("Entered retrieve ballots try");
            const obj_filter = {};
            const ballots = await Ballot.find(obj_filter);
            console.log(ballots);
            return ballots;
        } catch (error) {
            console.error('An error occurred while creating the ballot:', error);
            console.error('Error occurred:', error.message);
        }
    }

    static async retrieve_ballot(x:ballot_type):Promise<IBallot & Document>{
        try {
            console.log("Entered retrieve ballots try");
            const obj_filter = {_id: x._id};
            const ballot = await Ballot.findOne(obj_filter);
            console.log(ballot);
            return ballot;
        } catch (error) {
            console.error('An error occurred while creating the ballot:', error);
            console.error('Error occurred:', error.message);
        }
    }

    static async update_ballot(x:ballot_type):Promise<UpdateResult>{
        try {
            const obj_filter = {ballotID: x._id};
            const obj = x;
            const ballot = await Ballot.updateOne(obj_filter, obj);
            return ballot;
        } catch (error) {
            console.error('An error occurred while creating the ballot:', error);
            console.error('Error occurred:', error.message);
        }
    }
}

interface IBallotModel extends Model<IBallot>{
    add_ballot(x:ballot_type):Promise<IBallot & Document>;
    remove_ballot(x : ballot_type): Promise<DeleteResult>;
    retrieve_ballots(x : object):Promise<Array<IBallot & Document>>;
    retrieve_ballot(x:ballot_type):Promise<IBallot & Document>;
    update_ballot(x:ballot_type):Promise<UpdateResult>;
}

ballotSchema.loadClass(BallotClass)
export const Ballot = getModel<IBallot,IBallotModel>({modelName: 'Ballot', modelSchema: ballotSchema});

//export default Ballot;