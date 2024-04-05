import { add_media_to_my_storage_user_type } from "../../../../../Forms/User/System/Media/add_media_to_my_storage_user_type";
import { run_model_method } from "../../../helper/helper";
import { User } from "../../../../models/User";
import upload from "../helper/upload";

export async function GET(req, res) {
    // Make a note we are on
    // the api. This goes to the console.
    console.log("in the putInCart api page");
    // get the values
    // that were sent across to us.

    const upload_response = upload(req, res);
    const { searchParams } = new URL(req.url);
    const obj = new add_media_to_my_storage_user_type(searchParams, upload_response); 
    
    const x = obj;
    const xy = {fn: User.add_media_to_my_storage, par: x};
    const result = await run_model_method(xy);
    
    return Response.json({ "data":"okay", "result": result});
    }