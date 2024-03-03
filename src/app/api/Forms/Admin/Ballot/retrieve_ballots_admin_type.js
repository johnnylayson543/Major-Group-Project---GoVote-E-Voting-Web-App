

export class retrieve_ballots_admin_type {

    ballot_filter = {};

    constructor(x){
        const filter = (x.get('ballot_filter')) ? x.get('ballot_filter') : {};

        this.ballot_filter = filter;
    }

}