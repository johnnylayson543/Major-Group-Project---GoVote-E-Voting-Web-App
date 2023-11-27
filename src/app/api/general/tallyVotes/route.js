import { Collection, MongoClient } from "mongodb"
import { getClient, client } from "../../database/mongoDBCloud";

export async function GET(req, res) {
    // Make a note we are on
    // the api. This goes to the console.
    console.log("in the getTally api page")
    // get the values
    // that were sent across to us.
    const { searchParams } = new URL(req.url);
    const ballotID = searchParams.get('ballotID');
    

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

       const collection = database.collection('Candidate'); // collection name
       var myobj = { ballotID: ballotID };
       const candidates = await collection.find(myobj).toArray();

       let tally = [];
       const collection1 = database.collection('Vote'); // collection name
       for(let i = 0 ; i<candidates.length; i++){
            const candidateID1 = candidates[i]["candidateID"];
            const tally1 = await collection1.countDocuments({candidateID: candidateID1});
            tally[i] = {candidateID: candidateID1 , tally: tally1 };
       }

       let obj1 = tally;
       const collection2 = database.collection('Tally');
       const insertTallies = await collection2.insertMany(obj1);

        await client.close();
        console.log("Operation Success! Account registered. 7");
        console.log("pass 6");
        //==========================================================
        // at the end of the process we need to send something back.
        //Response.json({"data": "okay", "tally":tally});
        console.log(tally);
        return Response.json(tally);
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