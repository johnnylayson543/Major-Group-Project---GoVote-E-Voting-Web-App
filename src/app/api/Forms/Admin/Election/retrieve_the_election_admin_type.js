

export class retrieve_the_election_admin_type {

    ballot = {};

    constructor(x){
        const filter = {ballotID: x.get('ballotID').replace(/[{}]/g, "")};

        this.ballot = filter;
    }

}