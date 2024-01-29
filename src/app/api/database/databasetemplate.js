/*
Student Name:       Adam O'Shea
Student Number:     B00147637
First used:         Rich Web Assignment
When:               TU860 Y3 S1
*/


import { Collection, MongoClient } from "mongodb"
import { getClient, clientCloud } from "./mongoDBCloud";
import { getClientDocker, clientDocker } from "./mongoDBDocker";


const docker = true; // A toggle - true = Docker, false = Mongo DB Cloud 

// AN IDEA FOR AN ALL PURPOSE DATABASE FUNCTION
// AIM: To abstract the details from the Application.
// ALSO: As a reference for database connection
export const performDatabaseOperation = async (dbname1, collection1, kind1, obj1) => {
    
    // Debug messages
    console.log("Parameters: " + dbname1 + ", " + collection1 + "," + kind1 + ", " + obj1);
    console.log(typeof dbname1 + "  " + typeof collection1 + " " + typeof kind1 + " " + typeof obj1);
     
    // declare variables
    var result;
    var client;

    try {
        // =================================================
        
        // Depending if Docker or MongoDB Cloud
        if(docker) {
            console.log("DOCKER>>");                                // Debug message
            await getClientDocker();                                // Use get client function for Dockers
            client = clientDocker;                                  // Assign the client for Docker to the working variable client
        } else {
            console.log("CLOUD>>");                                 // Debug message
            await getClient();                                      // Use the get client function for MongoDB Cloud
            client = clientCloud;
        }                                                           // <<< VARIABLE ALREADY DECLARED IN THE HEAD

        console.log("pass 1");                                      // Debug message
        const database = client.db(dbname1);                        // <<< database name
        const collection = database.collection(collection1);        // <<< collection name
        //collection.createIndex({ppsn: 1 }, {unique: true} );      // <<< If it should be unique
        
        // [ INSERT, INSERT_MANY, FIND, UPDATE_ONE ]
        // Perform the database operation      
        if (kind1 == "INSERT"){                                     // INSERT = Insert One entry
            result = await collection.insertOne(obj1);              // Must wait for insert one operation
            console.log("Inserted: " + result + ". ");              // Debug message
        } else if (kind1 == "INSERT_MANY"){                         // INSERT MANY = Insert Many entries
            result = await collection.insertMany(obj1);             // Must wait for insert many operation
            console.log("Inserted all of : " + result + ". ");      // Debug message
        } else if (kind1 == "FIND") {                               // FIND = Find all matching entries
            result = await collection.find(obj1).toArray();         // Must wait for find operation
            console.log("Found: " + result + ". ");                 // Debug message
        } else if(kind1 == "UPDATE_ONE") {                          // UPDATE ONE = Updates the first matching entry
            let filter = obj1.filter;                               // The match criteria
            let update = obj1.update;                               // The update to be applied
            result = await collection.updateOne(filter, update);    // Must wait for update one operation
            console.log("Updated one: " + result + ". ");           // Debug message
        } else {
            console.log("Nothing happened. ");                      // Debug message
        }
                                                                        // <<< CLOSE CONNECTION
        return result;
    } catch(error){
        console.error("Problem", error);                                // <<< ERROR MESSAGE 
        throw error;                                                    // <<< RETURNS TRACE
    } finally {
        await client.close();                                           // <<< CLOSES CONNECTION
        console.log("pass 7");
    }
};



 /* REFERENCE : Old Code
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