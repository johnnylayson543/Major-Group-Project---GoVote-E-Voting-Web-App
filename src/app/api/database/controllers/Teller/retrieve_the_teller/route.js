import { run_model_method } from "../../helper/helper";
import { retrieve_the_teller_teller_type } from "../../../../Forms/Teller/retrieve_the_teller_teller_type";
import { Teller } from "../../../models/Teller";

export async function GET(req, res) {

  const { searchParams } = new URL(req.url)
  const obj = new retrieve_the_teller_teller_type(searchParams);  //  This is where the data from the front end form is made into an object using a form type. It has obj.user , obj.person_details.
  
  const x = obj;
  const xy = {fn: Teller.retrieve_the_teller, par: x};  // This is where you send the Model.function_name, object. 
  const result = await run_model_method(xy);

  res = Response.json({ "data":"ok" , "result": result})
  return res;
  }
