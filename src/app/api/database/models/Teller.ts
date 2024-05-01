import mongoose, { Document } from "mongoose";
import { getModel } from "./helpers/helpers";
//import { UserClass } from "./User";
import { Vote } from "./Vote";
import { Tally } from "./Tally";
import { Ballot } from "./Ballot";
import { Election } from "./Election";


export interface ITeller extends Document {
    person_ppsn: String;
}

const tellerSchema = new mongoose.Schema<ITeller>({
    person_ppsn: {type: String, required: true, unique: true, ref: 'Person'}
});

class TellerClass {
    static async retrieve_the_tally_for_election(x){
        try {
            const obj = {electionID: x.election.electionID};
            console.log("obj: ");
            console.log(obj);

            const tally_found = await Tally.findOne(obj);
            console.log("tally_found? ");
            console.log(tally_found);
            if(!tally_found){
                const tally = await Tally.tally_votes(obj);
                console.log("tally made? ");
                console.log(tally);
                return tally;
            } else if (tally_found){
                return tally_found;
            } else {
                return null;
            }
        } catch (error) {
            console.error('An error occurred retrieving the tally. ');
            console.error('Error occurred:', error.message);
        }
        
    }

    static async retrieve_the_tallies(x){
        try {
            const obj = {};
            const tallies = await Tally.find(obj);
            console.log("tallies: ");
            console.log(tallies);
                
            return tallies;
        } catch (error) {
            console.error('An error occurred retrieving the tallies. ');
            console.error('Error occurred:', error.message);
        }
        
    }

    static async retrieve_the_teller(x){
        try {
            const obj = {person_ppsn: x.user.ppsn};
            const teller = await Teller.findOne(obj);    
            return teller;
        } catch (error) {
            console.error('An error occurred retrieving the tallies. ');
            console.error('Error occurred:', error.message);
        }
        
    }

    static async retrieve_the_finished_elections(x){
        try {
            const query = { closing_datetime: { $lt: new Date() } };
            const elections = await Election.find({});
            const ballotIDs = elections.map( x => x.ballotID );
            console.log("ballotIDs: ");
            console.log(ballotIDs);
            const ballots = await Ballot.find( 
                {
                    $and: 
                    [ 
                        { closing_datetime: { $lt: new Date() } }, 
                        {_id: {$in: ballotIDs }} 
                        
                    ]
                } 
            );
            const past_ballots = ballots.map(x => x._id);
            console.log("Past ballotIDs");
            console.log(past_ballots);

            const finished_elections = await Election.find( {ballotID: {$in: past_ballots }} ); 


            console.log("finished_elections: ");
            console.log(finished_elections);
            return finished_elections;
        } catch (error) {
            console.error('Error retrieving the retrieve: ', error);
            console.error('Error occurred:', error.message);
        }
    }
}
tellerSchema.loadClass(TellerClass)
export const Teller = getModel<ITeller>({modelName: 'Teller', modelSchema: tellerSchema}); 

//export default Teller;