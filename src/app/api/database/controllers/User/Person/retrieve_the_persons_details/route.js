import { run_model_method } from "../../../helper/helper";
import { retrieve_the_persons_details_user_type } from "../../../../../Forms/User/Person/retrieve_the_persons_details_user_type";
import { User } from "../../../../models/User";

export async function GET(req, res) {
  // Make a note we are on
  // the api. This goes to the console.
  console.log("in the api page");
  // get the values
  // that were sent across to us.
  const { searchParams } = new URL(req.url);
  const obj = new retrieve_the_persons_details_user_type(searchParams);

  const x = obj;
  const xy = {fn: User.retrieve_the_persons_details, par: x};
  const result = await run_model_method(xy);

  return Response.json({data: "okay", result: result});
}