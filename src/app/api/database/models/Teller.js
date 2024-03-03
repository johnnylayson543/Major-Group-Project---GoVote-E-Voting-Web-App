import mongoose from "mongoose";
import { getModel } from "./helpers/helpers";

const tellerSchema = new mongoose.Schema({
    personID: {type: String, required: true, unique: true, ref: 'Person'}
});

class TellerClass {
    static async tally_votes(x){
        try {
            const obj = {ballotID: x.ballotID};
            const tally = await Vote.tally_votes(x);    
            return tally;
        } catch (error) {
            console.error('An error occurred adding the log. ');
            console.error('Error occurred:', error.message);
        }
        
    }
}
logSchema.loadClass(LogClass)
const Teller = getModel('Log', logSchema); 

export default Teller;