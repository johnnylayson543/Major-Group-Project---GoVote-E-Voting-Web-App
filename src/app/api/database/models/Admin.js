import mongoose from "mongoose";
import { getModel } from "./helpers/helpers";
import { User } from "./User";
import { Ballot } from "./Ballot";
import { Candidate } from "./Candidate";
import { Person } from "./Person";
import { Election } from "./Election";

const adminSchema = new mongoose.Schema ({
    ppsn: {type: String, required: true, unique: true, ref: 'Person'}
    //id: {type: String, required: true, unique: true}
});

class AdminClass extends UserClass {

    static async add_person_range(x){
        if(x.min && x.max){
            for(let i = x.min; i <= x.max; i++){
                try {
                const person_obj = {ppsn: i};
                const new_person_result = await Person.add_person(person_obj);
                console.log('Person added: ', new_person_result);
                } catch (error){
                    console.error('An error occurred while adding the person:', error);
                    console.error('Error occurred:', error.message);
                }
            }
        } else if (x.values){
            for(this1 in x.values){
                try {
                const person_obj = {ppsn: i};
                const new_person_result = await Person.add_person(person_obj);
                console.log('Person added: ', new_person_result);
                } catch (error){
                    console.error('An error occurred while adding the person:', error);
                    console.error('Error occurred:', error.message);
                }
            }
        }
    }

    static async create_ballot(x){
        try {
            const obj = {ballotID: x.ballotID};
            const ballot = await Ballot.add_ballot(obj);
        } catch (error) {
            console.error('An error occurred while creating the ballot:', error);
            console.error('Error occurred:', error.message);
        }
    }

    // create candidate
    static async add_person_to_the_ballot(x){
        try {
            const filter_person = {ppsn: x.person.ppsn};
            const filter_ballot = {ballotID: x.ballot.ballotID};

            const person_found = await Person.findOne(filter_person);
            const ballot_found = await Ballot.findOne(filter_ballot);

            if(person_found && ballot_found){
                const obj = {ppsn: x.person.ppsn, ballotID: x.ballot._id};
                const candidate = Candidate.add_candidate(obj);
            }
        } catch (error) {
            console.error('An error occurred while adding the person to the ballot:', error);
            console.error('Error occurred:', error.message);
        }
    }

    static async remove_person_from_the_ballot(x){
        try {
            const filter_person = {ppsn: x.person.ppsn};
            const filter_ballot = {ballotID: x.ballot._id};

            const person_found = await Person.findOne(filter_person);
            const ballot_found = await Ballot.findOne(filter_ballot);

            if(person_found && ballot_found){
                const obj = {ppsn: x.person.ppsn, ballotID: x.ballot._id};
                const candidate = Candidate.remove_candidate(obj);
            }
        } catch (error) {
            console.error('An error occurred while removed the person to the ballot:', error);
            console.error('Error occurred:', error.message);
        }
    }


    static async add_election(x){
        try {
            const filter_ballot = {ballotID: x.ballotID};
            const ballot_found = await Ballot.findOne(filter_ballot);
            if(ballot_found){
                const election = await Election.add_election({ballotID: ballot1._id});
            }
        } catch (error) {
            console.error('An error occurred while adding the election:', error);
            console.error('Error occurred:', error.message);
        }
    }

    static async remove_election(x){
        try {
            const filter_ballot = {ballotID: x.ballotID}
            const ballot_found = await Ballot.findOne(filter_ballot);
            if(ballot_found){
                const result = await Election.deleteOne({ballotID: ballot._id});
            }
        } catch (error) {
            console.error('An error occurred while removing the election:', error);
            console.error('Error occurred:', error.message);
        }
    }

}

adminSchema.loadClass(AdminClass);

const Admin = getModel('Admin', adminSchema);

export default Admin;