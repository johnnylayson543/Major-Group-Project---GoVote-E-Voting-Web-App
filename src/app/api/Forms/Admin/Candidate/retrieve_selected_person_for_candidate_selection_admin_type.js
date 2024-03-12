

export class retrieve_selected_person_for_candidate_selection_admin_type {

    person = {};

    constructor(x){
        const person = {ppsn: x.get('person_ppsn').replace(/[{}]/g, "")};
        console.log("person: "); console.log(person);

        this.person = person;
    }

}