import { URLSearchParams } from "url";
import { ballot_type } from "../../Basic/ballot_type";


export class retrieve_candidates_for_the_ballot_admin_type {

    ballot: ballot_type;

    constructor(x :URLSearchParams){
        const ballot = {ballotID: x.get('ballotID').replace(/[{}]/g, "")};
        console.log("ballot: "); console.log(ballot);

        this.ballot = new ballot_type(ballot.ballotID);
    }

}