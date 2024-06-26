import { run_model_method } from "../../../helper/helper";
import { update_person_details_type } from "../../../../../Forms/User/Person/update_person_details_type";
import { User } from "../../../../models/User";

export async function GET(req, res) {
  // Make a note we are on
  // the api. This goes to the console.
  console.log("in the api page")
  // get the values
  // that were sent across to us.
  const { searchParams } = new URL(req.url);
  const obj = new update_person_details_type(searchParams);

  const x = obj;
  const xy = {fn: User.update_person_details, par: x};
  const result = await run_model_method(xy);

  return Response.json({data: "okay", "result": result});
}