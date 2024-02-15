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
          //'mongodb://root:example@localhost:27017/'
//const uri = 'mongodb://root:example@mongo:27017/';
//const uri = 'mongodb://root:example@localhost:27017/EVote';
const uri = 'mongodb://root:example@localhost:27017/EVote?authSource=admin';
const options = {};
const otherOptions = (err, client) => {
    // ... use the client ...
  };

mongoose.connect(uri, options).catch(err => {
    console.error('.MongoDB connection error:', err);
  });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
/*db.on('open', function() {
    // Connection successful
    console.log('Connected to MongoDB!');
  });*/

async function withTransaction(xy){
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        if(typeof xy.fn != "function"){
            throw new TypeError('The first argument must be a function');
        }
        console.log("Passed function check.");
        const result = await xy.fn(xy.par, session);
        console.log(result);
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

    static async run(xy) {

        return await withTransaction(xy);
        
    }


};

export const mongoose_client = db;

//export default mongoose_client;

