export async function GET(req, res) {
    // Make a note we are on
    // the api. This goes to the console.
    console.log("in the putInCart api page")
    // get the values
    // that were sent across to us.
    const { searchParams } = new URL(req.url)
    const Ballot = searchParams.get('BallotID');
    
    console.log(pname);
    // =================================================
    const { MongoClient } = require('mongodb');
    const url = global.mongoURL;
    const client = new MongoClient(url);
    const dbName = 'App'; // database name
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('Elections'); // collection name
    var myobj = { ballotID: Ballot };
    const insertResult = await collection.insertOne(myobj);
    //==========================================================
    // at the end of the process we need to send something back.
    return Response.json({ "data":"" + "inserted" + ""})
    }