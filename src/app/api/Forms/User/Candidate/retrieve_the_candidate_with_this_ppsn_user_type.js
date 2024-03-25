

export class retrieve_the_candidate_with_this_ppsn_user_type {
    user = {};

    constructor(x){
        const ppsn = x.get('ppsn');

        this.user = {ppsn: ppsn};

    }
}