import { person_datails } from "./helpers/helpers";

export class update_person_details_type {
    person_datails = {};
    user = {};

    constructor(x){
        // x is a URL object, so get find the parameter name
        const email = x.get('person_email');;
        const date_of_birth = x.get('person_date_of_birth');
        const ppsn = x.get('user_ppsn');
        const pass = x.get('user_pass');
        const name = x.get('person_name');
        const address = x.get('person_address');
        const phone = x.get('person_phone');


        this.person_datails = person_datails.builder
            .setName(name)
            .setAddress(address)
            .setPhone(phone)
            .setEmail(email)
            .setDateOfBirth(date_of_birth).build().descibe();
        this.user = {ppsn: ppsn, pass: pass};   
        console.log(email + ", " + date_of_birth + ", " + ppsn + ", " + pass);
    }
}

// Form types and classes with function are changable 
// The rest is automatic 