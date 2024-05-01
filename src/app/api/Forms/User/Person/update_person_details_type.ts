import { URL, URLSearchParams } from "url";
import { person_datails, person_datails_builder } from "../helpers/helpers";
import { person_type } from "../../Basic/person_type";
import { user_type } from "../../Basic/user_type";

export class update_person_details_type {
    person_datails: person_type;
    user: user_type;

    constructor(person_detail : person_type, user : user_type) {
        // x is a URL object, so get find the parameter name
            this.person_datails = person_detail;
            this.user = user;
        console.log("Person Detsils:" + this.person_datails)
    }

    static getWithSearchParams(x: URLSearchParams): update_person_details_type {
        const ppsn = x.get('ppsn')
        const email = x.get('email');;
        const date_of_birth = x.get('date_of_birth');
        const name = x.get('name');
        const address = x.get('address');
        const phone = x.get('phone');

        const details =  new person_datails_builder()
        .setName(name)
        .setAddress(address)
        .setPhone(phone)
        .setEmail(email)
        .setDateOfBirth(date_of_birth)
        .build()
        .describe();
        const person_datails = new person_type(ppsn, details.name, details.address, details.phone, details.email, details.date_of_birth);

        const user1 = new user_type( ppsn );

        return new update_person_details_type(person_datails, user1);
    }

}

// Form types and classes with function are changable
// The rest is automatic 