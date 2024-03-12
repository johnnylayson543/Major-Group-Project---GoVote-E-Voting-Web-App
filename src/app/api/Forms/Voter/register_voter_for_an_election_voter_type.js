
export class cast_vote_voter_type{
    voter = {}

    constructor(x){
        ppsn = x.get('ppsn');
        election_id = x.get('electionID');
        
        this.voter = {ppsn: ppsn, electionID: election_id};
    }

}