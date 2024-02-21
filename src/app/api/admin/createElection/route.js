import { create_an_election_admin_type } from "../../Forms/Admin/create_an_election_admin_type";

export async function GET(req, res) {
    // Make a note we are on
    // the api. This goes to the console.
    console.log("in the putInCart api page")
    // get the values
    // that were sent across to us.
    const { searchParams } = new URL(req.url)
    const obj = new create_an_election_admin_type(searchParams);
        
    const x = obj;
    const xy = {fn: Admin.add_election, par: x};
    
    console.log("form_obj: " + String.toString(x));
    console.log("The function and its parameters to pass: " + String.toString(xy));
    
    console.log("Database transaction stage begins.");
    const result = await Transaction.run(xy);
    console.log("Passed database transaction stage.\n");


    //==========================================================
    // at the end of the process we need to send something back.
    return Response.json({ "data":"" + "inserted" + ""})
    }