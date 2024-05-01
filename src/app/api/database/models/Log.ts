import mongoose, { Document, Model } from "mongoose";
import { getModel } from "./helpers/helpers";
import { log_type } from "../../Forms/Basic/log_type";

export interface ILog extends Document {
    voteID: string;
    timestamp_created: Date;
    timestamp_updated: Date;
}

const logSchema = new mongoose.Schema<ILog>({
    voteID: {type: String, required: true, unique: true, ref: 'Vote'},
    timestamp_created: {type: Date, default: Date.now, required: true, unique: true},
    timestamp_updated: {type: Date, default: Date.now}
});
logSchema.pre('save', function(next) {
    this.timestamp_updated = new Date(Date.now());
    next();
});

logSchema.pre('updateOne', function() {
    this.updateOne({}, { $set: { timestamp_updated: Date.now() } });
});

logSchema.pre('findOneAndUpdate', function() {
    this.set( { timestamp_updated: Date.now() } ) ;
});

class LogClass {
    static async add_log(x:log_type):Promise<ILog & Document>{
        try {
            const obj = {voteID: x.voteID}
            const log = await Log.create(obj);    
            return log;
        } catch (error) {
            console.error('An error occurred adding the log. ');
            console.error('Error occurred:', error.message);
        }
        
    }
}

interface ILogModel extends Model<ILog>{
    add_log(x:log_type):Promise<ILog & Document>;
}
logSchema.loadClass(LogClass)
export const Log = getModel<ILog, ILogModel>({modelName: 'Log', modelSchema: logSchema}); 

//export default Log;