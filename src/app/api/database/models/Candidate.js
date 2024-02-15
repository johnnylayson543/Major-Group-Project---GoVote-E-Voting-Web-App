import mongoose from "mongoose";
import { mongoose_client } from "../mongooseDocker";
import { getModel } from "./helpers/helpers";

const candidateSchema = new mongoose.Schema({
    ppsn: {type: String, required: true, unique: true, ref: 'Person'},
    //id:{type: String, required: true, unique: true},
    ballotID: {type: String, required: true, unique: true}
})

class CandidateClass extends User {
    static async add_candidate(x){
        try {
            const candidate = await Candidate.create(x);
        } catch (error) {
            console.error('An error occurred while adding the candidate:', error);
        }
    } 
    static async remove_candidate(x){
        try {
            const candidate = await Candidate.deleteOne(x);
        } catch (error) {
            console.error('An error occurred while removing the candidate:', error);
        }
    }       
}
candidateSchema.loadClass(CandidateClass);
const Candidate = getModel('Candidate', candidateSchema);

export default Candidate;