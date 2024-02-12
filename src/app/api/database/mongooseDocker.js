import mongoose from "mongoose";
import { type } from "requests";

/* NOTE

    schema, model essentially set

    classes for actor actions need definition
        Admin 
            add_stub_accounts               stub (ppsn) + pass ?+ person details = registed account = user => User.add_account
            add_ballot
            add_person_to_ballot            person id + ballot id = candidate => Candidate.add_candidate
            remove_person_to_ballot
            add_election                    ballot id in election collection = election => Election.add_election
            remove_election
        
        User
            register_an_account             stub (ppsn) + ( user + person ) details => registered account 
            login_to_an_account             user details => account login
            
            add_a_user_account
            remove_a_user_account
            modify_a_user_account

        Voter
            // Maintenance Methods
            add_voter
            remove_voter
        
            // Action methods
            cast_a_vote


        Candidate
            add_candidate
            remove_candidate

        Ballot 
            add_ballot
            remove_ballot

        Election
            add_election
            remove_election

        Vote 
            add_vote

        Log 
            add_log


*/

/* actions / calls

    mongoose.connect()
    new mongoose.Schema()
    mongoose.model()
    model1.create()
    mongoose.startSession()
    session.startTransaction()
    session.commitTransaction()
    session.abortTransaction()
    session.endSession()
    try...catch
    finally      



    withTransactions( fn )      uses transactions
    Transaction.run(run)  = {  return withTransaction(fn); }

    Page logic

    User
        Register
            ppsn, pass = user
            name, address, phone, email = person 
            
                user1 = new User();
                Transaction.run(user1.register_an_account(x));         


        Login
            login = ppsn + pass

                user1 = new User();
                Transaction.run(user1.log_into_account(x));
                

    Admin
        Load ppsn
            ppsn to user and person = valid logins to register
                
                admin1 = new Admin();
                Transaction.run(admin.add_stub_accounts(x));

        Add person to ballot sheet
            ppsn + ballot id = candidate

                admin1 = new Admin();
                Transaction.run(admin.add_stub_accounts(x));


    Voter
        Cast vote
            View the ballot for a running election
            Vote for a candidate.
                Log vote with time log server
            
*/


const uri = 'mongodb://localhost:27017/EVote';
const options = { useNewUrlParser: true, useUnifiedTopology: true};
mongoose.connect(uri, options);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const userSchema = new Schema({
    ppsn: {type: String, required: true, unique: true, ref: 'Person'},
    pass: {type: String, required: true},
    token: {type: String, required: false}
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
    //id:{type: String, required: true, unique: true},
    ballotID: {type: String, required: true, unique: true}
})

const ballotSchema = new Schema({
    //id: {type: String, required: true, unique: true},
    title: {type: String, required: false},
    closing_time: {type: String, required: true}
})

const voterSchema = new Schema({
    ppsn: {type: String, required: true, unique: true, ref: 'Person'},
    //id: {type: String, required: true, unique: true}
});

const voteSchema = new Schema({
    //id: {type: String, required: true, unique: true},
    voterID: {type: String, required: true, unique: true, ref: 'Voter'},
    candidateID: {type: String, required: true, unique: true, ref: 'Candidate'}
});

const logSchema = new Schema({
    voteID: {type: String, required: true, unique: true, ref: 'Vote'},
    timestamp_created: {type: Date, default: Date.now, required: true, unique: true},
    timestamp_updated: {type: Date, default: Date.now}
});
logSchema.pre('save', function(next) {
    this.timestamp_updated = Date.now();
    next();
});

logSchema.pre('update', function() {
    this.update({}, { $set: { timestamp_updated = Date.now() } });
});

logSchema.pre('findOneAndUpdate', function() {
    this.set( { timestamp_updated: Date.now() } ) ;
});

const adminSchema = new Schema({
    ppsn: {type: String, required: true, unique: true, ref: 'Person'},
    //id: {type: String, required: true, unique: true}
});

const electionSchema = new Schema({
    ballotID: {type: String, required: true, unique: true, ref: 'Ballot'}
});

