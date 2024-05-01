import { URLSearchParams } from "url";
import { election_type } from "../../../Basic/election_type";

export class retrieve_the_tallies_teller_type {
    
    election :election_type

    constructor(x:URLSearchParams){
        this.election = new election_type();
    }

}