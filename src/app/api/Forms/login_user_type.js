
class login_user_type {
    user = {};

    constructor(x){
        this.ppsn = searchParams.get('ppsn');
        this.pass = searchParams.get('pass');

        console.log("login { ppsn:" + this.ppsn + ", pass: " + this.pass ) + " } ";
    }
}