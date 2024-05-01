import { URLSearchParams } from "url";
import { ballot_type } from "../../Basic/ballot_type";


export class retrieve_the_ballot_admin_type {

    ballot_filter: ballot_type;

    constructor(x :URLSearchParams){
        const ballot_filter = {ballotID: x.get('ballotID').replace(/[{}]/g, "")};
        console.log("ballot_filter: "); console.log(ballot_filter);

        this.ballot_filter = new ballot_type(ballot_filter.ballotID);
    }

}