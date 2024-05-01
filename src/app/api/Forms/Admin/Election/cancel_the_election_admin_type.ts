import { URLSearchParams } from "url";
import { ballot_type } from "../../Basic/ballot_type";

export class cancel_the_election_admin_type {

    ballot:ballot_type;

    constructor(x:URLSearchParams){
        const ballot_id = x.get('ballot_id');
        this.ballot = new ballot_type(ballot_id);
    }

}