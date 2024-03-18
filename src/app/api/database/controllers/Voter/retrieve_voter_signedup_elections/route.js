import { run_model_method } from "../../helper/helper";
import { retrieve_voter_signedup_elections_voter_type } from "../../../../Forms/Voter/retrieve_voter_signedup_elections_voter_type";
import { Voter } from "../../../models/Voter";

export async function GET(req, res) {

  const { searchParams } = new URL(req.url)
  const obj = new retrieve_voter_signedup_elections_voter_type(searchParams);  //  This is where the data from the front end form is made into an object using a form type. It has obj.user , obj.person_details.
  
  const x = obj;
  const xy = {fn: Voter.signup_for_the_election, par: x};  // This is where you send the Model.function_name, object. 
  const result = await run_model_method(xy);

  res = Response.json({ "data":"ok" , "result": result})
  return res;
  }
