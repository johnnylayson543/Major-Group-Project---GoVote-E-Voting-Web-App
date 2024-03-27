import mongoose from "mongoose";
import { getModel } from "./helpers/helpers";
import { Candidate } from "./Candidate";
import { Vote } from "./Vote";
import { Election } from "./Election";
import { Ballot } from "./Ballot";
//import { UserClass } from "./User";

const voterSchema = new mongoose.Schema({
    person_ppsn: { type: String, required: true, unique: false, ref: 'Person' },
    electionID: { type: String, required: true, unique: false, ref: 'Election' }
    //id: {type: String, required: true, unique: true}
});

voterSchema.index({ person_ppsn: 1, electionID: 1 }, { unique: true });

class VoterClass {
    // admin loads the stubs = user is completing the details (ppsn and pass minimum information) 

    static async cast_the_vote_for_the_election(x) {
        try {
            const filter_voter = { _id: x.voter._id };
            const filter_candidate = { _id: x.candidate._id };

            const obj = { voterID: x.voter._id, candidateID: x.candidate._id };

            const voter_found = Voter.findOne(filter_voter);
            const candidate_found = await Candidate.findOne(filter_candidate);
            console.log("candidate:");
            console.log(candidate_found);

            const filter_ballot = { ballotID: candidate_found.ballotID };
            const candidates_found = await Candidate.find(filter_ballot);
            console.log("candidates of the election:");
            console.log(candidates_found);
            const ballot_candidate_ids = await Candidate.find(filter_ballot).select('_id');
            console.log("ballot_candidate_ids");
            console.log(ballot_candidate_ids);

            const votes_having_more_than_one_candidates_in_same_election_voted = await Vote.find({ voterID: x.voter._id, candidateID: { $in: ballot_candidate_ids.map(x => x._id) } });
            console.log("votes_having_more_than_one_candidates_in_same_election_voted:");
            console.log(votes_having_more_than_one_candidates_in_same_election_voted);

            if (votes_having_more_than_one_candidates_in_same_election_voted) {
                const ids_to_remove = votes_having_more_than_one_candidates_in_same_election_voted.map(x => x._id);
                const deleted = await Vote.deleteMany({ _id: { $in: ids_to_remove } });
                console.log("Deleted:");
                console.log(deleted);
            }

            if (voter_found && candidate_found) {

                const vote = await Vote.add_vote(obj);
                return vote;
            }
            return null;
        } catch (error) {
            console.error('Error casting the vote: ', error);
            console.error('Error occurred:', error.message);
        }
    }

    static async signup_for_the_election(x) {
        try {
            const obj = { person_ppsn: x.voter.person_ppsn, electionID: x.voter.electionID };

            const obj_filter = obj;
            const voter_on_this_election_already = await Voter.findOne(obj);

            if(!voter_on_this_election_already){
                const voter = await Voter.create(obj);
                console.log("voter_added: ");
                console.log(voter);
                return voter;
            } else {
                console.log("voter already for the election: ");
                console.log(voter_on_this_election_already);
                return voter_on_this_election_already;
            }

        } catch (error) {
            console.error('Error registering voter for an election: ', error);
            console.error('Error occurred:', error.message);
        }
    }

    static async retrieve_elections_the_voter_signed_up_for(x) {
        try {

            const filter_elections_voted_in = { person_ppsn: x.voter.person_ppsn };
            const election_signups = await Voter.find(filter_elections_voted_in);
            const election_signups_ids = election_signups.map(result => result.electionID);
            console.log("electon_signup_ids:");
            console.log(election_signups_ids);
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

    static async retrieve_the_votes_for_the_voter(x) {
        try {
            const vote_filter = { voterID: x.voter._id };
            console.log("vote_filter");
            console.log(vote_filter);
            const votes = await Vote.find(vote_filter);
            console.log("votes cast");
            console.log(votes)
            return votes;
        } catch (error) {
            console.error('Error retrieving the votes: ', error);
            console.error('Error occurred:', error.message);
        }

    }

    static async retrieve_the_candidate_and_associated_information(x){
        try {
            const candidate_filter = { _id: x.candidate._id };
            console.log("candidate_filter");
            console.log(candidate_filter);
            const candidate = await Candidate.findOne(candidate_filter);
            console.log("Candidate:");
            console.log(candidate);
            const ballot_filter = {_id: candidate.ballotID};
            const ballot = await Ballot.findOne(ballot_filter);
            console.log("Ballot:");
            console.log(ballot);
            const election_filter = {ballotID: candidate.ballotID};
            const election = await Election.findOne(election_filter);
            console.log("Election:");
            console.log(election);
            const candidate_associated_information = {candidate: candidate, ballot: ballot, election: election};

            console.log("candidate_associated_information: ");
            console.log(candidate_associated_information);

            return candidate_associated_information;
        } catch (error) {
            console.error('Error retrieving the votes: ', error);
            console.error('Error occurred:', error.message);
        }
    }
}
voterSchema.loadClass(VoterClass)

export const Voter = getModel('Voter', voterSchema);

//export default Voter;