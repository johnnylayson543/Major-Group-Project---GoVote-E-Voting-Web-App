
class remove_candidate_from_ballot_admin_type {
    candidate = {}

    constructor(x){
        ppsn = x.get('ppsn');
        ballot_id = x.get('ballot_id');
        this.candidate = { ppsn: ppsn, ballotID: ballot_id };
    }
}