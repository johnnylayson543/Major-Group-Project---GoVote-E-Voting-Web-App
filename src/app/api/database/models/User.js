import mongoose from "mongoose";
import { getModel } from "./helpers/helpers";
import { Person, PersonClass } from "./Person";

const userSchema = new mongoose.Schema({
    ppsn: {type: String, required: true, unique: true, ref: 'Person'},
    pass: {type: String, required: true},
    token: {type: String, required: false}
});

class UserClass {

    static async register_an_account(x){
        try {
            const user_filter = {ppsn: x.user.ppsn};
            const user = await User.findOne(user_filter);
            userData = {ppsn: x.user.ppsn, pass: x.user.pass };
            if(user) User.add_user_account(userData);
            const user_confimed = await User.findOne(userData);
            personData = {ppsn: x.user.ppsn, name: x.person_details.name, address: x.person_details.address, phone: x.person_details.phone, email: x.person_details.email, date_of_birth: x.person_details.date_of_birth};
            if(user_confimed) await Person.add_person_details(personData);
        } catch (error) {
            
        }
    }

    static async update_person_details(x){
        try {
            const filter = {ppsn: x.ppsn};
            const person = await Person.findOne(x.ppsn);
            personData = {ppsn: x.ppsn, name: x.name, address: x.address, phone: x.phone, email: x.email, date_of_birth: x.date_of_birth};
            if(person) await Person.update_person_details(personData);
        } catch (error) {
            
        }

    }

    static async log_into_account(x){
        try {
            const filter = {ppsn: x.ppsn, pass: x.pass};
            const user = await User.findOne(filter);

        } catch (error){

        }
    }

    static async add_user_account(x){
        try {
            const user = await User.save(x);
        } catch (error) {
            console.error('Error creating the user: ', error);
        }
    }

    static async update_user_account(x){
        try {
            const user = await User.updateOne(x.ppsn, x);
        } catch (error) {
            console.error('Error creating the user: ', error);
        }
    }

    static async remove_user_account(x){
        try {
            const user = await User.deleteOne(x);
        } catch (error) {
            console.error('Error removing the user: ', error);
        }
    }
}
userSchema.loadClass(UserClass)
export const User = getModel('User', userSchema);

//export default User;