// Models
// - system


// - application


class PersonClass {

    static async add_person_details(x){
        try {
            const user = await Person.save(x);
        } catch (error) {
            console.error('Error creating the person details: ', error);
        }
    }

    static async update_person_details(x){
        try {
            const user = await Person.updateOne(x.ppsn,x);
        } catch (error) {
            console.error('Error creating the person details: ', error);
        }
    }

    static async remove_person_details(x){
        try {
            const user = await Person.deleteOne(x.ppsn, x);
        } catch (error) {
            console.error('Error deleting the person details: ', error);
        }
    }
}
personSchema.loadClass(PersonClass)
const Person = mongoose.model('Person', personSchema);

class UserClass extends PersonClass {

    static async register_an_account(x){
        try {
            const filter = {ppsn: x.ppsn};
            const user = await User.findOne(x.ppsn);
            userData = {ppsn: x.ppsn, pass: x.pass };
            if(user) User.add_user_account(userData);
            const user_confimed = await User.findOne(userData);
            personData = {ppsn: x.ppsn, name: x.name, address: x.address, phone: x.phone, email: x.email, date_of_birth: x.date_of_birth};
            if(user_confimed) await Person.add_person_details(personData);
        } catch (error) {
            
        }
    }

    static async update_person_details(x){
        try {
            const filter = {ppsn: x.ppsn};
            const person = await Person.findOne(x.ppsn);
            personData = {ppsn: x.ppsn, name: x.name, address: x.address, phone: x.phone, email: x.email, date_of_birth: x.date_of_birth};
            if(user) await Person.update_person_details(personData);
        } catch (error) {
            
        }

    }

    static async log_into_account(x){
        try {
            const filter = {ppsn: x.ppsn, pass: x.pass};
            const user = await User.findOne(filter);

        } catch (error){

        }

    static async add_user_account(x){
        try {
            const user = await User.save(x);
        } catch (error) {
            console.error('Error creating the user: ', error);
        }
    }

    static async update_user_account(x){
        try {
            const user = await User.updateOne(x.ppsn, x);
        } catch (error) {
            console.error('Error creating the user: ', error);
        }
    }

    static async remove_user_account(x){
        try {
            const user = await User.deleteOne(x);
        } catch (error) {
            console.error('Error removing the user: ', error);
        }
    }
}
userSchema.loadClass(UserClass)
export const User = mongoose.model('User', userSchema);

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
const Admin = mongoose.model('Admin', adminSchema);

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
    // admin loads the stubs = user is completing the details (ppsn and pass minimum information) 

    static async cast_a_vote(x){
        try {
            const voteData = {ppsn: ppsn, CandidateID: x.CandidateID}; 
            const voter = Voter.findOne({ppsn: voteData.ppsn});
            const candidate = Candidate.findOne({candidateID: voteData.CandidateID});
            if(voter && candidate) await Vote.add_vote(voteData);

        } catch (error) {
            
        }

    }
}
voteSchema.loadClass(VoterClass)
const Voter = mongoose.model('Voter', voterSchema);

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
    static async add_election(){
        try {
            const election = await Election.create(x);
        } catch (error) {
            
        }
    }
}
electionSchema.loadClass(ElectionClass);
const Election = mongoose.model('Election', electionSchema);

class VoteClass {
    static async add_vote(x){
        try {
            const result = await Vote.save(x);
            const logResult = await Log.add
        } catch (error) {
            
        }
    }
}
voteSchema.loadClass(VoteClass);
const Vote = mongoose.model('Vote', voteSchema);

class LogClass {
    static async add_log(x){
        const logData = {voteID: x._id}
        const log = new Log(x); 
        const result = await log.save(x);
    }
}
logSchema.loadClass(LogClass)
const Log = mongoose.model('Log', logSchema); 


async function withTranaction(fn){
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const result = await fn(session);
        await session.commitTransaction();
        return result;
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
}

export class Transaction {

    static async run(fn) {

        return withTranaction(fn);
        
    }


};