import { URLSearchParams } from "url";
import { candidate_type } from "../../Basic/candidate_type";

export class retrieve_the_candidate_and_associated_information_voter_type {
    candidate : candidate_type;

    constructor(x:URLSearchParams){
        const candidate_id = x.get('candidateID').replace(/[{}]/g, "");
        
        this.candidate = new candidate_type(null, null, candidate_id);
    }

}