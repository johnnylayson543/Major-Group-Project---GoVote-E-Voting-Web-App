import { run_model_method } from "../../../helper/helper";
import { confirm_person_exists_on_the_system_admin_type } from "../../../../../Forms/Admin/Person/confirm_person_exists_on_the_system_admin_type";
import { Admin } from "../../../../models/Admin";


export async function GET(req, res) {
    // Make a note we are on
    // the api. This goes to the console.
    console.log("in the putInCart api page");
    // get the values
    // that were sent across to us.
    const { searchParams } = new URL(req.url);
    const obj = new confirm_person_exists_on_the_system_admin_type(searchParams);
    const x = obj;
    const xy = {fn: Admin.confirm_person_exists_on_the_system, par: x};
    const result = await run_model_method(xy);

    console.log("Person definitely found: ");
    console.log(result);
    return Response.json({ "data":"ok", result: result });
}


