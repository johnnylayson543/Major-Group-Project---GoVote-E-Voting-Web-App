import { function_and_parameters, run_model_method } from "../../helper/helper";
import { is_signed_into_account_user_type } from "../../../../Forms/User/is_signed_into_account";
import { User } from "../../../models/User";
import { cookies } from "next/headers";
import { user_type } from "@/app/api/Forms/Basic/user_type";

export async function GET(req, res) {

  console.log("cookies().getAll() in is signed into account");
  console.log(cookies().getAll());
  // Make a note we are on
  // the api. This goes to the console.
  console.log("in the Is Signed Into account api page")
  console.log("req in is signed into account: ");
  console.log(req);
  
  console.log("req.headers.cookie");
  console.log(req.headers.cookie);
  // get the values
  // that were sent across to us.
  const { searchParams } = new URL(req.url);
  const obj = new is_signed_into_account_user_type(searchParams);

  const x = { obj: obj.user};
  const xy :function_and_parameters<user_type> = {fn: User.is_signed_into_account, par: x};
  const result = await run_model_method<user_type>(xy);

  return Response.json({data: "okay", "result": result});
}

