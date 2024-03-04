

export class retrieve_ballots_admin_type {

    ballot_filter = {};

    constructor(x){
        const ballot_filter = (x.get('ballotID') !== null) ? x.get('ballotID') : {};

        this.ballot_filter = ballot_filter;
    }

}