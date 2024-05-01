import { URLSearchParams } from "url";
import { person_type } from "../../Basic/person_type";


export class confirm_person_exists_on_the_system_admin_type {

    person_filter: person_type;

    constructor(x:URLSearchParams){
        const person_ppsn = x.get('person_ppsn')
        const filter = {ppsn: person_ppsn};

        this.person_filter = new person_type(filter.ppsn);
    }

}