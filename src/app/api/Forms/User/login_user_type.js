
class login_user_type {
    user = {};

    constructor(x){
        const ppsn = x.get('ppsn');
        const pass = x.get('pass');

        this.user = {ppsn: ppsn, pass: pass};

        console.log("login user { ppsn:" + this.user.ppsn + ", pass: " + this.user.pass ) + " } ";
    }
}