import { URLSearchParams } from "url";
import { voter_type } from "../../Basic/voter_type";

export class signup_for_the_election_voter_type {
    voter : voter_type;

    constructor(x: URLSearchParams){
        const ppsn = x.get('person_ppsn');
        const election_id = x.get('electionID').replace(/[{}]/g, "");
        
        this.voter = new voter_type(null, ppsn, election_id);
    }

}