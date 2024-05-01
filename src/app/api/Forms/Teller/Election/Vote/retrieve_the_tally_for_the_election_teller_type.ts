import { URLSearchParams } from "url";
import { election_type } from "../../../Basic/election_type";

export class retrieve_the_tally_for_the_election_teller_type {
    
    election :election_type

    constructor(x:URLSearchParams){
        const election_id = x.get('electionID').replace(/[{}]/g, "");
        this.election = new election_type(election_id);
        console.log(this.election);
    }

}