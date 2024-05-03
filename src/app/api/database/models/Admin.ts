import mongoose, { Document, IfAny, Model } from "mongoose";
import { getModel } from "./helpers/helpers";
//import { User } from "./User";
import { Ballot, IBallot } from "./Ballot";
import { Candidate, ICandidate } from "./Candidate";
import { IPerson, Person } from "./Person";
import { Election, IElection } from "./Election";
import { add_persons_range_admin_type } from '@/app/api/Forms/Admin/Person/add_persons_range_admin_type'
import { person_type } from "../../Forms/Basic/person_type";
import { create_ballot_admin_type } from "@/app/api/Forms/Admin/Ballot/create_ballot_admin_type";
import { remove_ballot_admin_type } from "@/app/api/Forms/Admin/Ballot/remove_ballot_admin_type";
import { retrieve_ballots_admin_type } from "@/app/api/Forms/Admin/Ballot/retrieve_ballots_admin_type";
import { retrieve_runnable_ballots_admin_type } from "@/app/api/Forms/Admin/Ballot/retrieve_runnable_ballots_admin_type";
import { update_ballot_admin_type } from "@/app/api/Forms/Admin/Ballot/update_ballot_admin_type";
import { confirm_person_exists_on_the_system_admin_type } from "@/app/api/Forms/Admin/Person/confirm_person_exists_on_the_system_admin_type"
import { retrieve_the_ballot_admin_type } from "../../Forms/Admin/Ballot/retrieve_the_ballot_admin_type";
import { add_person_to_the_ballot_admin_type } from "@/app/api/Forms/Admin/Candidate/add_person_to_the_ballot_admin_type"
import { remove_candidate_from_ballot_admin_type } from "@/app/api/Forms/Admin/Candidate/remove_candidate_from_ballot_admin_type"
import { retrieve_candidates_for_the_ballot_admin_type } from "@/app/api/Forms/Admin/Candidate/retrieve_candidates_for_the_ballot_admin_type"
import { retrieve_selected_person_for_candidate_selection_admin_type} from "@/app/api/Forms/Admin/Candidate/retrieve_selected_person_for_candidate_selection_admin_type";
import { retrieve_the_candidate_admin_type } from "@/app/api/Forms/Admin/Candidate/retrieve_the_candidate_admin_type"
import { cancel_the_election_admin_type  } from "@/app/api/Forms/Admin/Election/cancel_the_election_admin_type"
import { retrieve_elections_admin_type  } from "@/app/api/Forms/Admin/Election/retrieve_elections_admin_type"
import { retrieve_the_election_admin_type } from "@/app/api/Forms/Admin/Election/retrieve_the_election_admin_type"
import { start_an_election_admin_type } from "@/app/api/Forms/Admin/Election/start_an_election_admin_type"
import { DeleteResult, UpdateResult } from "mongodb";
import { ballot_type } from "../../Forms/Basic/ballot_type";
import { retrieve_the_admin_admin_type } from "../../Forms/Admin/retrieve_the_admin_admin_type";



export interface IAdmin extends Document {
    person_ppsn: String;
}


const adminSchema = new mongoose.Schema<IAdmin> ({
    person_ppsn: {type: String, required: true, unique: true, ref: 'Person'}
    //id: {type: String, required: true, unique: true}
});

class AdminClass {

    static async add_person_range(x :add_persons_range_admin_type):Promise<Array<IPerson & Document>> {
        const persons = [];
        console.log(x);
        console.log("PPSN range?:");
        console.log(x.persons.min != null && x.persons.max != null);
        const isThereARange = x.persons.min != null && x.persons.max != null;
        const ppsn_min = x.persons.min;
        const ppsn_max = x.persons.max;

        if(isThereARange){
            for(let i  = ppsn_min.valueOf(); i <= ppsn_max.valueOf(); i++){
                try {
                const person_obj = new person_type(i.toString());
                const new_person_result = await Person.add_person(person_obj);
                console.log('Person added: ', new_person_result);
                persons.push(new_person_result);
                } catch (error){
                    console.error('An error occurred while adding the person:', error);
                    console.error('Error occurred:', error.message);
                }
            }
        } /*else if (x.persons.ppsn_values){
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
        }*/
        return persons;
    }

