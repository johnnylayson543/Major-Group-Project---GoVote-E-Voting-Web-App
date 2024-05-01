import { URLSearchParams } from "url";
import { user_type } from "../../Basic/user_type";

export class retrieve_the_persons_details_user_type {
    user : user_type;

    constructor(x:URLSearchParams){
        const ppsn = x.get('ppsn');
        this.user = new user_type(ppsn);
    }
}