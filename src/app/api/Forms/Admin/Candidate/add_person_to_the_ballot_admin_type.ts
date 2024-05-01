import { URLSearchParams } from "url";
import { ballot_type } from "../../Basic/ballot_type";
import { person_type } from "../../Basic/person_type";
import { candidate_type } from "../../Basic/candidate_type";
import { Candidate } from "@/app/api/database/models/Candidate";

export class add_person_to_the_ballot_admin_type {
    
    person_filter :person_type
    ballot_filter :ballot_type
    candidate :candidate_type

    constructor(x:URLSearchParams){
        console.log("constructor: ");
        console.log(x);
        const ppsn = x.get('person_ppsn');
        const ballot_id = x.get('ballotID');
        this.ballot_filter = new ballot_type(ballot_id);
        this.person_filter = new person_type(ppsn);
        this.candidate = new candidate_type(ppsn, ballot_id);
    }
}