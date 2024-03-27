

export class retrieve_the_candidate_admin_type {

    candidate = {};

    constructor(x){
        const candidate = {_id: x.get('candidateID').replace(/[{}]/g, "")};
        console.log("candidate: "); console.log(candidate);

        this.candidate = candidate;
    }

}