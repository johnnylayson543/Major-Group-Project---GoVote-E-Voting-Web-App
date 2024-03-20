
export class retrieve_the_voter_voter_type {
    user = {}

    constructor(x) {
        const person_id = x.get('person_ppsn');

        this.user = { ppsn: person_id };
    }

}