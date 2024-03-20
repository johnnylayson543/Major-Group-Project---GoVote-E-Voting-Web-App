
class recast_vote_voter_type{
    vote = {}

    constructor(x){
        const voter_id = x.get('voterID');
        const candidate_id = x.get('candidateID');

        this.vote = {voterID: voter_id, candidateID: candidate_id};
    }

}