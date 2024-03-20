import mongoose from "mongoose";
import { getModel } from "./helpers/helpers";
import { Person, PersonClass } from "./Person";
import { Security } from "../../Forms/User/helpers/helpers";
import { cookies } from "next/headers";
//import { bcrypt } from 'bcrypt';

const userSchema = new mongoose.Schema({
    ppsn: {type: String, required: true, unique: true, ref: 'Person'},
    pass: {type: String, required: true},
    roles: {type: [String], default: ['user']},
    token: {type: String, required: false, unique: true}
});


class UserClass {

    static async register_an_account(x){
        console.log("Entered user function body.");
        try {
            console.log("Entered try."); 
            console.log(x);

            const personData = {person: {ppsn: x.user.ppsn, ...x.person_datails}};
            const userData = {user: {ppsn: x.user.ppsn, pass: x.user.pass, token: x.user.token, role: x.user.role }};


            const filter = {ppsn: x.user.ppsn};
            console.log("filter: ") ;
            console.log(filter) ;
            const person1 = await Person.findOne(filter);
            const user1 = await User.findOne(filter);

            const isChangedPerson = !(person1 === personData);
            const isChangedUser = !(user1 === userData);



            console.log("Did person details change: " + isChangedPerson + ", Did user change details:" + isChangedUser)

            console.log("Entered await User find one."); 
            console.log("Person result: " + person1);
            console.log("User result: " + user1);

            if(person1 && !user1){
                console.log("Person exists, no user account. ");
                const new_user_result = await User.add_user_account(userData.user);
                
                let result = {user_result: new_user_result}
                if(isChangedPerson){
                    const person_details_added_result = await User.update_person_details(personData);

                    result = {person_details_result: person_details_added_result, user_result: new_user_result};
                }
                return result;
            } else if (person1 && user1){
                console.log("Person exists, user account exists. ");
                if( isChangedPerson  ) {
                    const person_details_added_result = await User.update_person_details(personData);
                    console.log(person_details_added_result);
                    return {person_details_result: person_details_added_result};
                }

                if( isChangedUser  ) {
                    const user_details_added_result = await User.update_user_account(userData.user);
                    console.log(user_details_added_result);
                    return {user_details_added_result: user_details_added_result};
                }
                console.error("User already exists. ");
            } else if( !person1 ) {
                console.error("User cannot be added. Person not identified in the database. ");
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
            const filter = {ppsn: x.person.ppsn};
            const person = await Person.findOne(filter);
            //personData = {ppsn: x.ppsn, name: x.name, address: x.address, phone: x.phone, email: x.email, date_of_birth: x.date_of_birth};
            if(person) await Person.update_person_details(x.person);
        } catch (error) {
            console.error('An error occurred updating the person details. ');
            console.error('Error occurred:', error.message);      
        }

    }

    static async log_into_account(x){
        try {
            const filter_user = {ppsn: x.user.ppsn};
            const user_found = await User.findOne(filter_user);
            const password_check = await Security.check_that_it_is_the_same_password(x.user.pass, user_found.pass);
            console.log("Password check: ");
            console.log(password_check);

            const userIsFound = user_found && user_found != {} && password_check ;
            console.log("Found user: ");
            console.log(user_found);
            if(userIsFound) {
                cookies().set('user_token', user_found.token);
                for(const role of user_found.roles){
                    cookies().set('user_role_' + role , true);
                }
                cookies().set('user_authenticated', true);
                console.log(cookies().toString());
            }

            return user_found;

        } catch (error){
            console.error('An error occurred logging into the account. ');
            console.error('Error occurred:', error.message);
        }
    }

    static async is_signed_into_account(x){
        try {
            const token = cookies().get("user_token").value;
            console.log("token from cookies:");
            console.log(token);
            const filter_user_from_cookie = {token: token};
            const user_found = await User.findOne(filter_user_from_cookie);

            const userIsFound = user_found && user_found != {};
            if(userIsFound) {
                cookies().set('user_token', user_found.token);
                for(const role of user_found.roles){
                    cookies().set('user_role_' + role , true);
                }
                cookies().set('user_authenticated', true);
                console.log(cookies().toString());
            }
            return user_found;

        } catch (error) {
            console.error('An error occurred checking sign in status. ');
            console.error('Error occurred:', error.message);
        }
    }

    static async add_user_account(x){
        try {
            const user = await User.create(x);
        } catch (error) {
            console.error('Error adding the user account: ', error);
            console.error('Error occurred:', error.message);
        }
    }

    static async update_user_account(x){
        try {
            const user = await User.updateOne(x.ppsn, x);
        } catch (error) {
            console.error('Error updating the user account: ', error);
            console.error('Error occurred:', error.message);
        }
    }

    static async remove_user_account(x){
        try {
            const user = await User.deleteOne(x);
        } catch (error) {
            console.error('Error removing the user: ', error);
            console.error('Error occurred:', error.message);
        }
    }
}
userSchema.loadClass(UserClass)
export const User = getModel('User', userSchema);

//export default User;