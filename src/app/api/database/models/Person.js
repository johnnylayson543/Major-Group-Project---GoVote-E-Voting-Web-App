import mongoose from "mongoose";
import { getModel } from "./helpers/helpers";

const personSchema = new mongoose.Schema({
    ppsn: {type: String, required: true, unique: true},
    name: {type: String, required: false},
    address: {type: String, required: false},
    phone: {type: String, required: false},
    email: {type: String, required: false},
    date_of_birth: {type: Date, required: false}
})

class PersonClass {

    static async add_person_details(x){
        try {
            const obj = {ppsn: x.ppsn, name: x.name, address: x.address, email: x.email, phone: x.phone, date_of_birth: x.date_of_birth};
            const person_result = await Person.create(obj);
            return person_result;
        } catch (error) {
            console.error('Error adding the person details: ', error);
            console.error('Error occurred:', error.message);
        }
    }

    static async update_person_details(x){
        try {
            const filter_person = {ppsn: x.ppsn};
            //const obj = {ppsn: x.ppsn, name: x.name, address: x.address, email: x.email, phone: x.phone, date_of_birth: x.date_of_birth};
            const person_details_update_result = await Person.updateOne(filter_person,x);
            return person_details_update_result;
        } catch (error) {
            console.error('Error updating the person details: ', error);
            console.error('Error occurred:', error.message);
        }
    }

    static async remove_person_details(x){
        try {
            const filter_person = {ppsn: x.ppsn};
            const person_remove_result = await Person.deleteOne(filter_person);
            return person_remove_result;
        } catch (error) {
            console.error('Error deleting the person details: ', error);
            console.error('Error occurred:', error.message);
        }
    }

    static async retrieve_person(x){
        try {
            const filter_person = {ppsn: x.ppsn};
            const person_result = await Person.findOne(filter_person);
            return person_result;
        } catch (error) {
            console.error('Error retrieving the person details: ', error);
            console.error('Error occurred:', error.message);
        }
    }
}
personSchema.loadClass(PersonClass)
export const Person = getModel('Person', personSchema);

//export default Person;