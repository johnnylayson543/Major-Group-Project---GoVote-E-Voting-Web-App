import { user_type } from "../../Basic/user_type";


export class retrieve_the_candidate_with_this_ppsn_user_type {
    user :user_type;

    constructor(x :URLSearchParams){
        const ppsn = x.get('ppsn');

        this.user = {ppsn: ppsn, pass: null, roles: null, token: null};

    }
}