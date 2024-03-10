
class is_signed_into_account_user_type {
    user = {};

    constructor(x){
        this.user.token = x.get('user_token');

        console.log("user check { token:" + this.user.token + " } ");
    }
}