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
            const obj = {voterID: x.voterID, candidateID: x.candidateID};
            const adding_the_vote_result = await Vote.create(obj);
            const logging_the_vote_result = await Log.add_vote(adding_the_vote_result);
        } catch (error) {
            
        }
    }
}
voteSchema.loadClass(VoteClass);
const Vote = getModel('Vote', voteSchema);

export default Vote;