import mongoose from "mongoose";
import { getModel } from "./helpers/helpers";

const personSchema = new mongoose.Schema({
    ppsn: {type: String, required: true, unique: true},
    name: {type: String, required: false},
    address: {type: String, required: false},
    phone: {type: String, required: false},
    email: {type: String, required: false}
})

class PersonClass {

    static async add_person_details(x){
        try {
            const user = await Person.save(x);
        } catch (error) {
            console.error('Error creating the person details: ', error);
        }
    }

    static async update_person_details(x){
        try {
            const user = await Person.updateOne({ppsn: x.ppsn},x);
        } catch (error) {
            console.error('Error creating the person details: ', error);
        }
    }

    static async remove_person_details(x){
        try {
            const user = await Person.deleteOne(x.ppsn, x);
        } catch (error) {
            console.error('Error deleting the person details: ', error);
        }
    }
}
personSchema.loadClass(PersonClass)
export const Person = getModel('Person', personSchema);

//export default Person;