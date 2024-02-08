import mongoose from "mongoose";
import { type } from "requests";

/* NOTE 

    Classes for the actors action are in progress and need to be defined.

    How to export so other files can reference.

    Then this file will be used in other files for working with the system

        // example of register
        data = searchParams()           // for user and person combined
        user = new User();
        const result = user.register_user( data );


        // example login
        data = searchParams();
        user = new User();
        const result = User.login(data);

        return response ( data : okay, result:  result )

*/


const uri = 'mongodb://localhost:27017/EVote';

mongoose.connect(urim, { useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;


db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const userSchema = new Schema({
    ppsn: {type: String, required: true, unique: true, ref: 'Person'},
    pass: {type: String, required: true}
});

const personSchema = new Schema({
    ppsn: {type: String, required: true, unique: true},
    name: {type: String, required: false},
    address: {type: String, required: false},
    phone: {type: String, required: false},
    email: {type: String, required: false}
})

const candidateSchema = new Schema({
    ppsn: {type: String, required: true, unique: true, ref: 'Person'},
    id:{type: String, required: true, unique: true},
    ballotID: {type: String, required: true, unique: true}
})

const ballotSchema = new Schema({
    id: {type: String, required: true, unique: true},
    title: {type: String, required: false},
    closing_time: {type: String, required: true}
})

const voterSchema = new Schema({
    ppsn: {type: String, required: true, unique: true, ref: 'Person'},
    id: {type: String, required: true, unique: true}
});

const voteSchema = new Schema({
    id: {type: String, required: true, unique: true},
    voterID: {type: String, required: true, unique: true, ref: 'Voter'},
    candidateID: {type: String, required: true, unique: true, ref: 'Candidate'}
});

const logSchema = new Schema({
    voteID: {type: String, required: true, unique: true, ref: 'Vote'},
    timestamp: {type: String, required: true, unique: true}
});

const adminSchema = new Schema({
    ppsn: {type: String, required: true, unique: true, ref: 'Person'},
    id: {type: String, required: true, unique: true}
});

// Models
// - system
const User = mongoose.model('User', userSchema);
const Admin = mongoose.model('Admin', adminSchema);
// - application
const Person = mongoose.model('Person', personSchema);
const Candidate = mongoose.model('Candidate', candidateSchema);
const Ballot = mongoose.model('Ballot', ballotSchema);
const Voter = mongoose.model('Voter', voterSchema);
const Vote = mongoose.model('Vote', voteSchema);
const Log = mongoose.model('Log', logSchema); 

// - application


class PersonClass {
}
personSchema.loadClass(PersonClass)
const Person = mongoose.model('Person', personSchema);

class UserClass extends PersonClass {
    static async add_user_account(x){
        try {
            const user = await User.create(x);
        } catch (error) {
            console.error('Error creating the user: ', error);
        }
    }
}
userSchema.loadClass(UserClass)
const User = mongoose.model('User', userSchema);

/*


*/
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
const AdminModel = mongoose.model('Admin', adminSchema);

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
const Candidate = mongoose.model('Candidate', candidateSchema);


class VoterClass extends User {
    static async register_an_account(x){
        try {
            const filter = {ppsn: x.ppsn};
            const person = await Person.findOne(x.ppsn);
            const user = await User.findOne(x.ppsn);

            obj = {ppsn: x.ppsn, pass: x.pass};
            const new_user = await User.save(obj)

        } catch (error) {
            
        }

    }

    static async log_into_account(x){

    }

    static async cast_a_vote(x){

    }
}
voteSchema.loadClass(VoterClass)
const VoterModel = mongoose.model('Voter', voterSchema);

class BallotClass {

    static async add_ballot(x){
        try {
            const ballot = await Ballot.create(x);
        } catch (error) {
            console.error('Error creating the ballot: ', error);
        }
    }
}
ballotSchema.loadClass(BallotClass)
const Ballot = mongoose.model('Ballot', ballotSchema);

class ElectionClass {
    add_election(){
        try {
            const election = await Election.create(x);
        } catch (error) {
            
        }
    }
}
electionSchema.loadClass(ElectionClass);
const Election = mongoose.model('Election', electionSchema);

class VoteClass {
}
voteSchema.loadClass(VoteClass);
const VoteModel = mongoose.model('Vote', voteSchema);

class LogClass {
}
logSchema.loadClass(LogClass)
const LogModel = mongoose.model('Log', logSchema); 