export async function GET(req, res) {
    // Make a note we are on
    // the api. This goes to the console.
    console.log("in the putInCart api page")
    // get the values
    // that were sent across to us.
    const { searchParams } = new URL(req.url)
    const ppsn = searchParams.get('ppsn')  // The candidate must have a ppsn
    const ballotID = searchParams.get('ballotID') // the candidate allow must have valid ballot ID
    
    
    console.log(pname);
    // =================================================
    client = getClient();
    database = client.db;
    const collection = database.collection('candidates'); // collection name
    var myobj = { ppsn: ppsn, ballotID: ballotID };  // candidate object
    const insertResult = await collection.insertOne(myobj); // insert candidate to candidate collection
    //==========================================================
    // at the end of the process we need to send something back.
    return Response.json({ "data":"" + "inserted" + ""})
    }