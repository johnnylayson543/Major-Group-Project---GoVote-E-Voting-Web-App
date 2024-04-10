import mongoose from "mongoose";
import { getModel } from "./helpers/helpers";
import { Person } from "./Person";
import { Security } from "../../Forms/User/helpers/helpers";
import { cookies } from "next/headers";
import { Candidate } from "./Candidate";
import { Admin } from "./Admin";
import { Voter } from "./Voter";
import { Teller } from "./Teller";
import { System } from "./system/System";
//import { bcrypt } from 'bcrypt';

const userSchema = new mongoose.Schema({
    ppsn: { type: String, required: true, unique: true, ref: 'Person' },
    pass: { type: String, required: true },
    roles: { type: [String], default: ['user'] },
    token: { type: String, required: false, unique: true }
});


class UserClass {

    static async register_an_account(x) {
        console.log("Entered user function body.");
        try {
            console.log("Entered try.");
            console.log(x);

            const personData = { person: { ppsn: x.user.ppsn, ...x.person_datails } };
            const userData = { user: { ppsn: x.user.ppsn, pass: x.user.pass, token: x.user.token, role: x.user.role } };


            const filter = { ppsn: x.user.ppsn };
            console.log("filter: ");
            console.log(filter);
            const person1 = await Person.findOne(filter);
            const user1 = await User.findOne(filter);

            const isChangedPerson = !(person1 === personData);
            const isChangedUser = !(user1 === userData);



            console.log("Did person details change: " + isChangedPerson + ", Did user change details:" + isChangedUser)

            console.log("Entered await User find one.");
            console.log("Person result: " + person1);
            console.log("User result: " + user1);

            if (person1 && !user1) {
                console.log("Person exists, no user account. ");
                const new_user_result = await User.add_user_account(userData.user);
                const admin = await Admin.findOne({ person_ppsn: x.user.ppsn })
                if (admin != {}) {
                    const filter1 = { ppsn: x.user.ppsn }
                    const roles1 = new_user_result.roles
                    roles1.push('admin')
                    const update1 = { $set: { roles: roles1 } }
                    const user_update1 = await User.updateOne(filter1, update1)
                }

                let result = { user_result: new_user_result }
                if (isChangedPerson) {
                    const person_details_added_result = await User.update_person_details(personData);

                    result = { person_details_result: person_details_added_result, user_result: new_user_result };
                }
                return result;
            } else if (person1 && user1) {
                console.log("Person exists, user account exists. ");
                if (isChangedPerson) {
                    const person_details_added_result = await User.update_person_details(personData);
                    console.log(person_details_added_result);
                    return { person_details_result: person_details_added_result };
                }

                if (isChangedUser) {
                    const user_details_added_result = await User.update_user_account(userData.user);
                    console.log(user_details_added_result);
                    return { user_details_added_result: user_details_added_result };
                }
                console.error("User already exists. ");
            } else if (!person1) {
                console.error("User cannot be added. Person not identified in the database. ");
            }


            console.log("Finished try.");
            return { data: "Fail" };
        } catch (error) {
            console.error("It did not work.");
            console.error('Error occurred:', error.message);
        }

        console.log("Nothing.");
    }

    static async update_person_details(x) {
        try {
            const filter = { ppsn: x.user.ppsn };
            const person = await Person.findOne(filter);
            console.log(person)
            //personData = {ppsn: x.ppsn, name: x.name, address: x.address, phone: x.phone, email: x.email, date_of_birth: x.date_of_birth};
            if (person != {}) {
                const personData = { person: { ppsn: x.user.ppsn, ...x.person_datails } };
                console.log(personData)
                const obj = personData
                const updated_person = await Person.update_person_details(obj);
                return updated_person;
            }
            return null;
        }
        catch (error) {
            console.error('An error occurred updating the person details. ');
            console.error('Error occurred:', error.message);
        }

    }

    static async log_into_account(x) {
        try {
            const filter_user = { ppsn: x.user.ppsn };
            const user_found = await User.findOne(filter_user);
            const password_check = await Security.check_that_it_is_the_same_password(x.user.pass, user_found.pass);
            console.log("Password check: ");
            console.log(password_check);

            const userIsFound = user_found && user_found != {} && password_check;
            console.log("Found user: ");
            console.log(user_found);
            if (userIsFound) {
                cookies().set('user_token', user_found.token);
                for (const role of user_found.roles) {
                    cookies().set('user_role_' + role, true);
                }
                cookies().set('user_authenticated', true);
                console.log(cookies().toString());
            }

            return user_found;

        } catch (error) {
            console.error('An error occurred logging into the account. ');
            console.error('Error occurred:', error.message);
        }
    }

