import mongoose from "mongoose";
import { getModel } from "./helpers/helpers";
import { Candidate } from "./Candidate";
import { Vote } from "./Vote";
//import { UserClass } from "./User";

const voterSchema = new mongoose.Schema({
    ppsn: {type: String, required: true, unique: false, ref: 'Person'},
    electionID: {type: String, required: true, unique: false, ref: 'Election'}
    //id: {type: String, required: true, unique: true}
});


class VoterClass {
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
            console.error('Error casting the vote: ', error);
            console.error('Error occurred:', error.message);
        }
    }

    static async register_voter_for_an_election(x){
        try {
            const obj = {ppsn: x.ppsn, electionID: x.electionID};

            const voter = Voter.create(obj);
            return voter;
        } catch (error) {
            console.error('Error registering voter for an election: ', error);
            console.error('Error occurred:', error.message);
        }
    }
}
voterSchema.loadClass(VoterClass)

export const Voter = getModel('Voter', voterSchema);

//export default Voter;