import mongoose from "mongoose";
//import { performDatabaseOperation } from "../../database/databasetemplate";
import { Transaction } from "../../database/mongooseDocker";
import { User } from "../../database/models/User";

export async function GET(req, res) {
  // Make a note we are on
  // the api. This goes to the console.
  console.log("in the register api page")
  // get the values
  // that were sent across to us.
  const { searchParams } = new URL(req.url)

  
  const email = searchParams.get('email')
  const dateofbirth = searchParams.get('dob')
  const ppsn = searchParams.get('ppsn')
  const pass = searchParams.get('pass')

  const x = { user: {ppsn: ppsn, pass: pass}, person_details: {email: email, dateofbirth:dateofbirth}};
  //const user = new User();
  const result = await Transaction.run(User.register_an_account(x));
  console.log(result);

  // EVote {
      
    // Evote Application Entity Relations
      // Person {ppsn(ID), name, address, phone, email}
      
      // Candidate { ppsn (PersonID), (candidate)ID, ballotID }
      // Ballot { (ballot)ID, title, closing time }
      
      // Voter { ppsn (PersonID), voterID }
      
      // Vote { (vote)ID, voterID, candidateID }
      // Log { voteID, timestamp  }

      // System Entities
       // Admin {ppsn, adminID }
       // User {ppsn, pass}

  // }


  // Database Operation Form

  /*
  const dbname1 = "Evote";        // Database Name
  const collection1 = "User";     // 
  const collection2 = "Person";   //
  const kind1 = "FIND";       // Database Operation Type 
  const obj_user = {ppsn: ppsn, pass: pass};
  const obj_person = {ppsn: ppsn};

  const result_person = await performDatabaseOperation(dbname1, collection2, kind1, obj_person);

  if(result_person.length === 1){
    const result_account = await performDatabaseOperation(dbname1, collection1, kind1, obj_user);
    
    const filter = obj_person;
    const update = {ppsn: ppsn, email: email, dateofbirth: dateofbirth};
    const obj1 = {filter: filter, update: update};
    
    const kind2 = "UPDATE_ONE";
    const result_update_person = await performDatabaseOperation(dbname1, collection2, kind2, obj1);
  }
  */

  return Response.json({ "data":"ok" })
  }
