
export class retrieve_voter_signedup_elections_voter_type {
    voter = {}

    constructor(x){
        const voter_id = x.get('voterID');
        
        this.voter = {_id: voter_id};
    }

}