    static async confirm_person_exists_on_the_system(x:confirm_person_exists_on_the_system_admin_type):Promise<IPerson & Document | null>{
        try {
            const person_obj = x.person_filter; // {ppsn: x.person_filter.ppsn};
            const person_found = await Person.retrieve_person(person_obj);
            console.log("Person found: ");
            console.log(person_found);
            return person_found;
        } catch (error) {
            console.error('An error occurred while confirming the person exists on the system:', error);
            console.error('Error occurred:', error.message);
        }
    }

    static async create_ballot(x :create_ballot_admin_type):Promise<IBallot & Document | null> {
        try 
        {
            console.log("Create Ballot obj");
            console.log(x);
            const obj = x.ballot;
            const ballot = await Ballot.add_ballot(obj);
            return ballot;
        } catch (error) {
            console.error('An error occurred while creating the ballot:', error);
            console.error('Error occurred:', error.message);
        }
    }

    static async remove_ballot(x : remove_ballot_admin_type):Promise<DeleteResult>{
        try {
            const obj = x.ballot;
            const ballot = await Ballot.remove_ballot(obj);
            return ballot;
        } catch (error) {
            console.error('An error occurred while creating the ballot:', error);
            console.error('Error occurred:', error.message);
        }
    }

    static async retrieve_ballots(x : retrieve_ballots_admin_type): Promise<Array<IBallot & Document>> {
        try {
            const obj_filter = x.ballot_filter;
            const ballots = await Ballot.retrieve_ballots(obj_filter);
            return ballots;
        } catch (error) {
            console.error('An error occurred while creating the ballot:', error);
            console.error('Error occurred:', error.message);
        }
    }

    static async retrieve_the_ballot(x:retrieve_the_ballot_admin_type): Promise<IBallot & Document> {
        try {
            const obj_filter = x.ballot_filter;
            const ballot = await Ballot.retrieve_ballot(obj_filter);
            return ballot;
        } catch (error) {
            console.error('An error occurred while creating the ballot:', error);
            console.error('Error occurred:', error.message);
        }
    }

    static async update_ballot(x: update_ballot_admin_type ): Promise<UpdateResult>{
        try {
            const obj = x.ballot;
            const ballot = await Ballot.update_ballot(obj);
            return ballot;
        } catch (error) {
            console.error('An error occurred while creating the ballot:', error);
            console.error('Error occurred:', error.message);
        }
    }

    // create candidate
    static async add_person_to_the_ballot(x:add_person_to_the_ballot_admin_type): Promise<ICandidate & Document | null>{
        try {
            const filter_person = {ppsn: x.person_filter.ppsn};
            const filter_ballot = {_id: x.ballot_filter._id};
            const filter_candidate = {person_ppsn: x.candidate.person_ppsn, ballotID: x.candidate.ballotID };

            const person_found = await Person.findOne(filter_person);
            const ballot_found = await Ballot.findOne(filter_ballot);
            const candidate_found = await Candidate.findOne(filter_candidate);

            console.log("Candidate: ");
            console.log(person_found);
            console.log(ballot_found);
            console.log(x);

            if(person_found && ballot_found && !candidate_found.$isEmpty){
                const obj = filter_candidate;
                const candidate = Candidate.add_candidate(obj);
                return candidate;
            } 
        } catch (error) {
            console.error('An error occurred while adding the person to the ballot:', error);
            console.error('Error occurred:', error.message);
        }
    }

