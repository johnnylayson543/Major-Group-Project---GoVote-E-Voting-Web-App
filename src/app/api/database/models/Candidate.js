import mongoose from "mongoose";
import { getModel } from "./helpers/helpers";
//import { User } from "./User";

const candidateSchema = new mongoose.Schema({
    person_ppsn: { type: String, required: true, unique: false, ref: 'Person' },
    //id:{type: String, required: true, unique: true},
    ballotID: { type: String, required: true, unique: false }
})
candidateSchema.index({ person_ppsn: 1, ballotID: 1 }, { unique: true });

class CandidateClass {
    static async add_candidate(x) {
        try {
            const obj = { person_ppsn: x.person_ppsn, ballotID: x.ballotID };
            const candidate = await Candidate.create(obj);
            return candidate;
        } catch (error) {
            console.error('An error occurred while adding the candidate:', error);
            console.error('Error occurred:', error.message);
        }
    }
    static async remove_candidate(x) {
        try {
            const obj = { person_ppsn: x.person_ppsn, ballotID: x.ballotID };
            const candidate = await Candidate.deleteOne(obj);
            return candidate;
        } catch (error) {
            console.error('An error occurred while removing the candidate:', error);
            console.error('Error occurred:', error.message);
        }
    }


    static async retrieve_the_candidate(x) {
        try {
            const obj = { _id: x._id };
            const candidates = await Candidate.findOne(obj);
            console.log("Candidate found: ");
            console.log(candidates);
            return candidates;
        } catch (error) {
            console.error('An error occurred while retrieving the candidate:', error);
            console.error('Error occurred:', error.message);
        }
    }

    static async retrieve_candidates(x) {
        try {
            const obj = { ballotID: x.ballotID };
            const candidates = await Candidate.find(obj);
            console.log("Candidates found: ");
            console.log(candidates);
            return candidates;
        } catch (error) {
            console.error('An error occurred while retrieving the candidates:', error);
            console.error('Error occurred:', error.message);
        }
    }

    static async retrieve_the_candidate_by_ppsn(x) {
        try {
            //console.log("Candidate x: ");
            //console.log(x);
            const filter_candidate = { person_ppsn: x.person_ppsn };
            const candidate = await Candidate.find(filter_candidate);
            //console.log("Candidate found: ");
            //console.log(candidate);
            return candidate;
        } catch (error) {
            console.error('An error occurred while retrieving the candidate:', error);
            console.error('Error occurred:', error.message);
        }
    }
}
candidateSchema.loadClass(CandidateClass);
export const Candidate = getModel('Candidate', candidateSchema);

//export default Candidate;