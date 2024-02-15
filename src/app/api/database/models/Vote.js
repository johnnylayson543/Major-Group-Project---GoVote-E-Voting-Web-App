import mongoose from "mongoose";
import { mongoose_client } from "../mongooseDocker";
import { getModel } from "./helpers/helpers";
import { Log } from "./Log";

const voteSchema = new mongoose.Schema({
    //id: {type: String, required: true, unique: true},
    voterID: {type: String, required: true, unique: true, ref: 'Voter'},
    candidateID: {type: String, required: true, unique: true, ref: 'Candidate'}
});

class VoteClass {
    static async add_vote(x){
        try {
            const result = await Vote.save(x);
            const logResult = await Log.add_vote(x);
        } catch (error) {
            
        }
    }
}
voteSchema.loadClass(VoteClass);
const Vote = getModel('Vote', voteSchema);

export default Vote;