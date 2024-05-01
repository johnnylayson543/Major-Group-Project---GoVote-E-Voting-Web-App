
import { URLSearchParams } from "url";
import { vote_type } from "../../Basic/vote_type";

class recast_vote_voter_type{
    vote : vote_type;

    constructor(x:URLSearchParams){
        const voter_id = x.get('voterID');
        const candidate_id = x.get('candidateID');

        this.vote = new vote_type(voter_id, candidate_id);
    }

}