



class EVote {

    system = new System();
    elections = new Election();

    addUser(x) {
        if (x instanceof User) {
            this.system.users.push(x);
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

    persons = []
    admins = []
    ballots = []
    tellers = []
    candidates = []
    users = []
    voters = []
    votes = []

}



class User {

    pass;
    roles = {};
    details;

    setDetails(x) {
        this.details = x;
    }

    setRoles(xs) {

        for (x in xs) {

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
            evote.system.persons.push(person);
        }
    }
}

class Teller extends User {
}



class Ballot {

    candidates = []

    addCandidate(x) {
        if (x instanceof Person) {
            this.candidates.push(x);
        }
    }
}


class Election {

    running = [];

    addBallotToRunning(x){
        if(x instanceof Ballot){
            this.ballot = x;
        }
    }

}






const 