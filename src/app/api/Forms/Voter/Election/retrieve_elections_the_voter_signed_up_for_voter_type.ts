import { URLSearchParams } from "url";
import { voter_type } from "../../Basic/voter_type";

export class retrieve_elections_the_voter_signed_up_for_voter_type {
    voter : voter_type;

    constructor(x:URLSearchParams){
        const person_id = x.get('person_ppsn').replace(/[{}]/g, "");
        
        this.voter = new voter_type(null, person_id);
    }

}