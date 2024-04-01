import { retrieve_the_finished_elections_user_type } from "../../../../../Forms/User/Election/retrieve_the_finished_elections_user_type"
import { run_model_method } from "../../../helper/helper";
import { User } from "../../../../models/User";

export async function GET(req, res) {
    // Make a note we are on
    // the api. This goes to the console.
    console.log("in the putInCart api page");
    // get the values
    // that were sent across to us.
    const { searchParams } = new URL(req.url)
    const obj = new retrieve_the_finished_elections_user_type(searchParams);
    
    const x = obj;//     retrieve_the_finished_elections
    const xy = {fn: User.retrieve_the_finished_elections, par: x};
    const result = await run_model_method(xy);
    console.log("result: " + result);

    res = Response.json({ data:"okay", result: result});

    return res;
}