    static async is_signed_into_account(x) {
        try {
            const cookies1 = cookies().getAll();
            console.log("all cookies:");
            console.log(cookies1);
            const cookie = cookies().get('user_token');
            console.log("cookie, user_token: ");
            console.log(cookie);
            console.log("cookie, user_token: ");
            console.log(cookie.name + ": " + cookie.value);
            if (cookie != undefined && cookie.value != null) {
                const token = cookie.value;
                console.log("token from cookies:");
                console.log(token);
                const filter_user_from_cookie = { token: token };
                const user_found = await User.findOne(filter_user_from_cookie);
                //console.log("user_found:");
                //console.log(user_found);

                const userIsFound = user_found && user_found != {};
                if (userIsFound) {
                    const filter_admin = { person_ppsn: user_found.ppsn };
                    const admin = await Admin.findOne(filter_admin);
                    //console.log("admin: ");
                    //console.log(admin);

                    const filter_voter = { person_ppsn: user_found.ppsn };
                    const voter = await Voter.findOne(filter_voter);
                    //console.log("voter: ");
                    //console.log(voter);

                    const filter_teller = { person_ppsn: user_found.ppsn };
                    const teller = await Teller.findOne(filter_teller);
                    //console.log("teller: ");
                    //console.log(teller);

                    const filter_candidate = { person_ppsn: user_found.ppsn };
                    const candidate = await Candidate.findOne(filter_candidate);
                    //console.log("candidate: ");
                    //console.log(candidate);

                    const roles = user_found.roles;
                    //console.log("roles: ");
                    //console.log(roles);
                    if (admin && !(roles.includes('admin'))) roles.push('admin');
                    if (voter && !(roles.includes('voter'))) roles.push('voter');
                    if (teller && !(roles.includes('teller'))) roles.push('teller');
                    if (candidate && !(roles.includes('candidate'))) roles.push('candidate');

                    const filter = { _id: user_found._id };
                    const update = { $set: { roles: roles } }

                    const user_updated = await User.updateOne(filter, update);
                    const user_found1 = await User.findOne(filter);
                    //console.log("user_found: ");
                    //console.log(user_found1);
                    //console.log("filter: ");
                    //console.log(filter);


                    cookies().set('user_token', user_found1.token);
                    for (const role in user_found1.roles) {
                        cookies().set('user_role_' + role, true);
                    }
                    cookies().set('user_authenticated', true);
                    //console.log(cookies().toString());

                    return user_found1;
                };
            } else {
                console.log('Not signed in. ');
                return null;
            }

        } catch (error) {
            console.error('An error occurred checking sign in status. ');
            console.error('Error occurred:', error.message);
        }
    }

    static async add_user_account(x) {
        try {
            const user = await User.create(x);
        } catch (error) {
            console.error('Error adding the user account: ', error);
            console.error('Error occurred:', error.message);
        }
    }

    static async update_user_account(x) {
        try {
            const user = await User.updateOne(x.ppsn, x);
        } catch (error) {
            console.error('Error updating the user account: ', error);
            console.error('Error occurred:', error.message);
        }
    }

    static async remove_user_account(x) {
        try {
            const user = await User.deleteOne(x);
        } catch (error) {
            console.error('Error removing the user: ', error);
            console.error('Error occurred:', error.message);
        }
    }


    static async retrieve_the_persons_details(x) {
        try {
            const obj = { ppsn: x.user.ppsn };
            const person = await Person.retrieve_person(obj);
            return person;
        } catch (error) {
            console.error('Error retrieving the person details: ', error);
            console.error('Error occurred:', error.message);

        }

    }

    static async retrieve_the_candidate_with_this_ppsn(x) {
        try {
            const obj = { person_ppsn: x.user.ppsn };
            const candidate = await Candidate.retrieve_the_candidate_by_ppsn(obj)
            return candidate;
        } catch (error) {
            console.error('Error retrieving the candidate: ', error);
            console.error('Error occurred:', error.message);
        }
    }


    static async add_new_media(x) {
        try {
            const obj_file = { storageID: x.storage._id, filename: x.file.filename, hash: x.file.hash };
            const file = await File.add_file(obj_file);

            const obj_media = { userID: x.user._id, fileID: file._id, placement: x.media.placement };
            const media = await Media.create(obj_media);
            return { file: file, media: media };
        } catch (error) {
            console.error('Error retrieving the candidate: ', error);
            console.error('Error occurred:', error.message);
        }
    }

    static async add_media_to_my_storage(x) {
        try {
            const obj = { user: x.user, file: x.file, storage: x.storage, media: x.media };
            const media = await System.add_new_media_for_the_user(obj);
            return media
        } catch (error) {
            console.error('Error adding the media to my storage: ', error);
            console.error('Error occurred:', error.message);
        }
    }


    static async set_the_other_user_roles(x) {
        try {
            console.log("x: ");
            console.log(x);
            console.log("x.user.token");
            console.log(x.user.token);


            const filter_user = { token: x.user.token };
            const user = await User.findOne(filter_user);
            console.log("user: ");
            console.log(user);
            if (user != {}) {
                const filter_admin = { person_ppsn: user.ppsn };
                const admin = await Admin.findOne(filter_admin);

                const filter_voter = { person_ppsn: user.ppsn };
                const voter = await Voter.findOne(filter_voter);

                const filter_teller = { person_ppsn: user.ppsn };
                const teller = await Teller.findOne(filter_teller);

                const filter_candidate = { person_ppsn: user.ppsn };
                const candidate = await Candidate.findOne(filter_candidate);

                const roles = user.roles;
                if (admin != {}) roles.push('admin');
                if (voter != {}) roles.push('voter');
                if (teller != {}) roles.push('teller');
                if (candidate != {}) roles.push('candidate');

                const user_updated = await User.updateOne(filter_user, { $set: { roles: roles } });
                return user_updated;
            } else {
                return null;
            }

        } catch (error) {
            console.error('Error set the roles: ', error);
            console.error('Error occurred:', error.message);
        }
    }

}
userSchema.loadClass(UserClass)
export const User = getModel('User', userSchema);

//export default User;