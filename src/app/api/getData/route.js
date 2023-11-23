export async function GET(req, res) {
    // Make a note we are on
    // the api. This goes to the console.
    console.log("in the api page")
    // get the values
    // that were sent across to us.

      // the api. This goes to the console.
      console.log("in the api page")
      // =================================================
      client = getClient();
      database = client.db;
      const collection = database.collection('Vote'); // collection name
  

      const result = await collection.find({"voterID": "1"}).count();
  
      console.log('for candiate 1 =>', result);
      //==========================================================
      // at the end of the process we need to send something back.
  
      
  
  
  
    // database call goes here
    // at the end of the process we need to send something back.
    return Response.json({ "candidate1":result })
    
}