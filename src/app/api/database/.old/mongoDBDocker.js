/*
Student Name:       Adam O'Shea
Student Number:     B00147637
First used:         Rich Web Assignment
When:               TU860 Y3 S1
*/


import { MongoClient } from 'mongodb';                  // Mongo DB library

const url = `mongodb://root:example@localhost:27017`;  // URL of local running docker image instance of Mongo DB

export const clientDocker = new MongoClient(url);       // declare variable using the URL with export modifier so other js can use it

export const getClientDocker = async () => {            // declare and define get client function for the local running Docker instance of Mongo DB
  try {
    // ================================================= 
    await clientDocker.connect();                       // try for a connection with the database, must wait for it to complete
    console.log("Client found. ");                      // debug message
    //return clientDocker;
  } catch (error) {                                     // catch the error
    console.error("Failed to connect to MongoDB",error);// debug message
    throw error;                                        // try the error
  }
};


