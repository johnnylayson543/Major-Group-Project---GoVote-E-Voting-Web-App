

export class retrieve_the_election_admin_type {

    election_filter = {};

    constructor(x){
        const filter = {ballotID: x.get('ballotID')};

        this.election_filter = filter;
    }

}