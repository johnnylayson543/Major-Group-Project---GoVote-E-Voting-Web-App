
export class register_user_type {
    person_datails = {};
    user = {};

    constructor(x){
        // x is a URL object, so get find the parameter name
        const email = x.get('person_email');
        const date_of_birth = x.get('person_date_of_birth')
        const ppsn = x.get('user_ppsn')
        const pass = x.get('user_pass')
        this.person_datails = {name: "", address: "", phone: "", email: email, date_of_birth: date_of_birth};
        this.user = {ppsn: ppsn, pass: pass};   
        console.log(email + ", " + date_of_birth + ", " + ppsn + ", " + pass);
    }
}

// Form types and classes with function are changable 
// The rest is automatic 