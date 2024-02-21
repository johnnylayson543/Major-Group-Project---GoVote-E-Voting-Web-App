
class add_candidate_to_ballot_admin_type {
    candidate = {}

    constructor(x){
        ppsn = x.get('ppsn');
        ballot_id = x.get('ballot_id');
        this.candidate = { ppsn: ppsn, ballotID: ballot_id };
    }
}