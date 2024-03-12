import { run_model_method } from "../../helper/helper";
import { login_user_type } from "../../../../Forms/User/login_user_type";
import { User } from "../../../models/User";

export async function GET(req, res) {
  // Make a note we are on
  // the api. This goes to the console.
  console.log("in the api page")
  // get the values
  // that were sent across to us.
  const { searchParams } = new URL(req.url);
  const obj = new login_user_type(searchParams);

  const x = { user: obj.user};
  const xy = {fn: User.log_into_account, par: x};
  const result = await run_model_method(xy);
  
  res = Response.json({data: "Okay", result: result});

  return res;
}