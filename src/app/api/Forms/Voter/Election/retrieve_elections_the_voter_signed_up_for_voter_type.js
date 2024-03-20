
export class retrieve_elections_the_voter_signed_up_for_voter_type {
    voter = {}

    constructor(x){
        const person_id = x.get('person_ppsn').replace(/[{}]/g, "");
        
        this.voter = {person_ppsn: person_id};
    }

}