import { ballot_type } from "../../Basic/ballot_type";


export class retrieve_the_election_admin_type {

    ballot: ballot_type;

    constructor(x: URLSearchParams){
        const filter = {ballotID: x.get('ballotID').replace(/[{}]/g, "")};

        this.ballot = new ballot_type(filter.ballotID);
    }

}