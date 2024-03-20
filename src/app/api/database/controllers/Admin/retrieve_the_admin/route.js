import { run_model_method } from "../../helper/helper";
import { retrieve_the_admin_admin_type } from "../../../../Forms/Admin/retrieve_the_admin_admin_type";
import { Admin } from "../../../models/Admin";

export async function GET(req, res) {

  const { searchParams } = new URL(req.url)
  const obj = new retrieve_the_admin_admin_type(searchParams);  //  This is where the data from the front end form is made into an object using a form type. It has obj.user , obj.person_details.
  
  const x = obj;
  const xy = {fn: Admin.retrieve_the_admin, par: x};  // This is where you send the Model.function_name, object. 
  const result = await run_model_method(xy);

  res = Response.json({ "data":"ok" , "result": result})
  return res;
  }
