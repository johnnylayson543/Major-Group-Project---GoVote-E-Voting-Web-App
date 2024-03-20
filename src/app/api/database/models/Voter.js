import mongoose from "mongoose";
import { getModel } from "./helpers/helpers";
import { Candidate } from "./Candidate";
import { Vote } from "./Vote";
import { Election } from "./Election";
//import { UserClass } from "./User";

const voterSchema = new mongoose.Schema({
    person_ppsn: { type: String, required: true, unique: false, ref: 'Person' },
    electionID: { type: String, required: true, unique: false, ref: 'Election' }
    //id: {type: String, required: true, unique: true}
});


class VoterClass {
    // admin loads the stubs = user is completing the details (ppsn and pass minimum information) 

    static async cast_the_vote_for_the_election(x) {
        try {
            const filter_voter = { _id: x.voter._id };
            const filter_candidate = { _id: x.candidate._id };

            const obj = { voterID: x.voter._id, candidateID: x.candidate._id };

            const voter_found = Voter.findOne(filter_voter);
            const candidate_found = Candidate.findOne(filter_candidate);
            if (voter_found && candidate_found) await Vote.add_vote(obj);
        } catch (error) {
            console.error('Error casting the vote: ', error);
            console.error('Error occurred:', error.message);
        }
    }

    static async signup_for_the_election(x) {
        try {
            const obj = { person_ppsn: x.voter.person_ppsn, electionID: x.voter.electionID };

            const voter = await Voter.create(obj);
            console.log("voter_added: ");
            console.log(voter);
            return voter;
        } catch (error) {
            console.error('Error registering voter for an election: ', error);
            console.error('Error occurred:', error.message);
        }
    }

    static async retrieve_elections_the_voter_signed_up_for(x) {
        try {
            const filter_election = { _id: x.voter._id };
            const election_signups = await Voter.find(filter_election);
            const election_signups_ids = election_signups.map(result => result.electionID);

            if (election_signups_ids) {
                const elections_signedupfor = (await Election.find({ _id: { $in: election_signups_ids } }));

                return elections_signedupfor;
            }
            return [];
        } catch (error) {
            console.error('Error retrieving the elections the voter signup for: ', error);
            console.error('Error occurred:', error.message);
        }
    }

    static async retrieve_the_voter(x) {
        try {
            const voter_filter = { person_ppsn: x.user.ppsn };
            const voter = await Voter.findOne(voter_filter);
            return voter;
        } catch (error) {
            console.error('Error retrieving the voter: ', error);
            console.error('Error occurred:', error.message);
        }

    }

    static async retrieve_the_votes_and_associated_details_for_the_voter(x) {
        try {
            const vote_filter = {voterID: x.voter._id };
            const votes = await Vote.find(vote_filter);
            return votes;
        } catch (error) {
            console.error('Error retrieving the votes: ', error);
            console.error('Error occurred:', error.message);
        }

    }
}
voterSchema.loadClass(VoterClass)

export const Voter = getModel('Voter', voterSchema);

//export default Voter;