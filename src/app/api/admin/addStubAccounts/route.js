import { Collection, MongoClient } from "mongodb"
import { performDatabaseOperation, result } from "../../database/databasetemplate";
import { getClient, client  } from "../../database/mongoDBCloud";


export async function GET(req, res) {
    // Make a note we are on
    // the api. This goes to the console.
    console.log("in the putInCart api page");
    // get the values
    // that were sent across to us.
    const { searchParams } = new URL(req.url);
    const ppsnMin = searchParams.get('ppsnMin');
    const ppsnMax = searchParams.get('ppsnMax');
    
    console.log("From " + ppsnMin + " to " + ppsnMax + ". ");

    //response1 = "";

    /*
    const dbname = "EVote";
    const collection1 = "Person";
    const obj1 = await getObj();
    const kind1 = "INSERT_MANY";
    const result0 = performDatabaseOperation(dbname, collection1, kind1, obj1);
    */


    async function getObj(){
        const myobj = []; // declare object array for stub person documents 
        console.log("pass 5");
        // a loop that adds stub person documents in ppsn range to person document array 
        for(var i = 0; i <= ppsnMax - ppsnMin; i++ ){ 
                
            
                const obj2 = {ppsn: ppsnMin + i}
                const kind2 = "FIND";
                const result1 = performDatabaseOperation(dbname, collection1, kind2, obj2);
                
                if( result1 != null ){
                    const ppsn1 = parseInt(ppsnMin) + i;
                    const obj = { ppsn: ppsn1 }
                    myobj[i] = obj ;
                    console.log("pass 5.1");
                    //response1 += "ppsn: " + (ppsnMin + i) + " inserted " + ". ";
                }
            };
        console.log("pass 6");
    
        return myobj;
    }
    

    
    try {
        // =================================================
        await getClient();
        console.log("pass 1");
        const database = client.db("EVote");
        console.log("pass 2");
        const collection = database.collection('Person'); // collection name
        //collection.createIndex({ppsn: 1 }, {unique: true} );
        
        const myobj = []; // declare object array for stub person documents 

        console.log("pass 5");
        // a loop that adds stub person documents in ppsn range to person document array 
        for(var i = 0; i <= ppsnMax - ppsnMin; i++ ){ 
                const result1 = await collection.find({ppsn: ppsnMin + i});
                if( result1 != null ){
                    const ppsn1 = parseInt(ppsnMin) + i;
                    const obj = { ppsn: ppsn1 }
                    myobj[i] = obj ;
                    //response1 += "ppsn: " + (ppsnMin + i) + " inserted " + ". ";
                }
            };
            console.log("pass 6");
        const insertResult = await collection.insertMany(myobj); // add person documents to the MangoDB database
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

   //(response1 == undefined) ? response1 = "Nothing. " : "what? ";
   return Response.json({ "data":"ok" })
}


