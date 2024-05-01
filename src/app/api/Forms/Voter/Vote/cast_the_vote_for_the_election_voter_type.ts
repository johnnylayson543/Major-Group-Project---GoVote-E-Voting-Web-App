import { URLSearchParams } from "url";
import { voter_type } from "../../Basic/voter_type";
import { candidate_type } from "../../Basic/candidate_type";

export class cast_the_vote_for_the_election_voter_type {
    voter :voter_type;
    candidate :candidate_type;

    constructor(x:URLSearchParams){
        const voter_id = x.get('voterID');
        const candidate_id = x.get('candidateID');
        
        this.voter = new voter_type(voter_id?.toString()) ;
        this.candidate = new candidate_type("", "",candidate_id?.toString());
    }

}