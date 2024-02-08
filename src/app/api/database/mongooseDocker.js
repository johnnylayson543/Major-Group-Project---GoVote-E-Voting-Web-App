import mongoose from "mongoose";
import { type } from "requests";
const uri = 'mongodb://localhost:27017/EVote';
mongoose.connect(urim, { useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const userSchema = new Schema({
    ppsn: {type: String, required: true, unique: true, ref: 'Person'},
    pass: {type: String, required: true}
});

const personSchema = new Schema({
    ppsn: {type: String, required: true, unique: true},
    name: {type: String, required: false},
    address: {type: String, required: false},
    phone: {type: String, required: false},
    email: {type: String, required: false}
})

const candidateSchema = new Schema({
    ppsn: {type: String, required: true, unique: true, ref: 'Person'},
    id:{type: String, required: true, unique: true},
    ballotID: {type: String, required: true, unique: true}
})

const ballotSchema = new Schema({
    id: {type: String, required: true, unique: true},
    title: {type: String, required: false},
    closing_time: {type: String, required: true}
})

const voterSchema = new Schema({
    ppsn: {type: String, required: true, unique: true, ref: 'Person'},
    id: {type: String, required: true, unique: true}
});

const voteSchema = new Schema({
    id: {type: String, required: true, unique: true},
    voterID: {type: String, required: true, unique: true, ref: 'Voter'},
    candidateID: {type: String, required: true, unique: true, ref: 'Candidate'}
});

const logSchema = new Schema({
    voteID: {type: String, required: true, unique: true, ref: 'Vote'},
    timestamp: {type: String, required: true, unique: true}
});

const adminSchema = new Schema({
    ppsn: {type: String, required: true, unique: true, ref: 'Person'},
    id: {type: String, required: true, unique: true}
});

// Models
// - system
const User = mongoose.model('User', userSchema);
const Admin = mongoose.model('Admin', adminSchema);
// - application
const Person = mongoose.model('Person', personSchema);
const Candidate = mongoose.model('Candidate', candidateSchema);
const Ballot = mongoose.model('Ballot', ballotSchema);
const Voter = mongoose.model('Voter', voterSchema);
const Vote = mongoose.model('Vote', voteSchema);
const Log = mongoose.model('Log', logSchema); 

