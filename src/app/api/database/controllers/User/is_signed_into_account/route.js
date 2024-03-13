import { run_model_method } from "../../helper/helper";
import { is_signed_into_account_user_type } from "../../../../Forms/User/is_signed_into_account";
import { User } from "../../../models/User";


export async function GET(req, res) {
  // Make a note we are on
  // the api. This goes to the console.
  console.log("in the api page")
  // get the values
  // that were sent across to us.
  const { searchParams } = new URL(req.url);
  const obj = new is_signed_into_account_user_type(searchParams);

  const x = { user: obj.user};
  const xy = {fn: User.is_signed_into_account, par: x};
  const result = await run_model_method(xy);

  return Response.json({data: "okay", "result": result});
}