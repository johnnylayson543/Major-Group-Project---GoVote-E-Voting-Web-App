import mongoose, { Document, Model, UpdateWriteOpResult } from "mongoose";
import { getModel } from "./helpers/helpers";
import { person_type } from "../../Forms/Basic/person_type";
import { DeleteResult, UpdateResult } from "mongodb";
import { update_person_details_type } from "../../Forms/User/Person/update_person_details_type";
import { user_type } from "../../Forms/Basic/user_type";


export interface IPerson extends Document {
    ppsn: String;
    name: String;
    address: String;
    phone: String;
    email: String;
    date_of_birth: Date;
} 

const personSchema = new mongoose.Schema<IPerson>({
    ppsn: {type: String, required: true, unique: true},
    name: {type: String, required: false},
    address: {type: String, required: false},
    phone: {type: String, required: false},
    email: {type: String, required: false},
    date_of_birth: {type: Date, required: false}
})

class PersonClass {

    static async add_person(x : person_type):Promise<IPerson & Document>{
        try {
            const obj = {ppsn: x.ppsn};
            const person_result = await Person.create(obj);
            return person_result;
        } catch (error) {
            console.error('Error adding the person details: ', error);
            console.error('Error occurred:', error.message);
        }
    }

    static async add_person_details(x : person_type):Promise<IPerson & Document>{
        try {
            const obj = x;
            const person_result = await Person.create(obj);
            return person_result;
        } catch (error) {
            console.error('Error adding the person details: ', error);
            console.error('Error occurred:', error.message);
        }
    }

    static async update_person_details(x : person_type):Promise<UpdateResult> {
        try {
            const filter1 = {ppsn: x.ppsn};
            //const obj = {ppsn: x.ppsn, name: x.name, address: x.address, email: x.email, phone: x.phone, date_of_birth: x.date_of_birth};
            const update1 = { $set: { name: x.name, address: x.address, email: x.email, phone: x.phone }}
            
            const person_details_update_result = await Person.updateOne(filter1,update1);
            return person_details_update_result;
        } catch (error) {
            console.error('Error updating the person details: ', error);
            console.error('Error occurred:', error.message);
        }
    }

    static async remove_person_details(x :person_type):Promise<DeleteResult> {
        try {
            const filter_person = {ppsn: x.ppsn};
            const person_remove_result = await Person.deleteOne(filter_person);
            return person_remove_result;
        } catch (error) {
            console.error('Error deleting the person details: ', error);
            console.error('Error occurred:', error.message);
        }
    }

    static async retrieve_person(x :user_type|person_type):Promise<IPerson & Document> {
        try {
            const filter_person = {ppsn: x.ppsn};
            const person_result = await Person.findOne(filter_person);
            //console.log("person_result:");
            //console.log(person_result);
            return person_result;
        } catch (error) {
            console.error('Error retrieving the person details: ', error);
            console.error('Error occurred:', error.message);
        }
    }
}

interface IPersonModel extends Model<IPerson>{
    add_person(x : person_type):Promise<IPerson & Document>;
    add_person_details(x : person_type):Promise<IPerson & Document>;
    update_person_details(x : person_type):Promise<UpdateResult>;
    remove_person_details(x :person_type):Promise<DeleteResult>;
    retrieve_person(x :user_type|person_type):Promise<IPerson & Document>;
}

personSchema.loadClass(PersonClass)
export const Person = getModel<IPerson,IPersonModel >({modelName: 'Person', modelSchema: personSchema});

//export default Person;