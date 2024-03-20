import mongoose from "mongoose";
import { getModel } from "./helpers/helpers";
import { Log } from "./Log";
import { Candidate } from "./Candidate";

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

    static async tally_votes(x) {
        try {
            const obj = { ballotID: x.ballotID };
            const candidates = await Candidate.find(obj);
            let tally = [];
            for (i in candidates) {
                tally.includes(i) ? tally.find(tally.candidate == i).count++ : tally.push({ count: 1, candidate: i })
            }
            return tally;
        } catch (error) {

        }


    }
}
voteSchema.loadClass(VoteClass);
export const Vote = getModel('Vote', voteSchema);

//export default Vote;