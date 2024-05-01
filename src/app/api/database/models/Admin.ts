import mongoose, { Document } from "mongoose";
import { getModel } from "./helpers/helpers";
//import { User } from "./User";
import { Ballot } from "./Ballot";
import { Candidate } from "./Candidate";
import { Person } from "./Person";
import { Election } from "./Election";

interface IAdmin extends Document {
    person_ppsn: String;
}


const adminSchema = new mongoose.Schema<IAdmin> ({
    person_ppsn: {type: String, required: true, unique: true, ref: 'Person'}
    //id: {type: String, required: true, unique: true}
});

class AdminClass {

    static async add_person_range(x){
        const persons = [];
        console.log(x);
        console.log("PPSN range?:");
        console.log(x.persons.ppsn_range.min != null && x.persons.ppsn_range.max != null);
        const isThereARange = x.persons.ppsn_range.min != null && x.persons.ppsn_range.max != null;
        const ppsn_min = parseInt(x.persons.ppsn_range.min);
        const ppsn_max = parseInt(x.persons.ppsn_range.max);

        if(isThereARange){
            for(let i = ppsn_min; i <= ppsn_max; i++){
                try {
                const person_obj = {ppsn: i};
                const new_person_result = await Person.add_person(person_obj);
                console.log('Person added: ', new_person_result);
                persons.push(new_person_result);
                } catch (error){
                    console.error('An error occurred while adding the person:', error);
                    console.error('Error occurred:', error.message);
                }
            }
        } else if (x.persons.ppsn_values){
            for(this1 in x.values){
                try {
                const person_obj = {ppsn: i};
                const new_person_result = await Person.add_person(person_obj);
                console.log('Person added: ', new_person_result);
                persons.push(new_person_result);
                } catch (error){
                    console.error('An error occurred while adding the person:', error);
                    console.error('Error occurred:', error.message);
                }
            }
        }
        return persons;
    }

    static async confirm_person_exists_on_the_system(x){
        try {
            const person_obj = {ppsn: x.person_filter.ppsn};
            const person_found = await Person.retrieve_person(person_obj);
            console.log("Person found: ");
            console.log(person_found);
            return person_found;
        } catch (error) {
            console.error('An error occurred while confirming the person exists on the system:', error);
            console.error('Error occurred:', error.message);
        }
    }

    static async create_ballot(x){
        try 
        {
            console.log("Create Ballot obj");
            console.log(x);
            const obj = {title: x.ballot.title, closing_datetime: x.ballot.closing_datetime};
            const ballot = await Ballot.add_ballot(obj);
            return ballot;
        } catch (error) {
            console.error('An error occurred while creating the ballot:', error);
            console.error('Error occurred:', error.message);
        }
    }

    static async remove_ballot(x){
        try {
            const obj = {ballotID: x.ballot.ballotID};
            const ballot = await Ballot.remove_ballot(obj);
            return ballot;
        } catch (error) {
            console.error('An error occurred while creating the ballot:', error);
            console.error('Error occurred:', error.message);
        }
    }

    static async retrieve_ballots(x){
        try {
            const obj_filter = x.ballot_filter;
            const ballots = await Ballot.retrieve_ballots(obj_filter);
            return ballots;
        } catch (error) {
            console.error('An error occurred while creating the ballot:', error);
            console.error('Error occurred:', error.message);
        }
    }

    static async retrieve_the_ballot(x){
        try {
            const obj_filter = x.ballot_filter;
            const ballot = await Ballot.retrieve_ballot(obj_filter);
            return ballot;
        } catch (error) {
            console.error('An error occurred while creating the ballot:', error);
            console.error('Error occurred:', error.message);
        }
    }

    static async update_ballot(x){
        try {
            
            const ballot = await Ballot.update_ballot(x);
            return ballot;
        } catch (error) {
            console.error('An error occurred while creating the ballot:', error);
            console.error('Error occurred:', error.message);
        }
    }

    // create candidate
    static async add_person_to_the_ballot(x){
        try {
            const filter_person = {ppsn: x.person_filter.ppsn};
            const filter_ballot = {_id: x.ballot_filter.ballotID};
            const filter_candidate = {person_ppsn: x.candidate.person_ppsn, ballotID: x.candidate.ballotID };

            const person_found = await Person.findOne(filter_person);
            const ballot_found = await Ballot.findOne(filter_ballot);
            const candidate_found = await Candidate.findOne(filter_candidate);

            console.log("Candidate: ");
            console.log(person_found);
            console.log(ballot_found);
            console.log(x);

            if(person_found && ballot_found && candidate_found != {}){
                const obj = filter_candidate;
                const candidate = Candidate.add_candidate(obj);
                return candidate;
            } 
        } catch (error) {
            console.error('An error occurred while adding the person to the ballot:', error);
            console.error('Error occurred:', error.message);
        }
    }

