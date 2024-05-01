import { URLSearchParams } from "url";
import { person_type } from "../../Basic/person_type";


export class retrieve_selected_person_for_candidate_selection_admin_type {

    person :person_type;

    constructor(x: URLSearchParams){
        const person = {ppsn: x.get('person_ppsn').replace(/[{}]/g, "")};
        console.log("person: "); console.log(person);

        this.person = new person_type(person.ppsn);
    }

}