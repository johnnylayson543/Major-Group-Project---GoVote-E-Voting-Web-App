const { randomInt } = require("crypto");

class Application {

    owner = EVote;
    elections = [Election]
    tellers = [Teller];
    
    constructor(x){
        this.owner = (x instanceof EVote) ? x : null;
    }

    addElection(x, session1) {

        const authorised = (session1 instanceof session
            && session1.user instanceof Admin
        ) ;

        const validBallot =  (x instanceof Ballot && x.candidates.length > 1);

        if ( validBallot && authorised ) {
            const election = new Election();
            election.ballot = x;
            this.elections.push(election);

            return election;
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
    application = new Application(self);
    sessions = [session]

    register(x, y){
        if(x instanceof Person && typeof y === 'string' ){
            const check = this.system.users.find((y) => y instanceof User && y.details.ppsn == x.ppsn );
            if( check != undefined && check instanceof User ){
                check.pass = y;
                check.setDetails(x);
            }

        }
    }


    login(x, y){
        if(x instanceof User && x.pass == y){
            const session1 = new session(x);
            this.sessions.push(session1);
            return session1;
        }
    }

}


class session {

    constructor(x){
        if(x instanceof User){
            if(x instanceof Admin){
                this.admin = x;
            } else {
                this.user = x;
            }
        }
    }
}

const evote = new EVote();

class Person {

    ppsn = "";
    name = "";
    address = "";
    email = "";
    phone = "";
    date_of_birth = "";

}


class System {

    users = [User]
    admins = [Admin]
       
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

    pass = "";
    roles = {};
    details = {Person};

    constructor(details){
        const isPerson = details instanceof Person;
        if(isPerson) this.details = details;
    }

    setDetails(x) {
        const isPerson = x instanceof Person;
        const possible = this.details != null && this.details.ppsn != undefined;
        const samePerson = this.details.ppsn == x.ppsn;
        if(isPerson && possible && samePerson) this.details = x;
    }

    setRoles(xs) {

        for (const x of xs) {

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

    constructor(x, y){
        if(x instanceof {} && y instanceof Number){
            this.type = x;
            this.value = y;    
        }
    }


}


class Candidate {

    vote = [Vote];

    addVote(x){
        if(x instanceof Vote){
            this.vote.push(x);
        }
    }
    
}

class Voter {

    person = {Person}
    votes = [Vote];

    castVote(x, y){

        if(x instanceof Candidate){
            x.addVote(y)
        }

    }

}

class Ballot {

    candidates = [Candidate]

    constructor(x, y){
        title = x;
        closing_datetime = y;
    }

    addCandidate(x) {
        if (x instanceof User) {
            const candidate = new Candidate();
            this.candidates.push(candidate);
        }
    }
}

class Election {

    ballot = Ballot;
    voters = [Voter];

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
    const userAdmin = evote1.system.addUser(person_admin, "xxx");
    const admin1 = evote1.system.addAdmin(userAdmin);
    const session1 = evote1.login(admin1, 'xxx');
    session1.admin.setPPSN_range(1, 20);
    const ballot1 = new Ballot("Today1", "1/1/1");
    const potential_candidates = evote.system.users.filter(x => x instanceof User).filter(x => x.details.ppsn > 0);
    for(i=1; i<6; i++){
        ballot1.addCandidate(potential_candidates[i]);
    }
    const election1 = evote.application.addElection(ballot1, session1);

    const potential_voters = evote.system.users.filter(x => x instanceof User);
    session1.admin.setPPSN_range(100, 200);
    for(i=100;i<200;i++){
        election1.addVoter(potential_voters[i]);
    };
    for(const x of election1.voters){
        const count = election1.ballot.prototype.candidates.length;
        const randomN = randomInt(count)
        const vote1 = new Vote({'One' : 1}, 1);
        x.prototype.castVote(randomInt, vote1);
    }

    const result = election1.ballot.prototype.candidates;

}