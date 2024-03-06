

export class retrieve_candidates_for_the_ballot_admin_type {

    ballot = {};

    constructor(x){
        const ballot = {ballotID: x.get('ballotID').replace(/[{}]/g, "")};
        console.log("ballot: "); console.log(ballot);

        this.ballot = ballot;
    }

}