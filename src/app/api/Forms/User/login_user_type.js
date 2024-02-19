
class login_user_type {
    user = {};

    constructor(x){
        this.ppsn = x.get('ppsn');
        this.pass = x.get('pass');

        console.log("login { ppsn:" + this.ppsn + ", pass: " + this.pass ) + " } ";
    }
}