import { performDatabaseOperation } from "../../database/databasetemplate";

export async function GET(req, res) {
  // Make a note we are on
  // the api. This goes to the console.
  console.log("in the api page")
  // get the values
  // that were sent across to us.
  const { searchParams } = new URL(req.url);
  const ppsn = searchParams.get('ppsn');
  const pass = searchParams.get('pass');

  console.log(ppsn);
  console.log(pass);

  const x = { user: {ppsn: ppsn, pass: pass}};
  const xy = {fn: User.log_into_account, par: x};
  console.log{x}
  console.log{xy}
  console.log{"Operation begins."}
  const login_result = await Transaction.run(xy);
  console.log("Passed operation stage.\n");
  console.log(result);
  const result = {found: found, login_result: login_result};

  return Response.json(result)
}
  
/*
  const dbname1 = "Evote";      // Database Name
  const collection1 = "User";
  const kind1 = "FIND";       // Database Operation Type 
  const obj_user = {ppsn: ppsn, pass: pass};
  const result_user = await performDatabaseOperation(dbname1, collection1, kind1, obj_user);
  */