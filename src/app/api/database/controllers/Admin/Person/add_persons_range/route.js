import { run_model_method } from "../../../helper/helper";
import { add_persons_range_admin_type } from "../../../../../Forms/Admin/Person/add_persons_range_admin_type";
import { Admin } from "../../../../models/Admin";

export async function GET(req, res) {
    // Make a note we are on
    // the api. This goes to the console.
    console.log("in the putInCart api page");
    // get the values
    // that were sent across to us.
    const { searchParams } = new URL(req.url);
    const obj = new add_persons_range_admin_type(searchParams);
    const x = obj;
    const xy = {fn: Admin.add_person_range, par: x};
    const result = await run_model_method(xy);

    return Response.json({ "data":"true", result: result });
}


