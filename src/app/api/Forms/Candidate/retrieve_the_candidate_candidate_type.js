
export class retrieve_the_candidate_candidate_type {
    
    user = {}

    constructor(x){
        const person_id = x.get('person_ppsn');
        this.user = {ppsn: person_id};
    }

}