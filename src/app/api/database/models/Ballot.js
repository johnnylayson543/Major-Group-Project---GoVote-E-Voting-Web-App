import mongoose from "mongoose";
import { getModel } from "./helpers/helpers";

const ballotSchema = new mongoose.Schema({
    //id: {type: String, required: true, unique: true},
    title: {type: String, required: false},
    closing_datetime: {type: Date, required: true}
})


class BallotClass {

    static async add_ballot(x){
        try {
            const obj = x;
            const ballot = await Ballot.create(obj);
            return ballot;
        } catch (error) {
            console.error('Error creating the ballot: ', error);
            console.error('Error occurred:', error.message);
        }
    }

    static async remove_ballot(x){
        try {
            const obj_filter = {_id: x.ballotID};
            console.log("obj_filter: ");
            console.log(obj_filter);
            const ballot = await Ballot.deleteOne(obj_filter);
            return ballot;
        } catch (error) {
            console.error('Error removing the ballot: ', error);
            console.error('Error occurred:', error.message);
        }
    }

    static async retrieve_ballots(x){
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

    static async retrieve_ballot(x){
        try {
            console.log("Entered retrieve ballots try");
            const obj_filter = {_id: x.ballotID};
            const ballot = await Ballot.find(obj_filter);
            console.log(ballot);
            return ballot;
        } catch (error) {
            console.error('An error occurred while creating the ballot:', error);
            console.error('Error occurred:', error.message);
        }
    }

    static async update_ballot(x){
        try {
            const obj_filter = {ballotID: x.ballot.ballotID};
            const obj = x.ballot;
            const ballot = await Ballot.updateOne(obj_filter, obj);
            return ballot;
        } catch (error) {
            console.error('An error occurred while creating the ballot:', error);
            console.error('Error occurred:', error.message);
        }
    }
}
ballotSchema.loadClass(BallotClass)
export const Ballot = getModel('Ballot', ballotSchema);

//export default Ballot;