import mongoose from "mongoose";
import { getModel } from "./helpers/helpers";

const ballotSchema = new mongoose.Schema({
    //id: {type: String, required: true, unique: true},
    title: {type: String, required: false},
    closing_time: {type: String, required: true}
})


class BallotClass {

    static async add_ballot(x){
        try {
            const obj = {title: x.title, closing_time: x.closing_time};
            const ballot = await Ballot.create(obj);
            return ballot;
        } catch (error) {
            console.error('Error creating the ballot: ', error);
            console.error('Error occurred:', error.message);
        }
    }

    static async remove_ballot(x){
        try {
            const obj = {ballotID: x.ballotID};
            const ballot = await Ballot.deleteOne(obj);
            return ballot;
        } catch (error) {
            console.error('Error removing the ballot: ', error);
            console.error('Error occurred:', error.message);
        }
    }

    static async retrieve_ballots(){
        try {
            const obj = {};
            const ballots = await Ballot.find(obj);
            return ballots;
        } catch (error) {
            console.error('An error occurred while creating the ballot:', error);
            console.error('Error occurred:', error.message);
        }
    }

    static async update_ballot(x){
        try {
            const obj_filter = {ballotID: x.ballotID};
            const obj = x;
            const ballot = await Ballot.updateOne(obj);
            return ballot;
        } catch (error) {
            console.error('An error occurred while creating the ballot:', error);
            console.error('Error occurred:', error.message);
        }
    }
}
ballotSchema.loadClass(BallotClass)
const Ballot = getModel('Ballot', ballotSchema);

export default Ballot;