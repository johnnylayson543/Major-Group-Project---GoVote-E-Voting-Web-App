export async function GET(req, res) {
  // Make a note we are on
  // the api. This goes to the console.
  console.log("in the api page")
  // get the values
  // that were sent across to us.
  const { searchParams } = new URL(req.url);
  const ppsn = searchParams.get('ppsn');
  const pass = searchParams.get('pass');

  console.log(email);
  console.log(pass);

// Make a note we are on
    // the api. This goes to the console.
    console.log("in the api page")
    // =================================================
    const { MongoClient } = require('mongodb');
    const url = 'mongodb://root:example@localhost:27017/';
    const client = new MongoClient(url);
    const dbName = 'App'; // database name
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('voters'); // collection name
    const voter = collection('voter');
    const person = collection('person');
    const findPerson = await person.find({ppsn: ppsn}).toArray();
    const findVoter = await voter.find({ppsn: ppsn}).toArray();

    console.log('Found documents =>', findResult);
    //==========================================================
    // at the end of the process we need to send something back.
    return Response.json(findResult)
    }



  // database call goes here
  // at the end of the process we need to send something back.
  return Response.json({ "data":"valid" })
  }
  