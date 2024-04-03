
export class retrieve_the_teller_teller_type {
    
    user = {}

    constructor(x){
        const person_id = x.get('person_ppsn');
        this.user = {ppsn: person_id};
    }

}