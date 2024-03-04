
export class person_datails {

    name;
    address;
    phone;
    email;
    date_of_birth;

    constructor(x){
        this.name = x.name;
        this.address = x.address;
        this.phone = x.phone;
        this.email = x.email;
        this.date_of_birth = x.date_of_birth;
    }

    static get builder(){
        class PersonDetailsBuilder {
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
            setAddress(email){
                this.email = email;
                return this;
            }
            setDateOfBirth(date_of_birth){
                this.date_of_birth = date_of_birth;
                return this;
            }
            build(){
                return new person_datails(this);
            }

        }
    }

    describe() {
        const { name, address, phone, email, date_of_birth} = this;
        return { name, address, phone, email, date_of_birth};
    }
}