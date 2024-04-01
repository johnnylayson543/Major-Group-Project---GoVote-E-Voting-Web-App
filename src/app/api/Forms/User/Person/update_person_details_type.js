import { person_datails, person_datails_builder } from "../helpers/helpers";

export class update_person_details_type {
    person_datails = {};
    user = {}

    constructor(x){
        // x is a URL object, so get find the parameter name
        const ppsn = x.get('ppsn')
        const email = x.get('email');;
        const date_of_birth = x.get('date_of_birth');
        const name = x.get('name');
        const address = x.get('address');
        const phone = x.get('phone');

        this.user = {ppsn: ppsn}

        this.person_datails = new person_datails_builder()
            .setName(name) 
            .setAddress(address)
            .setPhone(phone)
            .setEmail(email)
            .setDateOfBirth(date_of_birth)
            .build()
            .describe();  
        console.log("Person Detsils:" + this.person) 
    }
}

// Form types and classes with function are changable 
// The rest is automatic 