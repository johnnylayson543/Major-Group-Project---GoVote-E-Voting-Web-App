

export class retrieve_ballot_admin_type {

    ballot_filter = {};

    constructor(x){
        const ballot_filter = {ballotID: x.get('ballotID').replace(/[{}]/g, "")};
        console.log("ballot_filter: "); console.log(ballot_filter);

        this.ballot_filter = ballot_filter;
    }

}