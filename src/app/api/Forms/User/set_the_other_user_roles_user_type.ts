import { URLSearchParams } from "url";
import { user_type } from "../Basic/user_type";

export class set_the_other_user_roles_user_type {
    user :user_type;

    constructor(x:URLSearchParams){
        const token = x.get('userToken');
        console.log("token: " + decodeURIComponent(token));
        this.user = new user_type(null, null, null, token);
        console.log("x.user.token: ");
        console.log(this.user.token)
        
        console.log("user: " + this.user);
    }
}