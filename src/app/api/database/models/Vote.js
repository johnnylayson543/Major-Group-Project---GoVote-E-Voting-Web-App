import mongoose from "mongoose";
import { getModel } from "./helpers/helpers";
import { Log } from "./Log";
import { Candidate } from "./Candidate";
import { Election } from "./Election";
import { Tally } from "./Tally";

const voteSchema = new mongoose.Schema({
    //id: {type: String, required: true, unique: true},
    voterID: { type: String, required: true, unique: false, ref: 'Voter' },
    candidateID: { type: String, required: true, unique: false, ref: 'Candidate' }
});

voteSchema.index({ voteID: 1, candidateID: 1 }, { unique: true });

class VoteClass {
    static async add_vote(x) {
        try {
            const obj = { voterID: x.voterID, candidateID: x.candidateID };
            const vote = await Vote.create(obj);

            const obj1 = { voteID: vote._id };
            const log = await Log.add_log(obj1);

            return { vote: vote, vote_log: log };
        } catch (error) {
            console.error('Error adding the vote or logging the vote: ', error);
            console.error('Error occurred:', error.message);
        }
    }

    
}
voteSchema.loadClass(VoteClass);
export const Vote = getModel('Vote', voteSchema);

//export default Vote;