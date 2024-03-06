

export class confirm_person_exists_on_the_system_admin_type {

    person_filter = {};

    constructor(x){
        const person_ppsn = x.get('person_ppsn')
        const filter = {ppsn: person_ppsn};

        this.person_filter = filter;
    }

}