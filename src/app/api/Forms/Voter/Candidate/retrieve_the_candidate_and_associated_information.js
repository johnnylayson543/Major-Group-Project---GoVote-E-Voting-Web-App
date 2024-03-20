
export class retrieve_the_candidate_and_associated_information_voter_type {
    candidate = {}

    constructor(x){
        const candidate_id = x.get('candidateID').replace(/[{}]/g, "");
        
        this.candidate = {_id: candidate_id};
    }

}