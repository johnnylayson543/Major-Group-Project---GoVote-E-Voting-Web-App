export async function GET(req, res) {
  // Make a note we are on
  // the api. This goes to the console.
  console.log("in the register api page")
  // get the values
  // that were sent across to us.
  const { searchParams } = new URL(req.url)

  const ppsn = searchParams.get('ppsn')
  const name = searchParams.get('name')
  const address = searchParams.get('address')
  const email = searchParams.get('email')
  const phone = searchParams.get('phone')
  const dateofbirth = searchParams.get('dateofbirth')

  console.log(ppsn);
  console.log(name);
  console.log(address)
  console.log(email)
  console.log(phone);
  console.log(dateofbirth);
  // database call goes here
  // at the end of the process we need to send something back.

// =================================================
const { MongoClient } = require('mongodb');
const url = global.mongoURL;
const client = new MongoClient(url);
const dbName = 'EVote'; // database name
await client.connect();
console.log('Connected successfully to server');
const db = client.db(dbName);
const collection = db.collection('person'); // collection name
var myobj = { ppsn: ppsn, name: name, address: address, email: email, dateofbirth: dateofbirth }; // create object for person collection
const insertResult = await collection.replaceOne({ppsn: ppsn}, myobj); // find existing document with matching ppsn, and replace with new person document
//==========================================================


  return Response.json({ "data":"ok" })
  }