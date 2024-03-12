
export class add_persons_range_admin_type {

    persons = {};

    constructor(x){

        const ppsn_min = x.get('ppsnMin');
        const ppsn_max = x.get('ppsnMax');

        this.persons = {ppsn_range: {min: ppsn_min, max: ppsn_max}};
        
        console.log("From " + this.persons.ppsn_range.min + " to " + this.persons.ppsn_range.max + ". ");
    }

}