
const { MongoClient, ServerApiVersion } = require('mongodb');

const credentials = 'src\app\api\database\X509-cert-210263698362705703.pem'

const client = new MongoClient('mongodb+srv://cluster0.sy1ddlq.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority', {
  tlsCertificateKeyFile: credentials,
  serverApi: ServerApiVersion.v1
});

export async function getClient() {
  try {
    await client.connect();
    return client;
    // perform actions using client
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

//run().catch(console.dir);
