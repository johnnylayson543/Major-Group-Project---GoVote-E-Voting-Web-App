import { URLSearchParams } from "url";
import { voter_type } from "../../Basic/voter_type";

export class retrieve_the_votes_for_the_voter_voter_type {
    voter : voter_type;

    constructor(x :URLSearchParams) {
        const voter_id = x.get('voterID').replace(/[{}]/g, "");

        this.voter = new voter_type(voter_id);
    }

}