import mongoose from "mongoose";
import { getModel } from "./helpers/helpers";
import { Log } from "./Log";
import Candidate from "./Candidate";

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

            return {adding_the_vote_result: adding_the_vote_result, logging_the_vote_result: logging_the_vote_result};
        } catch (error) {
            console.error('Error adding the person details: ', error);
            console.error('Error occurred:', error.message);
        }
    }

    static async tally_votes(x){
        try {
            const obj = {ballotID: x.ballotID};
            const candidates = await Candidate.find(obj);
            let tally = [];
            for(i in candidates){
                tally.includes(i) ? tally.find(tally.candidate == i).count++  : tally.push({count: 1, candidate: i})
            }
            return tally;
        } catch (error) {
            
        }


    }
}
voteSchema.loadClass(VoteClass);
const Vote = getModel('Vote', voteSchema);

export default Vote;