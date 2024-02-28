import { performDatabaseOperation } from "../../../database/.old/databasetemplate";
import { login_user_type } from "../../../Forms/User/login_user_type";

export async function GET(req, res) {
  // Make a note we are on
  // the api. This goes to the console.
  console.log("in the api page")
  // get the values
  // that were sent across to us.
  const { searchParams } = new URL(req.url);
  const obj = new login_user_type(searchParams);

  const x = { user: obj.user};
  const xy = {fn: User.log_into_account, par: x};
  console.log{x}
  console.log{xy}
  console.log{"Operation begins."}
  const login_result = await Transaction.run(xy);
  console.log("Passed operation stage.\n");
  console.log(result);
  const result = {found: found, login_result: login_result};

  return Response.json({data: "okay", "result": result});
}
  
/*
  const dbname1 = "Evote";      // Database Name
  const collection1 = "User";
  const kind1 = "FIND";       // Database Operation Type 
  const obj_user = {ppsn: ppsn, pass: pass};
  const result_user = await performDatabaseOperation(dbname1, collection1, kind1, obj_user);
  */