
export class remove_ballot_admin_type {

    ballot = {};

    constructor(x){
        const ballot_id = x.get("ballotID").replace(/[{}]/g, "");
        this.ballot = {ballotID: ballot_id};
    }

}