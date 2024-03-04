import { Collection, MongoClient } from "mongodb"
import { getClient, client } from "../../database/mongoDBCloud";

async function updateVote(voterID, candidateID) {
    const collection = database.collection('Vote'); // collection name

    // Find the document to be updated based on voterID
    const query = { voterID: voterID };

    // Set the new values
    const updateDocument = {
        $set: { candidateID: candidateID }
    };

    // Perform the update
    const updateResult = await collection.updateOne(query, updateDocument);

    if (updateResult.modifiedCount > 0) {
        console.log('Vote information updated successfully.');
    } else {
        console.log('Vote not found or no changes made.');
    }

    // Add a log to the Log collection
    const logCollection = database.collection('Log');

    // Date.now(): Milliseconds since the Unix Epoch (January 1st, 1970 00:00:00 UTC)
    const logObject = { voteID: voterID, time: Date.now() };
    const logInsertResult = await logCollection.insertOne(logObject);

    if (logInsertResult.insertedCount > 0) {
        console.log('Log entry added successfully.');
    } else {
        console.log('Error adding log entry.');
    }
}

// Example usage
const voterIDToUpdate = 'someVoterID';
const newCandidateID = 'newCandidateID';

updateVote(voterIDToUpdate, newCandidateID);

