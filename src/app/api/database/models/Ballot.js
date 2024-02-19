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
        } catch (error) {
            console.error('Error creating the ballot: ', error);
            console.error('Error occurred:', error.message);
        }
    }
}
ballotSchema.loadClass(BallotClass)
const Ballot = getModel('Ballot', ballotSchema);

export default Ballot;