    static async remove_person_from_the_ballot(x:remove_candidate_from_ballot_admin_type):Promise<DeleteResult>{
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


    static async start_an_election(x:start_an_election_admin_type):Promise<IElection & Document | null >{
        try {
            const filter_ballot = {_id: x.ballot._id};
            const ballot_found = await Ballot.findOne(filter_ballot);
            console.log("filter_ballot:");
            console.log(filter_ballot);
            if(ballot_found){
                const obj = x.ballot;  //{ballotID: x.ballot._id};
                const election = await Election.add_election(obj);
                console.log("election:");
                console.log(election);
                return election;
            } else {
                return null;
            }
        } catch (error) {
            console.error('An error occurred while adding the election:', error);
            console.error('Error occurred:', error.message);
        }
    }

    static async cancel_the_election(x : cancel_the_election_admin_type): Promise<DeleteResult> {
        try {
            const filter_ballot = {ballotID: x.ballot._id}
            const ballot_found = await Ballot.findOne(filter_ballot);
            if(ballot_found){
                const election = Election.remove_election(x.ballot);
                return election;
            } else {
                return null;
            }
        } catch (error) {
            console.error('An error occurred while removing the election:', error);
            console.error('Error occurred:', error.message);
        }
    }

    static async retrieve_elections(x:retrieve_elections_admin_type):Promise<Array<IElection & Document>>{
        try {
            const obj = {};
            const ballot = await Election.retrieve_elections();
            return ballot;
        } catch (error) {
            console.error('An error occurred while creating the ballot:', error);
            console.error('Error occurred:', error.message);
        }
    }

    static async retrieve_the_election(x:retrieve_the_election_admin_type):Promise<IElection & Document>{
        try {
            const obj = x.ballot;
            const election = await Election.retrieve_the_election(obj);
            return election;
        } catch (error) {
            console.error('An error occurred while creating the ballot:', error);
            console.error('Error occurred:', error.message);
        }
    }

    static async retrieve_the_candidate(x: retrieve_the_candidate_admin_type):Promise<ICandidate & Document>{
        try {
            const obj = {_id: x.candidate._id};
            const candidate = await Candidate.retrieve_the_candidate(obj);

            return candidate;
        } catch (error) {
            console.error('An error occurred retrieving person:', error);
            console.error('Error occurred:', error.message);
        }
    }

    static async retrieve_selected_person_for_candidate_selection(x:retrieve_selected_person_for_candidate_selection_admin_type):Promise<IPerson & Document>{
        try {
            const obj = x.person; // {ppsn: x.person.ppsn};
            const person = await Person.retrieve_person(obj);

            return person;
        } catch (error) {
            console.error('An error occurred retrieving person:', error);
            console.error('Error occurred:', error.message);
        }
    }

    static async retrieve_candidates_for_the_ballot(x:retrieve_candidates_for_the_ballot_admin_type):Promise<Array<ICandidate & Document>>{
        try {
            const obj = {ballotID: x.ballot._id};
            const candidates = await Candidate.retrieve_candidates(obj);
            return candidates;
        } catch (error) {
            console.error('An error occurred retrieving person:', error);
            console.error('Error occurred:', error.message);
        }
    }

    
    static async retrieve_runnable_ballots(x:retrieve_runnable_ballots_admin_type):Promise<any>{
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

    static async retrieve_the_admin(x: retrieve_the_admin_admin_type): Promise<IAdmin & Document> {
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

interface IAdminModel extends Model<IAdmin>{
    add_person_range(x :add_persons_range_admin_type):Promise<Array<IPerson & Document>>;
    confirm_person_exists_on_the_system(x:confirm_person_exists_on_the_system_admin_type):Promise<IPerson & Document | null>;
    create_ballot(x :create_ballot_admin_type):Promise<IBallot & Document | null>;
    remove_ballot(x : remove_ballot_admin_type):Promise<DeleteResult>;
    retrieve_ballots(x : retrieve_ballots_admin_type): Promise<Array<IBallot & Document>>;
    retrieve_the_ballot(x:retrieve_the_ballot_admin_type): Promise<IBallot & Document>;
    update_ballot(x: update_ballot_admin_type ): Promise<UpdateResult>;
    add_person_to_the_ballot(x:add_person_to_the_ballot_admin_type): Promise<ICandidate & Document | null>;
    remove_person_from_the_ballot(x:remove_candidate_from_ballot_admin_type):Promise<DeleteResult>;
    start_an_election(x:start_an_election_admin_type):Promise<IElection & Document | null >;
    cancel_the_election(x : cancel_the_election_admin_type): Promise<DeleteResult>;
    retrieve_elections(x:retrieve_elections_admin_type):Promise<Array<IElection & Document>>;
    retrieve_the_election(x:retrieve_the_election_admin_type):Promise<IElection & Document>;
    retrieve_the_candidate(x: retrieve_the_candidate_admin_type):Promise<ICandidate & Document>;
    retrieve_selected_person_for_candidate_selection(x:retrieve_selected_person_for_candidate_selection_admin_type):Promise<IPerson & Document>;
    retrieve_candidates_for_the_ballot(x:retrieve_candidates_for_the_ballot_admin_type):Promise<Array<ICandidate & Document>>;
    retrieve_the_admin(x: retrieve_the_admin_admin_type): Promise<IAdmin & Document>;
    retrieve_runnable_ballots(x:retrieve_runnable_ballots_admin_type):Promise<any>;
}


export const Admin = getModel<IAdmin, IAdminModel>({modelName: 'Admin', modelSchema: adminSchema});

// export default Admin;