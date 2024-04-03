
export class retrieve_the_tally_for_the_election_teller_type {
    
    election = {}

    constructor(x){
        const election_id = x.get('electionID').replace(/[{}]/g, "");
        this.election = {electionID: election_id};
        console.log(this.election);
    }

}