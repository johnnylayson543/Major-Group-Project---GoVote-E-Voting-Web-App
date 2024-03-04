
export async function GET(req, res) {
    // Make a note we are on
    // the api. This goes to the console.
    console.log("in the getTally api page")
    // get the values
    // that were sent across to us.    
    const { searchParams } = new URL(req.url);
    const obj = new cast_a_vote_voter_type(searchParams);
    
    const x = obj;
    const xy = {fn: Voter.cast_a_vote, par: x};
    const result = run_model_method(xy);
    
    return Response.json({ "data":"okay", "result": result});

    }