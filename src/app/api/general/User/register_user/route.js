import mongoose from "mongoose";
//import { performDatabaseOperation } from "../../database/databasetemplate";
import { Transaction } from "../../../database/mongooseDocker";
import { User } from "../../../database/models/User";
import { register_user_type } from "../../../Forms/User/register_user_type";

export async function GET(req, res) {
  // Make a note we are on
  // the api. This goes to the console.
  console.log("in the register api page")
  // get the values
  // that were sent across to us.
  const { searchParams } = new URL(req.url)
  obj = new register_user_type(searchParams);
  const x = { user: obj_user, person_details: obj_person_details};
  const xy = {fn: User.register_an_account, par: x};
  
  console.log("form_obj: " + String.toString(x));
  console.log("The function and its parameters to pass: " + String.toString(xy));
  
  console.log("Database transaction stage begins.");
  const result = await Transaction.run(xy);
  console.log("Passed database transaction stage.\n");
  
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
