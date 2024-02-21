
class add_persons_range_admin_type {

    persons = {};

    constructor(x){

        const ppsn_min = x.get('ppsn');
        const ppsn_max = x.get('pass');

        this.range = {ppsn_range: {min: ppsn_min, max: ppsn_max}};
    }

}