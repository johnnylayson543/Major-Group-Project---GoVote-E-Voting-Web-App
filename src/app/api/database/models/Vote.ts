import mongoose, { Document, Model } from "mongoose";
import { getModel } from "./helpers/helpers";
import { ILog, Log } from "./Log";
import { Candidate } from "./Candidate";
import { Election } from "./Election";
import { Tally } from "./Tally";
import { vote_type } from "../../Forms/Basic/vote_type";
import { log_type } from "../../Forms/Basic/log_type";


export interface IVote extends Document {
    voterID: String;
    candidateID: String;
} 


const voteSchema = new mongoose.Schema<IVote>({
    //id: {type: String, required: true, unique: true},
    voterID: { type: String, required: true, unique: false, ref: 'Voter' },
    candidateID: { type: String, required: true, unique: false, ref: 'Candidate' }
});

//voteSchema.index({ voteID: 1, candidateID: 1 }, { unique: true });

class VoteClass {
    static async add_vote(x:vote_type): Promise<{ vote: any, log: any }> {
        try {
            const obj = { voterID: x.voterID, candidateID: x.candidateID };
            const vote = await Vote.create(obj);

            const obj1 = new log_type(x.voterID.toString());
            const log = await Log.add_log(obj1);

        
            return { vote: vote, log: log };
        } catch (error) {
            console.error('Error adding the vote or logging the vote: ', error);
            console.error('Error occurred:', error.message);
        }
    }

    
}

interface IVoteModel extends Model<IVote>{
    add_vote(x:vote_type): Promise<{ vote: any, log: any }>
}

voteSchema.loadClass(VoteClass);
export const Vote = getModel<IVote,IVoteModel>({modelName: 'Vote', modelSchema: voteSchema});

//export default Vote;