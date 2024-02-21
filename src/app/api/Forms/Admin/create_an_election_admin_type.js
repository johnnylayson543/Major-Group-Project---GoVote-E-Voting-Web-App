
class create_an_election_admin_type {

    election = {};

    constructor(x){
        const ballot_id = x.get('ballot_id');
        this.election = {ballotID: ballot_id};
    }

}