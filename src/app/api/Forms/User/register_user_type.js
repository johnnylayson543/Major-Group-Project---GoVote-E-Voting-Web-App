import { person_datails } from "./helpers/helpers";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Security } from "./helpers/helpers";

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
        let hashed_password1; Security.encrypt(password, saltRounds).then((hash) => hashed_password1 = hash);
        console.log('Generated hash: ', hashed_password1);


        const secretKey = "magic";
        const payload = {ppsn: ppsn, ...this.person_datails};
        const token = jwt.sign(payload, secretKey, { expiresIn: '1h'});
        console.log('Generated token: ', token);

        let role1;
        if(ppsn == 0) role1 = ['admin', 'user'];
        else role1 = ['user'];
        this.user = {ppsn: ppsn, pass: hashed_password1, token: token, role: role1 };

        console.log(email + ", " + date_of_birth + ", " + ppsn + ", " + pass + ", " + hashed_password1 + ", " + role1);
    }

    
}



// Form types and classes with function are changable 
// The rest is automatic 