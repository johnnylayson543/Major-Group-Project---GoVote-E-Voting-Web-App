import { add_candidate_to_ballot_admin_type } from "../../Forms/Admin/add_candidate_to_ballot_admin_type";

export async function GET(req, res) {
    // Make a note we are on
    // the api. This goes to the console.
    console.log("in the putInCart api page")
    // get the values
    // that were sent across to us.
    const { searchParams } = new URL(req.url)
    const obj = new add_candidate_to_ballot_admin_type(searchParams);
  
    const x = obj;
    const xy = {fn: Admin.add_person_to_the_ballot, par: x};
    console.log("form_obj: " + String.toString(x));
    console.log("The function and its parameters to pass: " + String.toString(xy));
    
    console.log("Database transaction stage begins.");
    const result = await Transaction.run(xy);
    console.log("Passed database transaction stage.\n");


    
    console.log(pname);
    // =================================================
    client = getClient();
    database = client.db;
    const collection = database.collection('candidates'); // collection name
    var myobj = { ppsn: ppsn, ballotID: ballotID };  // candidate object
    const insertResult = await collection.insertOne(myobj); // insert candidate to candidate collection
    //==========================================================
    // at the end of the process we need to send something back.
    return Response.json({ "data":"" + "inserted" + ""})
    }