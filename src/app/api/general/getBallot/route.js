import { Collection, MongoClient } from "mongodb"
import { getClient, client } from "../../database/mongoDBCloud";

export async function GET(req, res) {
    // Make a note we are on
    // the api. This goes to the console.
    console.log("in the putInCart api page")
    // get the values
    // that were sent across to us.
    const { searchParams } = new URL(req.url);
    const ballotID = searchParams.get('ballotID');
    
    console.log("ballotID: " + ballotID);


    try {
        // =================================================
        await getClient();
        console.log("pass 1");
        const database = client.db("EVote");
        const collection = database.collection('Candidate'); // collection name
        var myobj = { ballotID: ballotID};
        const findResults = await collection.find(myobj).toArray();
        console.log("Is it an array? " + Array.isArray(findResults));
        for(let i=0;i<findResults.length;i++){
            console.log(findResults[i]);
        }
        await client.close();
        console.log("Operation Success! Account registered. 7");
        console.log("pass 6");
        //==========================================================
        // at the end of the process we need to send something back.
        return Response.json(findResults);
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