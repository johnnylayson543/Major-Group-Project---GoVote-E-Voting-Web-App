import { remove_candidate_from_ballot_admin_type } from "../../Forms/Admin/remove_candidate_from_ballot_admin_type";
import { run_model_method } from "../../../helper/helper";
import { Admin } from "../../../../models/Admin";

export async function GET(req, res) {
    // Make a note we are on
    // the api. This goes to the console.
    console.log("in the Admin, remove_person_to_ballot_removeCandidate api page")
    // get the values
    // that were sent across to us.
    const { searchParams } = new URL(req.url)
    const obj = new remove_candidate_from_ballot_admin_type(searchParams);
  
    const x = obj;
    const xy = {fn: Admin.remove_candidate_from_ballot, par: x};
    const result = run_model_method(xy);

    return Response.json({ "data": "okay", "result": result});
    }