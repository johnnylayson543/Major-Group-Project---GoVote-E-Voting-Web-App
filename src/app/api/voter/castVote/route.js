import { Collection, MongoClient } from "mongodb"
import { getClient, client } from "../../database/mongoDBCloud";

export async function GET(req, res) {
    // Make a note we are on
    // the api. This goes to the console.
    console.log("in the putInCart api page");
    // get the values
    // that were sent across to us.
    const { searchParams } = new URL(req.url);
    const voterID = searchParams.get('voterID');
    const candidateID = searchParams.get('candidateID');
    

    try {
        // =================================================
        await getClient();
        console.log("pass 1");
        const database = client.db("EVote");
        console.log("pass 2");
        //collection.createIndex({ppsn: 1 }, {unique: true} );
        
        console.log("pass 5");
        // a loop that adds stub person documents in ppsn range to person document array 
       // Add the vote to Vote collection
        const collection = database.collection('Vote'); // collection name

        var voteID = await collection.countDocuments({});
        var myobj = { voterID: voterID, candidateID: candidateID};
        const insertResult = await collection.insertOne(myobj);

        // Add a log to the Log collection
        
        const collection1 = database.collection('Log');

         // Date.now() : Milliseconds since the Unix Epoch (January 1st 1970 00:00:00 UTC)
        var myobj1 = { voteID: voterID, time: Date.now()  };
        const insertResult1 = await collection1.insertOne(myobj1);


        await client.close();
        console.log("Operation Success! Account registered. 7");
        console.log("pass 6");
        //==========================================================
        // at the end of the process we need to send something back.
    } catch(error){
        console.error("Problem", error);
        throw error;
    } finally {
        await client.close();
        console.log("pass 7");
    }

   
    //==========================================================
    // at the end of the process we need to send something back.
    return Response.json({ "data":"" + "inserted" + ""});
    }