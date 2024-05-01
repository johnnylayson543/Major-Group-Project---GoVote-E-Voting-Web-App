import { IPerson } from "../../database/models/Person"


export class person_type {

    ppsn : String
    name : String
    address : String
    phone : String
    email : String
    date_of_birth : Date

    constructor(ppsn:String, name?:String, address?:String, phone?:String, email?:String, date_of_birth?:Date){
        this.ppsn = ppsn;
        this.name = name;
        this.address = address;
        this.phone = phone;
        this.email = email;
        this.date_of_birth = date_of_birth;
    }
}