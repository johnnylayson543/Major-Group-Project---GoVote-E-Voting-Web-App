
export class start_an_election_admin_type {

    ballot = {};

    constructor(x){
        const ballot_id = x.get('ballotID').replace(/[{}]/g, "");
        this.ballot = {ballotID: ballot_id};
    }

}