    static async remove_person_from_the_ballot(x){
        try {

            const filter_candidate = {person_ppsn: x.candidate.person_ppsn, ballotID: x.candidate.ballotID};
            const candidate_found = await Candidate.findOne(filter_candidate);
            console.log("candidate_found: ");
            console.log(candidate_found);

            if(candidate_found){
                const obj = filter_candidate;
                const candidate = await Candidate.remove_candidate(obj);
                console.log("candidate_removal: ")
                console.log(candidate);

                return candidate;
            } else {
                return null;
            }
        } catch (error) {
            console.error('An error occurred while removed the person to the ballot:', error);
            console.error('Error occurred:', error.message);
        }
    }


    static async start_an_election(x){
        try {
            const filter_ballot = {_id: x.ballot.ballotID};
            const ballot_found = await Ballot.findOne(filter_ballot);
            console.log("filter_ballot:");
            console.log(filter_ballot);
            if(ballot_found){
                const obj = {ballotID: x.ballot.ballotID};
                const election = await Election.add_election(obj);
                console.log("election:");
                console.log(election);
                return election;
            } else {
                return "Not found.";
            }
        } catch (error) {
            console.error('An error occurred while adding the election:', error);
            console.error('Error occurred:', error.message);
        }
    }

    static async cancel_the_election(x){
        try {
            const filter_ballot = {ballotID: x.ballotID}
            const ballot_found = await Ballot.findOne(filter_ballot);
            if(ballot_found){
                const election = Election.remove_election({ballotID: ballot_found._id});
                return election;
            } else {
                return "Not found.";
            }
        } catch (error) {
            console.error('An error occurred while removing the election:', error);
            console.error('Error occurred:', error.message);
        }
    }

    static async retrieve_elections(x){
        try {
            const obj = {};
            const ballot = await Election.retrieve_elections(obj);
            return ballot;
        } catch (error) {
            console.error('An error occurred while creating the ballot:', error);
            console.error('Error occurred:', error.message);
        }
    }

    static async retrieve_the_election(x){
        try {
            const obj = {ballotID: x.ballot.ballotID};
            const election = await Election.retrieve_the_election(obj);
            return election;
        } catch (error) {
            console.error('An error occurred while creating the ballot:', error);
            console.error('Error occurred:', error.message);
        }
    }

    static async retrieve_the_candidate(x){
        try {
            const obj = {_id: x.candidate._id};
            const candidate = await Candidate.retrieve_the_candidate(obj);

            return candidate;
        } catch (error) {
            console.error('An error occurred retrieving person:', error);
            console.error('Error occurred:', error.message);
        }
    }

    static async retrieve_selected_person_for_candidate_selection(x){
        try {
            const obj = {ppsn: x.person.ppsn};
            const person = await Person.retrieve_person(obj);

            return person;
        } catch (error) {
            console.error('An error occurred retrieving person:', error);
            console.error('Error occurred:', error.message);
        }
    }

    static async retrieve_candidates_for_the_ballot(x){
        try {
            const obj = {ballotID: x.ballot.ballotID};
            const candidates = await Candidate.retrieve_candidates(obj);
            return candidates;
        } catch (error) {
            console.error('An error occurred retrieving person:', error);
            console.error('Error occurred:', error.message);
        }
    }

    
    static async retrieve_runnable_ballots(x){
        try {
            const runnable_ballots_based_on_query = await Candidate.aggregate([
                { $match: { _id: { $exists: true}} },
                { $group: { _id: '$ballotID', count: { $sum: 1}} },
                { $match: { count: { $gt: 1}} }
            ]);
            
            console.log("Runnable Ballots:")
            console.log(runnable_ballots_based_on_query);
            const matchesExist = runnable_ballots_based_on_query.length > 0;
            if(matchesExist){
                const runnable_ballot_ids = runnable_ballots_based_on_query.map( result => result._id);
                if(runnable_ballot_ids){
                    const runnable_ballots = (await Ballot.find({ _id: { $in: runnable_ballot_ids }}));
                    
                    return runnable_ballots;
                }
            }
            return [];
        } catch (error) {
            console.error('An error occurred retrieving runnable ballots:', error);
            console.error('Error occurred:', error.message);
        }

    }

    static async retrieve_the_admin(x) {
        try {
            const admin_filter = { person_ppsn: x.user.ppsn };
            const admin = await Admin.findOne(admin_filter);
            return admin;
        } catch (error) {
            console.error('Error retrieving the admin: ', error);
            console.error('Error occurred:', error.message);
        }

    }

}

adminSchema.loadClass(AdminClass);

export const Admin = getModel<IAdmin>({modelName: 'Admin', modelSchema: adminSchema);

// export default Admin;