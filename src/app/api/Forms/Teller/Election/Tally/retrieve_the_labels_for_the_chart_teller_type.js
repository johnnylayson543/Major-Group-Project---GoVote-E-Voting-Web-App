
export class retrieve_the_labels_for_the_chart_teller_type {
    
    election = {}

    constructor(x){
        const election_id = x.get('electionID')
        this.election = {_id: election_id};
    }

}