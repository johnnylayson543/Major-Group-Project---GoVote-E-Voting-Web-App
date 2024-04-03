import { retrieve_the_tally_for_the_election_teller_type } from "../../../../../../Forms/Teller/Election/Vote/retrieve_the_tally_for_the_election_teller_type"
import { run_model_method } from "../../../../helper/helper";
import { Teller } from "@/app/api/database/models/Teller";

export async function GET(req, res) {
    // Make a note we are on
    // the api. This goes to the console.
    console.log("in the getTally api page")
    // get the values
    // that were sent across to us.    
    const { searchParams } = new URL(req.url)
    const obj = new retrieve_the_tally_for_the_election_teller_type(searchParams);
    
    const x = obj;
    const xy = {fn: Teller.retrieve_the_tally_for_election, par: x};
    const result = await run_model_method(xy);
    
    return Response.json({ "data":"okay", "result": result});

    }