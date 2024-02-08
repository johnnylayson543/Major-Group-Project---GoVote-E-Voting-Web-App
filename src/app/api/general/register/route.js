import { performDatabaseOperation } from "../database/databasetemplate";

export async function GET(req, res) {
  // Make a note we are on
  // the api. This goes to the console.
  console.log("in the register api page")
  // get the values
  // that were sent across to us.
  const { searchParams } = new URL(req.url)

  const ppsn = searchParams.get('ppsn')
  // const name = searchParams.get('name')
  // const address = searchParams.get('address')
  // const email = searchParams.get('email')
  // const phone = searchParams.get('phone')
  // const dateofbirth = searchParams.get('dateofbirth')
  const pass = searchParams.get('pass')


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

  const dbname1 = "Evote";      // Database Name
  const collection1 = "Person"; // Database Collection
  const kind1 = "INSERT";       // Database Operation Type 
      // > [ 
      //     INSERT = Insert One, 
      //     INSERT_MANY = Insert Many, 
      //     FIND = Find many , 
      //     UPDATE_ONE = Update first instance 
      //   ]

<<<<<<< Updated upstream
  const obj1 = { ppsn: ppsn,  pass: pass }; // Database Object

  // Execute the database operation
  const result1 = await performDatabaseOperation(dbname1, collection1, kind1, obj1);
  

  console.log(ppsn);
 // console.log(name);
  //console.log(address)
  //console.log(email)
  //console.log(phone);
  //console.log(dateofbirth);
  // database call goes here
  // at the end of the process we need to send something back.

// =================================================
client = getClient();
    database = client.db;
    const collection = database.collection('person'); // collection name
var myobj = { ppsn: ppsn, name: name, address: address, email: email, dateofbirth: dateofbirth }; // create object for person collection
const insertResult = await collection.replaceOne({ppsn: ppsn}, myobj); // find existing document with matching ppsn, and replace with new person document
//==========================================================

=======
  const result_person = await performDatabaseOperation(dbname1, collection2, kind1, obj_person);
  const result_user = await performDatabaseOperation(dbname1, collection1, kind1, obj_user);


  if(result_person.length === 1){

    const filter = obj_person;

    if(result_user.length === 0){
      const kind3 = "INSERT";
      const result_account = await performDatabaseOperation(dbname1, collection1, kind1, obj_person);
      if(result_account === 1){    
        const update = obj_user;
        const obj1 = {filter: filter, update: update};
        
        const kind2 = "UPDATE_ONE";
        const result_update_person = await performDatabaseOperation(dbname1, collection1, kind2, obj1);
      } else if (result_account === 0){
        const result_account1 = await performDatabaseOperation(dbname1, collection1, kind3, obj_user);
      }
    }

    
    const update = {ppsn: ppsn, email: email, dateofbirth: dateofbirth};
    const obj1 = {filter: filter, update: update};
    
    const kind2 = "UPDATE_ONE";
    const result_update_person = await performDatabaseOperation(dbname1, collection2, kind2, obj1);
  }
>>>>>>> Stashed changes

  return Response.json({ "data":"ok" })
  }