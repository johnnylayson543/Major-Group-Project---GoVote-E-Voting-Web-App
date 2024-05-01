import { URLSearchParams } from "url";
import { candidate_type } from "../../Basic/candidate_type";

export class remove_candidate_from_ballot_admin_type {
    candidate : candidate_type

    constructor(x:URLSearchParams){
        const ppsn = x.get('person_ppsn');
        const ballot_id = x.get('ballotID');
        this.candidate = new candidate_type( ppsn, ballot_id );
    }
}