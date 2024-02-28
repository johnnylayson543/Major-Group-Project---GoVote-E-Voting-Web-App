import { run_model_method } from "../../../helper/helper";
import { register_user_type } from "../../../Forms/User/register_user_type";

export async function GET(req, res) {
  // Make a note we are on
  // the api. This goes to the console.
  console.log("in the register api page")
  // get the values
  // that were sent across to us.

  /*  
      It creates the URL object.
      It sends the URL to one of the form types.
      This creates an object that can be passed with a function. This is the x. Or parameters.
      Then an xy = {fn: Model.function_name, par: x }
      Then this is send to the Transaction.run(xy). In mongooseDocker, it eventually uses withTransaction(xy).   
        This will handle the transaction with the function and its parameters.
      o

  */
  // Layers to the design

  //  route files are the form handlers 
  //      they use form types to get an object that can sent to the back
  //      And use transaction run method to send the object and name of the function 


  // URL -> obj --> function name and obj to transaction.run 

  const { searchParams } = new URL(req.url)
  const obj = new register_user_type(searchParams);  //  This is where the data from the front end form is made into an object using a form type. It has obj.user , obj.person_details.
  const x = obj;
  const xy = {fn: User.register_an_account, par: x};  // This is where you send the Model.function_name, object. 
  const result = run_model_method(xy);

  return Response.json({ "data":"ok" , "result": result})
  }
