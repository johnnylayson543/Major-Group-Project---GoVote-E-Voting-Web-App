export async function GET(req, res) {
    // Make a note we are on
    // the api. This goes to the console.
    console.log("in the putInCart api page")
    // get the values
    // that were sent across to us.
    const { searchParams } = new URL(req.url)
    const candidateID = searchParams.get('candidateID')
    const pollID = searchParams.get('pollID')
    

    const ppsnMin = searchParams.get('ppsnMin')
    const ppsnMax = searchParams.get('ppsnMax')
    
    console.log(pname);
    // =================================================
    const { MongoClient } = require('mongodb');
    const url = 'mongodb+srv://clusterevote202324.zopnvkp.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority';
    const client = new MongoClient(url);
    const dbName = 'App'; // database name
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('person'); // collection name
    
    let myobj = []; // declare object array for stub person documents 

    // a loop that adds stub person documents in ppsn range to person document array 
    for(var i = 0; i < ppsnMax - ppsnMin; i++ ){ myobj[i] = { ppsn: ppsnMin + i};
    const insertResult = await collection.insertMany(myobj); // add person documents to the MangoDB database
    //==========================================================
    // at the end of the process we need to send something back.
    return Response.json({ "data":"" + "inserted" + ""})
    }