
export class retrieve_the_persons_details_user_type {
    user = {};

    constructor(x){
        const ppsn = x.get('ppsn');
        this.user = {ppsn: ppsn};

    }
}