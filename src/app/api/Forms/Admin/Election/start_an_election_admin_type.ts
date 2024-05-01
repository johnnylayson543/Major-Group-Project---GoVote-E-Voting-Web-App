import { ballot_type } from "../../Basic/ballot_type";

export class start_an_election_admin_type {

    ballot: ballot_type;

    constructor(x){
        const ballot_id = x.get('ballotID').replace(/[{}]/g, "");
        this.ballot = new ballot_type(ballot_id);
    }

}