import { URLSearchParams } from "url";
import { user_type } from "../Basic/user_type";

export class is_signed_into_account_user_type {
    user :user_type;

    constructor(x?: URLSearchParams){
        const token = x.get('user_token');
        this.user = new user_type(null,null,null,token);
        console.log("user check { token:" + this.user.token + " } ");
    }
}