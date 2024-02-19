import mongoose from "mongoose";
import { mongoose_client } from "../mongooseDocker";
import { getModel } from "./helpers/helpers";

const logSchema = new mongoose.Schema({
    voteID: {type: String, required: true, unique: true, ref: 'Vote'},
    timestamp_created: {type: Date, default: Date.now, required: true, unique: true},
    timestamp_updated: {type: Date, default: Date.now}
});
logSchema.pre('save', function(next) {
    this.timestamp_updated = Date.now();
    next();
});

logSchema.pre('update', function() {
    this.update({}, { $set: { timestamp_updated: Date.now() } });
});

logSchema.pre('findOneAndUpdate', function() {
    this.set( { timestamp_updated: Date.now() } ) ;
});

class LogClass {
    static async add_log(x){
        try {
            const obj = {voteID: x._id}
            const result = await Log.create(x);    
        } catch (error) {
            console.error('An error occurred adding the log. ');
            console.error('Error occurred:', error.message);
        }
        
    }
}
logSchema.loadClass(LogClass)
const Log = getModel('Log', logSchema); 

export default Log;