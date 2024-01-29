/*
Student Name:       Adam O'Shea
Student Number:     B00147637
First used:         Rich Web Assignment
When:               TU860 Y3 S1
*/

import { MongoClient, ServerApiVersion } from 'mongodb'; // Mongo DB library

// Mongo DB certificate location
const credentials = 'src\\app\\api\\database\\X509-cert-210263698362705703.pem'; 

// Mongo DB Cloud URL
const url = 'mongodb+srv://cluster0.sy1ddlq.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority';

// Mongo DB Security 
const security1 = {
  tlsCertificateKeyFile: credentials,
  serverApi: ServerApiVersion.v1
};

// declare client variable with export modifier so other js can use
export const client = new MongoClient(url , security1);

// declare and define get client function with export modifier so other js can use
export async function getClient() {
  try {
    await client.connect();         // try for a connection, must wait
    console.log("Client found. ");  // Debug message
    return client;                  // Send client to calling function
  } catch (error) {                 // catch an error
    console.error("Failed to connect to MongoDB",error);  // Debug message
    throw error;                    // throw the error
  }
}
// run().catch(console.dir);

