import { Transaction } from "../../../database/mongooseDocker";

export async function run_model_method(xy){

    console.log("form_obj: " + String.toString(x.par));
    console.log("The function and its parameters to pass: " + String.toString(xy));
    
    console.log("Database transaction stage begins.");
    const result = await Transaction.run(xy);
    console.log("Passed database transaction stage.\n");

    return { "data":"ok", result: result };
}


