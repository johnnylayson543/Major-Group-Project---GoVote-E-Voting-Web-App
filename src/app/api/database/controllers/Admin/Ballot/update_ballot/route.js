import { update_ballot_admin_type } from "../../../../../Forms/Admin/Ballot/update_ballot_admin_type";
import { run_model_method } from "../../../helper/helper";
import { Admin } from "../../../../models/Admin";

export async function GET(req, res) {
    // Make a note we are on
    // the api. This goes to the console.
    console.log("in the putInCart api page");
    // get the values
    // that were sent across to us.
    const { searchParams } = new URL(req.url)
    const obj = new update_ballot_admin_type(searchParams);
    
    const x = obj;
    const xy = {fn: Admin.update_ballot, par: x};
    const result = await run_model_method(xy);

    return Response.json({ "data":"okay", "result": result});
}