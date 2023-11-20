const { MongoClient, ServerApiVersion } = require('mongodb');

const credentials = 'src\\app\\api\\database\\X509-cert-210263698362705703.pem'

const dbName = "EVote";

const url = 'mongodb+srv://cluster0.sy1ddlq.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority';
const security1 = {
  tlsCertificateKeyFile: credentials,
  serverApi: ServerApiVersion.v1
};

const client = new MongoClient(url , security1);

async function getClient() {
  try {
    await client.connect();
    console.log("Client found. ");
    // perform actions using client
    return client;
  } catch (error) {
    console.error("Failed to connect to MongoDB",error);
    throw error;
  }
}

module.exports = { getClient, client };
// run().catch(console.dir);

