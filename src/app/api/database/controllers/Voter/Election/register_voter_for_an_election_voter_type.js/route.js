import { register_user_type } from "../../../../Forms/User/register_user_type";

export async function GET(req, res) {

  const { searchParams } = new URL(req.url)
  const obj = new register_user_type(searchParams);  //  This is where the data from the front end form is made into an object using a form type. It has obj.user , obj.person_details.
  const x = obj;
  const xy = {fn: User.register_an_account, par: x};  // This is where you send the Model.function_name, object. 
  const result = run_model_method(xy);

  return Response.json({ "data":"ok" , "result": result});
}
