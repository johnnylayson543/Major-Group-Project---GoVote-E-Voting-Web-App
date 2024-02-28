import { tally_votes_teller_type } from "../../../../../Forms/Teller/Vote/tally_votes_teller_type"
import { run_model_method } from "../../../helper/helper";

export async function GET(req, res) {
    // Make a note we are on
    // the api. This goes to the console.
    console.log("in the getTally api page")
    // get the values
    // that were sent across to us.    
    const { searchParams } = new URL(req.url)
    const obj = new tally_votes_teller_type(searchParams);
    
    const x = obj;
    const xy = {fn: Vote.tallY_votes, par: x};
    const result = run_model_method(xy);
    
    return Response.json({ "data":"okay", "result": result});

    }