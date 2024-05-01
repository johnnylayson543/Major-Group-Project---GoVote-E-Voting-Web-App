import { URLSearchParams } from "url";
import { person_range_type } from "../../Basic/person_range_type";

export class add_persons_range_admin_type {

    persons: person_range_type;

    constructor(x:URLSearchParams){

        const ppsn_min = x.get('ppsnMin');
        const ppsn_max = x.get('ppsnMax');

        this.persons = new person_range_type(Number.parseInt(ppsn_min), Number.parseInt(ppsn_max));
        
        console.log("From " + this.persons.min + " to " + this.persons.max + ". ");
    }

}