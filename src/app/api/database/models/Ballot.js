import mongoose from "mongoose";
import { mongoose_client } from "../mongooseDocker";
import { getModel } from "./helpers/helpers";

const ballotSchema = new mongoose.Schema({
    //id: {type: String, required: true, unique: true},
    title: {type: String, required: false},
    closing_time: {type: String, required: true}
})


class BallotClass {

    static async add_ballot(x){
        try {
            const ballot = await Ballot.create(x);
        } catch (error) {
            console.error('Error creating the ballot: ', error);
        }
    }
}
ballotSchema.loadClass(BallotClass)
const Ballot = getModel('Ballot', ballotSchema);

export default Ballot;