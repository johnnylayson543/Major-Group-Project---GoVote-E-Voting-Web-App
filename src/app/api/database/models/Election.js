import mongoose from "mongoose";
import { mongoose_client } from "../mongooseDocker";
import { getModel } from "./helpers/helpers";

const electionSchema = new mongoose.Schema({
    ballotID: {type: String, required: true, unique: true, ref: 'Ballot'}
});


class ElectionClass {
    static async add_election(){
        try {
            const election = await Election.create(x);
        } catch (error) {
            
        }
    }
}
electionSchema.loadClass(ElectionClass);
const Election = getModel('Election', electionSchema);

export default Election;