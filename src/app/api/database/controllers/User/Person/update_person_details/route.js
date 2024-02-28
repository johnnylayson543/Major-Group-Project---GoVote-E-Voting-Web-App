import { run_model_method } from "../../../helper/helper";
import { update_person_details_type } from "../../../Forms/User/update_person_details_type";

export async function GET(req, res) {
  // Make a note we are on
  // the api. This goes to the console.
  console.log("in the api page")
  // get the values
  // that were sent across to us.
  const { searchParams } = new URL(req.url);
  const obj = new update_person_details_type(searchParams);

  const x = { user: obj.user};
  const xy = {fn: User.update_person_details, par: x};
  const result = run_model_method(xy);

  return Response.json({data: "okay", "result": result});
}