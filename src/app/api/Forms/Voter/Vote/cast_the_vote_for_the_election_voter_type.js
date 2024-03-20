
export class cast_the_vote_for_the_election_voter_type {
    voter = {};
    candidate = {};

    constructor(x){
        const voter_id = x.get('voterID');
        const candidate_id = x.get('candidateID');
        
        this.voter = {_id: voter_id};
        this.candidate = {_id: candidate_id};
    }

}