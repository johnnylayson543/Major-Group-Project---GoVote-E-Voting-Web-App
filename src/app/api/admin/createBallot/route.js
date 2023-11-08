export async function GET(req, res) {
    // Make a note we are on
    // the api. This goes to the console.
    console.log("in the putInCart api page");
    // get the values
    // that were sent across to us.
    const { searchParams } = new URL(req.url)
    const minAge = searchParams.get('minAge')
    const votingArea = searchParams.get('votingArea')
    
    const startDateTime = searchParams.get('startDateTime')
    const endDateTime = searchParams.get('endDateTime')

    console.log(pname);
    // =================================================
    const { MongoClient } = require('mongodb');
    const url = 'mongodb+srv://clusterevote202324.zopnvkp.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority';
    const client = new MongoClient(url);
    const dbName = 'App'; // database name
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('ballot'); // collection name
    var myobj = { minAge: minAge, votingArea: votingArea, startDateTime: startDateTime, endDateTime: endDateTime};
    const insertResult = await collection.insertOne(myobj);
    //==========================================================
    // at the end of the process we need to send something back.
    return Response.json({ "data":"" + "inserted" + ""})
    }