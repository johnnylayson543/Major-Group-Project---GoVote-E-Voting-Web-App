
class add_persons_range_admin_type {

    persons = {};

    constructor(x){

        const ppsn_min = x.get('ppsnmin');
        const ppsn_max = x.get('ppsnmax');

        this.persons = {ppsn_range: {min: ppsn_min, max: ppsn_max}};
        
        console.log("From " + persons.ppsn_range.min + " to " + persons.ppsn_range.max + ". ");
    }

}