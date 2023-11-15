export async function GET(req, res) {

    const voterPPSN = searchParams.get('ppsn');

    // Make a note we are on
    // the api. This goes to the console.
    console.log("in the api page")
    // =================================================
    client = getClient();
    database = client.db;
    const collection = database.collection('voters'); // collection name
    const voter = collection('voters');
    const findResult = await collection.find({ppsn: voterPPSN}).toArray();
    console.log('Found documents =>', findResult);
    //==========================================================
    // at the end of the process we need to send something back.
    return Response.json(findResult)
    }
    