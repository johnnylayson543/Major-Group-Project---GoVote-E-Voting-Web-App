import mongoose from "mongoose";
//import { performDatabaseOperation } from "../../database/databasetemplate";
import { Transaction } from "../../../database/mongooseDocker";
import { User } from "../../../database/models/User";
import { register_user_type } from "../../../Forms/User/register_user_type";

export async function GET(req, res) {
  // Make a note we are on
  // the api. This goes to the console.
  console.log("in the register api page")
  // get the values
  // that were sent across to us.
  const { searchParams } = new URL(req.url)
  const obj = new register_user_type(searchParams);
  const x = obj;
  const xy = {fn: User.register_an_account, par: x};
  
  console.log("form_obj: " + String.toString(x));
  console.log("The function and its parameters to pass: " + String.toString(xy));
  
  console.log("Database transaction stage begins.");
  const result = await Transaction.run(xy);
  console.log("Passed database transaction stage.\n");
  
  console.log(result);

  return Response.json({ "data":"ok" })
  }
