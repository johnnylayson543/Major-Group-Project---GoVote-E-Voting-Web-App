
export class remove_candidate_from_ballot_admin_type {
    candidate = {}

    constructor(x){
        const ppsn = x.get('person_ppsn');
        const ballot_id = x.get('ballotID');
        this.candidate = { person_ppsn: ppsn, ballotID: ballot_id };
    }
}