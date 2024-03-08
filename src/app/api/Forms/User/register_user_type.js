import { person_datails } from "./helpers/helpers";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { resolve } from "styled-jsx/css";

export class register_user_type {
    person_datails = {};
    user = {};

    constructor(x){
        // x is a URL object, so get find the parameter name
        const email = x.get('person_email');
        const date_of_birth = x.get('person_date_of_birth')
        const ppsn = x.get('user_ppsn')
        const pass = x.get('user_pass')
        const name = x.get('person_name');
        const address = x.get('person_address');
        const phone = x.get('person_phone');

        this.person_datails = person_datails.builder()
            .setName(name)
            .setAddress(address)
            .setPhone(phone)
            .setEmail(email)
            .setDateOfBirth(date_of_birth).build().describe();
        
        const password = pass;
        const saltRounds = 10;
        let hashed_password1 = await encrypt(password, saltRounds).then( (hashedPassword) => {
            console.log('Hashed Password: ', hashedPassword);
            return hashedPassword;
        }).catch((error)=>{
            console.error('Error hashing password: ', error);
        })
        


        const secretKey = "magic";
        const payload = {ppsn: ppsn, ...this.person_datails};
        const token = jwt.sign(payload, secretKey, { expiresIn: '1h'});
        console.log('Generated token: ', token);

        let role1;
        if(ppsn == 0) role1 = ['admin', 'user'];
        else role1 = ['user'];
        this.user = {user: {ppsn: ppsn, pass: hashed_password1, token: token, role: role1 }};

        console.log(email + ", " + date_of_birth + ", " + ppsn + ", " + pass + ", " + hashed_password1 + ", " + role1);
    }
}


function encrypt(password, saltRounds){
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if(err){
                reject(err);
            } else {
                resolve(hash);
            }
        });
    });
}


// Form types and classes with function are changable 
// The rest is automatic 