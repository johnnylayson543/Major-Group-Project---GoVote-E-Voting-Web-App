import { URLSearchParams } from "url";
import { ballot_type } from "../../Basic/ballot_type";

export class remove_ballot_admin_type {

    ballot :ballot_type;

    constructor(x: URLSearchParams){
        const ballot_id = x.get("ballotID").replace(/[{}]/g, "");
        this.ballot = new ballot_type(ballot_id);
    }

}