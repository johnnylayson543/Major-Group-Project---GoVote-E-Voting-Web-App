
export class cast_vote_voter_type{
    vote = {}

    constructor(x){
        voter_id = x.get('voterID');
        candidate_id = x.get('candidateID');
        
        this.vote = {voterID: voter_id, candidateID: candidate_id};
    }

}