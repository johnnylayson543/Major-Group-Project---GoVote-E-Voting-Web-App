import mongoose from "mongoose";
import { mongoose_client } from "../mongooseDocker";
import { getModel } from "./helpers/helpers";
import { Candidate } from "./Candidate";

const voterSchema = new mongoose.Schema({
    ppsn: {type: String, required: true, unique: true, ref: 'Person'},
    //id: {type: String, required: true, unique: true}
});


class VoterClass extends User {
    // admin loads the stubs = user is completing the details (ppsn and pass minimum information) 

    static async cast_a_vote(x){
        try {
            const filter_voter = {ppsn: voteData.ppsn};
            const filter_candidate = {candidateID: voteData.CandidateID};
            
            const obj = {VoterID: x.ppsn, CandidateID: x.CandidateID}; 

            const voter_found = Voter.findOne(filter_voter);
            const candidate_found = Candidate.findOne(filter_candidate);
            if(voter_found && candidate_found) await Vote.add_vote(obj);
        } catch (error) {
            
        }

    }
}
voteSchema.loadClass(VoterClass)

const Voter = getModel('Voter', voterSchema);

export default Voter;