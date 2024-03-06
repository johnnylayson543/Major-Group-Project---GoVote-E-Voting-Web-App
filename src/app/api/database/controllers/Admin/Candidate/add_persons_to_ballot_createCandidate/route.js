import { add_candidate_to_ballot_admin_type } from "../../Forms/Admin/add_candidate_to_ballot_admin_type";
import { run_model_method } from "../../../helper/helper";

export async function GET(req, res) {
    // Make a note we are on
    // the api. This goes to the console.
    console.log("in the Admin, add_person_to_ballot_createCandidate api page")
    // get the values
    // that were sent across to us.
    const { searchParams } = new URL(req.url)
    const obj = new add_candidate_to_ballot_admin_type(searchParams);
  
    const x = obj;
    const xy = {fn: Admin.add_person_to_the_ballot, par: x};
    const result = run_model_method(xy);

    return Response.json({ "data": "okay", "result": result});
    }