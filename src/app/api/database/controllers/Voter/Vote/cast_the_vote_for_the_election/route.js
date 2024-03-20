import { run_model_method } from "../../../helper/helper";
import { cast_the_vote_for_the_election_voter_type } from "../../../../../Forms/Voter/Vote/cast_the_vote_for_the_election_voter_type";
import { Voter } from "../../../../models/Voter";

export async function GET(req, res) {
    // Make a note we are on
    // the api. This goes to the console.
    console.log("in the getTally api page")
    // get the values
    // that were sent across to us.    
    const { searchParams } = new URL(req.url);
    const obj = new cast_the_vote_for_the_election_voter_type(searchParams);
    
    const x = obj;
    const xy = {fn: Voter.cast_the_vote_for_the_election, par: x};
    const result = run_model_method(xy);
    
    return Response.json({ "data":"okay", "result": result});

    }