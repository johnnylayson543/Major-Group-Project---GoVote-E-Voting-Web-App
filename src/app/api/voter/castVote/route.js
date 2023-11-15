export async function GET(req, res) {
    // Make a note we are on
    // the api. This goes to the console.
    console.log("in the putInCart api page")
    // get the values
    // that were sent across to us.
    const { searchParams } = new URL(req.url);
    const voterID = searchParams.get('voterID');
    const candidateID = searchParams.get('candidateID');
    
    console.log(pname);
    // =================================================
    client = getClient();
    database = client.db;

    // Add the vote to Vote collection
    const collection = database.collection('Vote'); // collection name
    var myobj = { voterID: voterID, candidateID: candidateID};
    const insertResult = await collection.insertOne(myobj);


    // Add a log to the Log collection
    voteID = await collection.countDocuments({});
    const collection1 = database.collection('Log');

    // Date.now() : Milliseconds since the Unix Epoch (January 1st 1970 00:00:00 UTC)
    var myobj1 = { voteID: voterID, time: Date.now()  };
    const insertResult1 = await collection.insertOne(myobj1);
    //==========================================================
    // at the end of the process we need to send something back.
    return Response.json({ "data":"" + "inserted" + ""});
    }