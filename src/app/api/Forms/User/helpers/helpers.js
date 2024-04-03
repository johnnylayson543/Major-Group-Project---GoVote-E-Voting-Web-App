import bcrypt from "bcrypt";
import { resolve } from "styled-jsx/css";

export class person_datails {

    name;
    address;
    phone;
    email;
    date_of_birth;

    constructor(builder){
        this.name = builder.name;
        this.address = builder.address;
        this.phone = builder.phone;
        this.email = builder.email;
        this.date_of_birth = builder.date_of_birth;
    }

    describe() {
        const { name, address, phone, email, date_of_birth} = this;
        return {name: name, address: address, phone: phone, email: email, date_of_birth: date_of_birth};
    }
}

export class person_datails_builder {

    name;
    address;
    email;
    phone;
    date_of_birth;

    constructor(){

    }

    setName(name){
        this.name = name;
        return this;
    }
    setAddress(address){
        this.address = address;
        return this;
    }
    setPhone(phone){
        this.phone = phone;
        return this;
    }
    setEmail(email){
        this.email = email;
        return this;
    }
    setDateOfBirth(date_of_birth){
        this.date_of_birth = date_of_birth;
        return this;
    }
    build() {
        return new person_datails(this);
    }

}


export class Security {

    static async encrypt(password, saltRounds){
        try {
            const hash = await bcrypt.hash(password, saltRounds);
            //while (hash instanceof Promise);
            return hash;
        } catch (error) {
            throw new Error(`Error hashing password: ${error.message}`);    
        }

    }

    static async check_that_it_is_the_same_password(password, hash){
        try {
            const isSamePassword = await bcrypt.compare(password, hash);
            return isSamePassword;
        } catch (error) {
            throw new Error(`Error hashing password: ${error.message}`);  
        }
        
    }
}