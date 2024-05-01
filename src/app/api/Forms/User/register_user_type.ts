import { person_datails_builder } from "./helpers/helpers";
import jwt from "jsonwebtoken";
import { Security } from "./helpers/helpers";
import { person_details_type } from "../Basic/person_type";
import { user_type } from "../Basic/user_type";

export class register_user_type {
    person_datails :person_details_type;
    user :user_type;

    constructor(x :URLSearchParams){
        // x is a URL object, so get find the parameter name
        const email = x.get('person_email');
        const date_of_birth = x.get('person_date_of_birth')
        const ppsn = x.get('user_ppsn')
        const pass = x.get('user_pass')
        const name = x.get('person_name');
        const address = x.get('person_address');
        const phone = x.get('person_phone');


        this.person_datails = new person_details_type(
            new person_datails_builder()
            .setName(name)
            .setAddress(address)
            .setPhone(phone)
            .setEmail(email)
            .setDateOfBirth(date_of_birth).build().describe()
        );
        
        const password = pass;
        const saltRounds = 10;
        
        
        //console.log('Generated hash: ', hashed_password1);


        const secretKey = "magic";
        const payload = {ppsn: ppsn, ...this.person_datails};
        const token = jwt.sign(payload, secretKey, { expiresIn: '1h'});
        console.log('Generated token: ', token);

        let role1 = ['user'];
        //if(ppsn == 0) role1 = ['admin', 'user'];
        //else role1 = ['user'];
        this.user = new user_type({ppsn: ppsn, pass: pass, token: token, roles: role1 });

        console.log(email + ", " + date_of_birth + ", " + ppsn + ", " + pass + ", " + role1);
    }

    async hash_the_password(){
        const password = this.user.pass;
        const saltRounds = 10;
        const hashed_password1 = await Security.encrypt(password, saltRounds);
        this.user.pass = hashed_password1;
        console.log('Generated hash: ', hashed_password1);
    }

    

    
}



// Form types and classes with function are changable 
// The rest is automatic 