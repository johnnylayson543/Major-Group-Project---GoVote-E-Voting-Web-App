
export class signup_for_the_election_voter_type {
    voter = {}

    constructor(x){
        ppsn = x.get('person_ppsn');
        election_id = x.get('electionID').replace(/[{}]/g, "");
        
        this.voter = {person_ppsn: ppsn, electionID: election_id};
    }

}