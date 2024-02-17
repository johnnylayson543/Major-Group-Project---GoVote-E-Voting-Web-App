import mongoose from "mongoose";
import { mongoose_client } from "../mongooseDocker";
import { getModel } from "./helpers/helpers";
import { Person, PersonClass } from "./Person";

const userSchema = new mongoose.Schema({
    ppsn: {type: String, required: true, unique: true, ref: 'Person'},
    pass: {type: String, required: true},
    token: {type: String, required: false}
});

class UserClass {

    static async register_an_account(x){
        console.log("Entered user function body.");
        try {
            console.log("Entered try."); 
            const user_filter = {ppsn: x.user.ppsn};

            console.log("Entered await User find one."); 
            const person1 = await Person.findOne(user_filter);
            const user1 = await User.findOne(user_filter);
            console.log("Person result: " + person1);
            console.log("User result: " + user1);

            if(person1 && !user1){
                const userData = {ppsn: x.user.ppsn, pass: x.user.pass };
                const new_user_result = await User.add_user_account(userData);

                const personData = {ppsn: x.user.ppsn, name: x.person_details.name, address: x.person_details.address, phone: x.person_details.phone, email: x.person_details.email, date_of_birth: x.person_details.date_of_birth};
                const person_details_added_result = await await Person.update_person_details(personData);
                return {user_result: new_user_result, person_details_result: person_details_added_result};
            } else if (person1 && user1){
                console.log("User already exists. ");
            } else if( !person1 ) {
                console.log("User cannot be added. Person not identified in the database. ");
            }

            
            console.log("Finished try.");
            return {data: "Fail"};
        } catch (error) {
            console.error("It did not work.");
            console.error('Error occurred:', error.message);
        }

        console.log("Nothing.");
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

            return (user) ? {user_authenticated: true, token: user.token } : {user_authenticated: false}

        } catch (error){

        }
    }

    static async add_user_account(x){
        try {
            const user = await User.create(x);
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