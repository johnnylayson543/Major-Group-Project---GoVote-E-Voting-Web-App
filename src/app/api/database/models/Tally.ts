import mongoose, { Document } from "mongoose";
import { getModel } from "./helpers/helpers";
import { Election } from "./Election";
import { Candidate } from "./Candidate";
import { Vote } from "./Vote";

export interface ITally extends Document {
    candidateID: String;
    count: Number 
}

const countSchema = new mongoose.Schema<ITally>({
    candidateID: {type: String, required: true, unique: true, ref: 'Candidate'},
    count:  {type: Number, default: 0}
});

const tallySchema = new mongoose.Schema({
    //id: {type: String, required: true, unique: true},
    electionID: { type: String, required: true, unique: true, ref: 'Election' },
    tally: { type: [countSchema], required: true, unique: false }
});


class tallyClass {

    static async add_tally(x){
        try {
            const obj = {electionID: x.electionID, tally: x.tally };
            const tally = await Tally.create(obj);
            console.log("Tally:");
            console.log(tally);
            return tally;
        } catch (error) {
            console.error('Error adding the tally: ', error);
            console.error('Error occurred:', error.message);
        }

    } 

    static async tally_votes(x) {
        try {
            const filter_election = {_id: x.electionID};
            const election = await Election.findOne(filter_election);
            console.log("filter_election:");
            console.log(filter_election);
            console.log("election:");
            console.log(election);

            const filter_candidates = {ballotID: election.ballotID};
            const candidates = await Candidate.find(filter_candidates);
            const candidatesID = candidates.map(x => x._id);
            console.log("filter_candidates:");
            console.log(filter_candidates);
            console.log("candidates:");
            console.log(candidates);
            console.log("candidatesID:");
            console.log(candidatesID);
            
            const candidatesID_string = candidatesID.map(x =>  x.toString() );

            const tally = await Vote.aggregate([
                { $match: { candidateID: {$in: candidatesID_string} } },                 
                { $group: { _id: '$candidateID', count: { $sum: 1 } } }
            ]);
            //.then(result => console.log(result) ).catch(err => console.error(err));

            console.log("Tally from Vote aggregate:");
            console.log(tally);

            const tally_obj = tally.map( x => {
                return {
                    candidateID: x._id,
                    count: x.count
                };
            });

            console.log("tally_obj:");
            console.log(tally_obj);

            const obj = {electionID: x.electionID, tally: tally_obj}
            const tally_record = await Tally.add_tally(obj);
            console.log("obj:");
            console.log(obj);
            console.log("tally_record:");
            console.log(tally_record);

            return tally_record;
        } catch (error) {
            console.error('Error tallying the votes: ', error);
            console.error('Error occurred:', error.message);
        }
    }

}

tallySchema.loadClass(tallyClass);
export const Tally = getModel<ITally>({modelName: 'Tally', modelSchema: tallySchema});
