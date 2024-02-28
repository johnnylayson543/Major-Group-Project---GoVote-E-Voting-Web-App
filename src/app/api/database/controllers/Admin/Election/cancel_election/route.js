import { create_an_election_admin_type } from "../../Forms/Admin/cancel_an_election_admin_type";
import { run_model_method } from "../../../helper/helper";

export async function GET(req, res) {
    // Make a note we are on
    // the api. This goes to the console.
    console.log("in the putInCart api page")
    // get the values
    // that were sent across to us.
    const { searchParams } = new URL(req.url)
    const obj = new cancel_an_election_admin_type(searchParams);
        
    const x = obj;
    const xy = {fn: Admin.cancel_an_election, par: x};
    const result = run_model_method(xy);

    //==========================================================
    // at the end of the process we need to send something back.
    return Response.json({ "data":"okay", "result": result});
    }