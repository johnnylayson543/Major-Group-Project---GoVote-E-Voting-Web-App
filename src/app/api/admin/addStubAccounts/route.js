import { getClient, client } from "../../database/mongoDBCloud";

export async function GET(req, res) {
    // Make a note we are on
    // the api. This goes to the console.
    console.log("in the putInCart api page");
    // get the values
    // that were sent across to us.
    const { searchParams } = new URL(req.url);
    const ppsnMin = searchParams.get('ppsnMin');
    const ppsnMax = searchParams.get('ppsnMax');
    
    console.log(pname);

    try {
        // =================================================
        await getClient();
        database = client.db;
        const collection = database.collection('person'); // collection name
        collection.createIndex({ppsn: 1 }, {unique: true} );
        
        let myobj = []; // declare object array for stub person documents 

        // a loop that adds stub person documents in ppsn range to person document array 
        for(var i = 0; i < ppsnMax - ppsnMin; i++ ){ 
                if(collection.find({ppsn: ppsnMin + i}).toArray().length !== 0 ){
                    myobj[i] = { ppsn: ppsnMin + i };
                }
            };
        const insertResult = await collection.insertMany(myobj); // add person documents to the MangoDB database
        //==========================================================
        // at the end of the process we need to send something back.
    } catch(error){
        console.error("Problem", error);
        throw error;
    } finally {
        client.close();
    }


    return Response.json({ "ppsn": myobj + " inserted " + ". "});
}
