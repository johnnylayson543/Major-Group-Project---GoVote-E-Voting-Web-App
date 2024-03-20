
export class retrieve_elections_the_voter_signed_up_for_voter_type {
    voter = {}

    constructor(x){
        const voter_id = x.get('voterID').replace(/[{}]/g, "");
        
        this.voter = {_id: voter_id};
    }

}