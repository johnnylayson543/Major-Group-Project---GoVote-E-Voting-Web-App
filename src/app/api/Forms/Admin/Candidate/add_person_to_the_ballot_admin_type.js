
export class add_person_to_the_ballot_admin_type {
    
    person_filter = {}
    ballot_filter = {}
    candidate = {}

    constructor(x){
        console.log("constructor: ");
        console.log(x);
        const ppsn = x.get('person_ppsn');
        const ballot_id = x.get('ballotID');
        this.ballot_filter = {ballotID: ballot_id};
        this.person_filter = {ppsn: ppsn};
        this.candidate = { person_ppsn: ppsn, ballotID: ballot_id };
    }
}