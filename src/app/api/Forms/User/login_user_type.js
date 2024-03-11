import { Security } from "./helpers/helpers";

export class login_user_type {
    user = {};
    authentication = {};

    constructor(x){
        const ppsn = x.get('ppsn');
        const pass = x.get('pass');

        this.user = {ppsn: ppsn, pass: pass};

        console.log("login user { ppsn:" + this.user.ppsn + ", pass: " + this.user.pass ) + " } ";
    }

    async check_the_entered_password_against_the_hash(hash){
        const password = this.user.pass;
        const password_check = await Security.check_that_it_is_the_same_password(password, hash);
        console.log('Password check: ', password_check);
        this.authentication = { password_check };
    }
}