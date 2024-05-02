import { user_type } from "@/app/api/Forms/Basic/user_type";
import { Transaction } from "../../../database/mongooseDocker";

export async function run_model_method<T>(xy:function_and_parameters<T>){

    console.log("form_obj: " + String.toString( xy.par.obj));
    console.log("The function and its parameters to pass: " + String.toString(xy));
    
    console.log("Database transaction stage begins.");
    const result = await Transaction.run(xy);
    console.log("Passed database transaction stage.\n");

    return result;
}

export interface function_and_parameters<T> {
    fn: Function
    par: { obj: T }
}


