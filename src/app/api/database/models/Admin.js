import mongoose from "mongoose";
import { mongoose_client } from "../mongooseDocker";
import { getModel } from "./helpers/helpers";
import { User } from "./User";
import { Ballot } from "./Ballot";
import { Candidate } from "./Candidate";
import { Person } from "./Person";
import { Election } from "./Election";

const adminSchema = new mongoose.Schema ({
    ppsn: {type: String, required: true, unique: true, ref: 'Person'},
    //id: {type: String, required: true, unique: true}
});

class AdminClass extends UserClass {


    static async add_stub_accounts(x){
        for(let i = 1; i <= x; i++){
            try {
            const userData = {ppsn: i, pass: ""};
            const new_user = await User.add_user_account(userData);
            console.log('Useer created: ', new_user);
            } catch (error){
                console.error('An error occurred while creating the user account:', error);
            }
        }
    }

    static async create_ballot(x){
        try {
            const ballotData = x;
            const ballot = await Ballot.add_ballot(ballotData);
        } catch (error) {
            console.error('An error occurred while creating the ballot:', error);
        }
    }

    // create candidate
    static async add_person_to_the_ballot(person1, ballot1){
        try {
            const person = await Person.findOne(person1);
            const ballot = await Ballot.findOne(ballot1);
            const candidate = Candidate.add_candidate({ppsn: person.ppsn, ballotID: ballot._id});
        } catch (error) {
            console.error('An error occurred while adding the person to the ballot:', error);
        }
    }

    static async remove_person_from_the_ballot(person1, ballot1){
        try {
            const person = await Person.findOne(person1);
            const ballot = await Ballot.findOne(ballot1);
            const candidate = Candidate.remove_candidate({ppsn: person.ppsn, ballotID: ballot._id});
        } catch (error) {
            console.error('An error occurred while adding the person to the ballot:', error);
        }
    }


    static async add_election(ballot1){
        try {
            const ballot = await Ballot.findOne(ballot1);
            const election = await Election.add_election({ballotID: ballot._id});
        } catch (error) {
            console.error('An error occurred while adding the election:', error);
        }
    }

    static async remove_election(ballot1){
        try {
            const ballot = await Ballot.findOne(ballot1);
            const result = await Election.deleteOne({ballotID: ballot._id});
        } catch (error) {
            console.error('An error occurred while removing the election:', error);
        }
    }

}
adminSchema.loadClass(AdminClass);


const Admin = getModel('Admin', adminSchema);

export default Admin;