import { MongoClient, ServerApiVersion } from 'mongodb';

const credentials = 'src\\app\\api\\database\\X509-cert-210263698362705703.pem';

const url = 'mongodb+srv://cluster0.sy1ddlq.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority';
const security1 = {
  tlsCertificateKeyFile: credentials,
  serverApi: ServerApiVersion.v1
};

export const client = new MongoClient(url , security1);

export async function getClient() {
  try {
    await client.connect();
    console.log("Client found. ");
    return client;
  } catch (error) {
    console.error("Failed to connect to MongoDB",error);
    throw error;
  }
}
// run().catch(console.dir);

