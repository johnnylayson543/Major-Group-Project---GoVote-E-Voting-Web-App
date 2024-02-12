import mongoose from "mongoose";
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
            const voteData = {ppsn: ppsn, CandidateID: x.CandidateID}; 
            const voter = Voter.findOne({ppsn: voteData.ppsn});
            const candidate = Candidate.findOne({candidateID: voteData.CandidateID});
            if(voter && candidate) await Vote.add_vote(voteData);

        } catch (error) {
            
        }

    }
}
voteSchema.loadClass(VoterClass)

const Voter = getModel('Voter', voterSchema);

export default Voter;