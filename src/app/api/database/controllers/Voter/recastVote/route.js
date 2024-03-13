import { Collection, MongoClient } from "mongodb";
import { getClient, client } from "../../../.old/mongoDBCloud";

export async function GET(req, res) {

    const { searchParams } = new URL(req.url);  //  This is where the data from the front end form is made into an object using a form type. It has obj.user , obj.person_details.
    const x = obj;
    const xy = {fn: Voter.recast_vote, par: x};  // This is where you send the Model.function_name, object.

    console.log("form_obj: " + String.toString(x));
    console.log("The function and its parameters to pass: " + String.toString(xy));

    console.log("Database transaction stage begins.");
    const result = await Transaction.run(xy);
    console.log("Passed database transaction stage.\n");

    // Send a response back
    return Response.json({ "data": "" + "updated" + "" });
}
