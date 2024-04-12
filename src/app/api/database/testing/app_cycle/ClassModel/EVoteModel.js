



class Application {

    elections = []
    tellers = [];
    

    addElection(x) {
        if (x instanceof Ballot && x.candidates.length > 1) {
            const election = new Election();
            election.ballot = x;
            this.elections.push(election);
        }
    }

    addTeller(x){
        if(x instanceof User){
            this.tellers.push(x);
        }
    }

}

class EVote {

    system = new System();
    application = new Application();

    register(x, y){
        if(x instanceof Person && typeof y === 'string' ){
            const check = this.system.users.find((y) => y instanceof User && y.details.ppsn == x.ppsn );
            if( check != undefined && check instanceof User ){
                check.pass = y;
                check.setDetails(x);
            }

        }
    }


}

const evote = new EVote();

class Person {

    ppsn;
    name;
    address;
    email;
    phone;
    date_of_birth;

}


class System {

    users = []
    admins = []
       
    addUser(x, y) {
        if (x instanceof Person && typeof y === 'string') {
            const user = new User();
            user.pass = y;
            user.details = x;
            this.users.push(user);
            return user;
        }
    }

    addAdmin(x){
        if(x instanceof User && this.users.includes(x)){
            const admin = new Admin();
            admin.super = x;
            this.admins.push(x);
            return admin;
        }
    }

}



class User {

    pass;
    roles = {};
    details;

    setDetails(x) {
        this.details = x;
    }

    setRoles(xs) {

        for (x of xs) {

            this.roles.admin = x instanceof Admin;
            this.roles.candidate = x instanceof Candidate;
            this.roles.teller = x instanceof Teller;
            this.roles.voter = x instanceof Voter;
            ;
        }

    }

}


class Admin extends User {


    setPPSN_range(min, max) {
        for (i = min; i < max; i++) {
            const person = new Person()
            person.ppsn = i;
            const user = new User();
            user.setDetails(person);
            evote.system.users.push(user);
        }
    }
}

class Teller extends User {
}



class Vote {

    type = {}
    value = 0.0;

    setVote(x, y){
        this.type = x;
        this.value = y;    
    }


}


class Candidate {

    vote = [];

    addVote(x){
        if(x instanceof Vote){
            this.vote.push(x);
        }
    }
    
}

class Voter {

    person = {}
    votes = [];

    castVote(x, y){

        if(x instanceof Candidate){
            x.addVote(y)
        }

    }

}

class Ballot {

    candidates = []

    addCandidate(x) {
        if (x instanceof Person) {
            const candidate = new Candidate();
            this.candidates.push(candidate);
        }
    }
}

class Election {

    ballot = {};
    voters = [];

    addBallot(x){
        if(x instanceof Ballot){
            this.ballot = x;
        }
    }

    addVoter(x){
        if(x instanceof Person && this.voters.find((x) => x.person == x) == undefined){
            const voter = new Voter();
            voter.person = x;
            this.voters.push(voter);
        }
    }

}


function run_cycle(){

    const evote1 = evote;
    const person_admin = new Person();
    person_admin.ppsn = 1;
    evote1.system.addUser(person_admin, "xxx");
    evote1.system.addAdmin()


}