
class tally_votes_teller_type{
    ballot = {}

    constructor(x){
        ballot_id = x.get('ballotID');
        this.ballot = {ballotID: ballot_id};
    }

}