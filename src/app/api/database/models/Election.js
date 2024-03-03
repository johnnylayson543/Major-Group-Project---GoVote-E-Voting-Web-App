import mongoose from "mongoose";
import { getModel } from "./helpers/helpers";

const electionSchema = new mongoose.Schema({
    ballotID: {type: String, required: true, unique: true, ref: 'Ballot'}
});


class ElectionClass {
    static async add_election(x){
        try {
            const obj = {ballotID: x.ballotID};
            const election = await Election.create(obj);
        } catch (error) {
            console.error('An error occurred adding the election. ');
            console.error('Error occurred:', error.message);
        }
    }

    static async remove_election(x){
        try {
            const obj = {ballotID: x.ballotID};
            const election = await Election.deleteOne(obj);
        } catch (error) {
            console.error('An error occurred removing the election. ');
            console.error('Error occurred:', error.message);
        }
    }
}
electionSchema.loadClass(ElectionClass);
export const Election = getModel('Election', electionSchema);

//export default Election;