import { retrieve_the_candidate_and_associated_information_voter_type } from "../../../../../Forms/Voter/Candidate/retrieve_the_candidate_and_associated_information";
import { run_model_method } from "../../../helper/helper";
import { Admin, Ballot, Candidate, Election, Log, Person, Tally, Teller, User, Voter, Vote  } from "../../../../models/Voter";
import { setTestEnvironment } from "../signal_test";
import { add_persons_range_admin_type } from "@/app/api/Forms/Admin/Person/add_persons_range_admin_type";

const url_test_maker = (test_url, params) => {
    const uriStr = test_url + "?";
    const uriWithparams = params.map((param)=>{
        test_url = test_url + param.name + "=" + param.value + "&";
    });
};

class params {

    name;
    value;

    constructor(name, value){
        this.name = name;
        this.value = value;
    }

}

const test_url = new URL("localhost:3000/");

export async function GET(req, res) {
    setTestEnvironment(true);
    
    
    const 
    
    // Set PPSN Range
    add_persons_range_admin_type


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

    setTestEnvironment(false);
    return res;
}