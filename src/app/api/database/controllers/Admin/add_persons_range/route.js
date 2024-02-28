import { Collection, MongoClient } from "mongodb"
import { performDatabaseOperation, result } from "../../database/.old/databasetemplate";
import { getClient, client  } from "../../database/.old/mongoDBCloud";
import { add_persons_range_admin_type } from "../../Forms/Admin/add_persons_range_admin_type";


export async function GET(req, res) {
    // Make a note we are on
    // the api. This goes to the console.
    console.log("in the putInCart api page");
    // get the values
    // that were sent across to us.
    const { searchParams } = new URL(req.url);
    const obj = new add_persons_range_admin_type(searchParams);
    const x = obj;
    const xy = {fn: Admin.add_person_range, par: x};

    console.log("From " + obj.persons.ppsn_range.min + " to " + obj.persons.ppsn_range.max + ". ");

    console.log("form_obj: " + String.toString(x));
    console.log("The function and its parameters to pass: " + String.toString(xy));
    
    console.log("Database transaction stage begins.");
    const result = await Transaction.run(xy);
    console.log("Passed database transaction stage.\n");

    return Response.json({ "data":"ok", result: result });
}


