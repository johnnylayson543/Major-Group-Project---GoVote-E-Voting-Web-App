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
    client = getClient();
    database = client.db;
    const collection = database.collection('Elections'); // collection name
    var myobj = { ballotID: Ballot };
    const insertResult = await collection.insertOne(myobj);
    //==========================================================
    // at the end of the process we need to send something back.
    return Response.json({ "data":"" + "inserted" + ""})
    }