export async function GET(req, res) {
    // Make a note we are on
    // the api. This goes to the console.
    console.log("in the api page")
    // get the values
    // that were sent across to us.

      // the api. This goes to the console.
      console.log("in the api page")
      // =================================================
      //client = getClient();
      //database = client.db;
      //const collection = database.collection('Vote'); // collection name
  

      //const result = await collection.find({"voterID": "1"}).count();


      // Sample hardcoded data for debbuging and testing purposes (to be returned to the tallyvotes front-end page as a json data)
      const result1 = 99;
      const result2 = 12;
      const result3 = 32;
      const result4 = 43;
      const result5 = 55;
      const result6 = 80;

  
      console.log('for candidate 1 =>', result1);
      console.log('for candidate 2 =>', result2);
      console.log('for candidate 3 =>', result3);
      console.log('for candidate 4 =>', result4);
      console.log('for candidate 5 =>', result5);
      console.log('for candidate 6 =>', result6);
      //==========================================================
      // at the end of the process we need to send something back.
  
      
  
  
  
    // database call goes here
    // at the end of the process we need to send something back.
    return Response.json([result1, result2, result3, result4, result5, result6])
    
}