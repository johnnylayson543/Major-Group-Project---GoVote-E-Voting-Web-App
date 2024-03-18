
export class cancel_the_election_admin_type {

    ballot = {};

    constructor(x){
        const ballot_id = x.get('ballot_id');
        this.ballot = {ballotID: ballot_id};
    }

}