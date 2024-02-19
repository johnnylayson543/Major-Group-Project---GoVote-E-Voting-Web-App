
class register_user_type {
    person_datails = {};
    user = {};

    constructor(x){
        const email = x.get('person_email');
        const date_of_birth = x.get('person_date_of_birth')
        const ppsn = x.get('person_ppsn')
        const pass = x.get('person_pass')
        this.person_datails = {email: email, date_of_birth: date_of_birth};
        this.user = {ppsn: ppsn, pass: pass};   
        console.log(email + ", " + dateofbirth + ", " + ppsn + ", " + pass);
    }
}