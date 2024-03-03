
export class update_ballot_admin_type {

    ballot = {};

    constructor(x){
        const ballot_id = x.get("ballotID");
        const closing_time = x.get("ballot_closing_time");
        this.ballot = {ballotID: ballot_id, closingDate: closing_time};
    }

}