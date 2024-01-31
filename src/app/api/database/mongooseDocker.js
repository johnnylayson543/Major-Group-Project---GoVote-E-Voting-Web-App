import mongoose from "mongoose";
import { type } from "requests";
const uri = 'mongodb://localhost:27017/EVote';
mongoose.connect(urim { useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const user = new Schema({
    ppsn: {type: String, required: true, unique: true, ref: 'Person'},
    pass: {type: String, required: true}
});

const person = new Schema({
    ppsn: {type: String, required: true, unique: true},
    name: {type: String, required: false},
    address: {type: String, required: false},
    phone: {type: String, required: false},
    email: {type: String, required: false}
})

const candidate = new Schema({
    ppsn: {type: String, required: true, unique: true, ref: 'Person'},
    id:{type: String, required: true, unique: true},
    ballotID: {type: String, required: true, unique: true}
})

const ballot = new Schema({
    id: {type: String, required: true, unique: true},
    title: {type: String, required: false},
    closing_time: {type: String, required: true}
})

const voter = new Schema({
    ppsn: {type: String, required: true, unique: true, ref: 'Person'},
    id: {type: String, required: true, unique: true}
});

const vote = new Schema({
    id: {type: String, required: true, unique: true},
    voterID: {type: String, required: true, unique: true, ref: 'Voter'},
    candidateID: {type: String, required: true, unique: true, ref: 'Candidate'}
});

const log = new Schema({
    voteID: {type: String, required: true, unique: true, ref: 'Vote'},
    timestamp: {type: String, required: true, unique: true}
});

const admin = new Schema({
    ppsn: {type: String, required: true, unique: true, ref: 'Person'},
    id: {type: String, required: true, unique: true}
});