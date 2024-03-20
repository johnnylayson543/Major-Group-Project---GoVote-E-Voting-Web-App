import { retrieve_the_candidate_and_associated_information_voter_type } from "../../../../../Forms/Voter/Candidate/retrieve_the_candidate_and_associated_information";
import { run_model_method } from "../../../helper/helper";
import { Voter } from "../../../../models/Voter";

export async function GET(req, res) {
    // Make a note we are on
    // the api. This goes to the console.
    console.log("in the putInCart api page");
    // get the values
    // that were sent across to us.
    const { searchParams } = new URL(req.url)
    const obj = new retrieve_the_candidate_and_associated_information_voter_type(searchParams);
    
    const x = obj;
    const xy = {fn: Voter.retrieve_the_candidate_and_associated_information, par: x};
    const result = await run_model_method(xy);
    console.log("result: " + result);

    res = Response.json({ data:"okay", result: result});

    return res;
}