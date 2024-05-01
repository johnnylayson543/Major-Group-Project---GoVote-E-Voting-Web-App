import mongoose, { Document, Model } from "mongoose";
import { getModel } from "./helpers/helpers";
import { DeleteResult } from "mongodb";
import { retrieve_the_candidate_with_this_ppsn_user_type } from "../../Forms/User/Candidate/retrieve_the_candidate_with_this_ppsn_user_type";
import { candidate_type } from "../../Forms/Basic/candidate_type";
//import { User } from "./User";


export interface ICandidate extends Document {
    person_ppsn: String;
    ballotID: string;
}

const candidateSchema = new mongoose.Schema<ICandidate>({
    person_ppsn: { type: String, required: true, unique: false, ref: 'Person' },
    //id:{type: String, required: true, unique: true},
    ballotID: { type: String, required: true, unique: false }
})
candidateSchema.index({ person_ppsn: 1, ballotID: 1 }, { unique: true });

class CandidateClass {
    static async add_candidate(x : candidate_type) {
        try {
            const obj = { person_ppsn: x.person_ppsn, ballotID: x.ballotID };
            const candidate = await Candidate.create(obj);
            return candidate;
        } catch (error) {
            console.error('An error occurred while adding the candidate:', error);
            console.error('Error occurred:', error.message);
        }
    }
    static async remove_candidate(x : candidate_type):Promise<DeleteResult> {
        try {
            const obj = { person_ppsn: x.person_ppsn, ballotID: x.ballotID };
            const candidate = await Candidate.deleteOne(obj);
            return candidate;
        } catch (error) {
            console.error('An error occurred while removing the candidate:', error);
            console.error('Error occurred:', error.message);
        }
    }


    static async retrieve_the_candidate(x :candidate_type):Promise<ICandidate> {
        try {
            const obj = { _id: x._id };
            const candidate = await Candidate.findOne(obj);
            console.log("Candidate found: ");
            console.log(candidate);
            return candidate;
        } catch (error) {
            console.error('An error occurred while retrieving the candidate:', error);
            console.error('Error occurred:', error.message);
        }
    }

    static async retrieve_candidates(x: candidate_type): Promise<Array<ICandidate & Document>> {
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

    static async retrieve_the_candidate_by_ppsn(x: candidate_type): Promise<Array<ICandidate & Document>> {
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

interface ICandidateModel extends Model<ICandidate>{
    add_candidate(x : Object ):Promise<ICandidate & Document | null>;
    remove_candidate(x : Object):Promise<DeleteResult>;
    retrieve_the_candidate(x : Object):Promise<ICandidate & Document | null>;
    retrieve_candidates(x : Object):Promise<Array<ICandidate & Document>>;
    retrieve_the_candidate_by_ppsn(x : retrieve_the_candidate_with_this_ppsn_user_type):Promise<ICandidate & Document>;
}

candidateSchema.loadClass(CandidateClass);
export const Candidate = getModel<ICandidate, ICandidateModel>({modelName: 'Candidate', modelSchema: candidateSchema});

//export default Candidate;