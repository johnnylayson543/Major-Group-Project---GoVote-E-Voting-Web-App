

export class user_type {

    ppsn :String
    pass :String
    roles :[String]
    token :String

    constructor(ppsn?:String, pass?:String, roles?:[String], token?:String){

        this.ppsn = ppsn;
        this.pass = pass;
        this.roles = roles;
        this.token = token;

    }
}