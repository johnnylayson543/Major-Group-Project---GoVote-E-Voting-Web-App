import { Collection, MongoClient } from "mongodb"
import { getClient, client } from "./mongoDBCloud";


var result;
// AN IDEA FOR AN ALL PURPOSE DATABASE FUNCTION
// AIM: To abstract the details from the Application.
// ALSP: As a reference for database connection
async function performDatabaseOperation(dbname1, collection1, kind1, obj1) {
    console.log("Parameters: " + dbname1 + ", " + collection1 + "," + kind1 + ", " + obj1);

    console.log(typeof dbname1 + "  " + typeof collection1 + " " + typeof kind1 + " " + typeof obj1);
     
    try {
        console.log("Parameters: " + dbname1 + ", " + collection1 + "," + kind1 + ", " + obj1);
        console.log(typeof dbname1 + "  " + typeof collection1 + " " + typeof kind1 + " " + typeof obj1);
        // =================================================
        
        if(client){
            await client.close();  
            await getClient();
        } else {
            await getClient();
        }
                                                       // <<< PERFORMS REQUIREMENTS FOR CONNECTION
                                                                        // <<< VARIABLE ALREADY DECLARED IN THE HEAD
        //console.log("pass 1");
        const database = client.db(dbname1);                         // <<< database name
        const collection = database.collection(collection1);             // <<< collection name
        //collection.createIndex({ppsn: 1 }, {unique: true} );          // <<< If it should be unique
        
                                                   // <<< CREATE OBJ
        if (kind1 == "INSERT"){
            result = await collection.insert(obj1); 
            console.log("Inserted: " + result + ". ");
        } else if (kind1 == "INSERT_MANY"){
            result = await collection.insertMany(obj1);
            console.log("Inserted all of : " + result + ". ");
        } else if (kind1 == "FIND") {
            result = await collection.find(obj1).toArray();
            console.log("Found: " + result + ". ");
        } else if (kind1 == "FINDALL"){
            result = await collection.findAll(obj1).toArray();
            console.log("Found: " + result + ". ");
        } else {
            console.log("Nothing happened. ");
        }
                                                                         // <<< PERFORM OPERATION ON DATABASE e.g. insert, find, remove, insertAll
        await client.close();                                           // <<< CLOSE CONNECTION
    } catch(error){
        console.error("Problem", error);                                // <<< ERROR MESSAGE 
        throw error;                                                    // <<< RETURNS TRACE
    } finally {
        await client.close();                                           // <<< CLOSES CONNECTION
        console.log("pass 7");
    }
}

module.exports = { performDatabaseOperation, result };



 /*
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
    */

   //(response1 == undefined) ? response1 = "Nothing. " : "what? ";