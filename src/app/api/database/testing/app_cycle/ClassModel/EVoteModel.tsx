import { randomInt } from "crypto";

class Application {
  owner: EVote;
  elections: Election[];
  tellers: User[];

  constructor(owner : EVote) {
    this.owner = owner;
    this.elections = [];
  }

  addElection(ballot : Ballot, session : Session) {
    const authorised = session.user.isAdmin;
    const validBallot = ballot.candidates.length > 1;

    if (validBallot && authorised) {
      const election = new Election(ballot);
      election.ballot = ballot;
      this.elections.push(election);
      return election;
    }
    return null;
  }

  addTeller(teller : User) {
    if (teller instanceof User) {
      this.tellers.push(teller);
    }
  }
}

class EVote {
  system: System;
  application: Application;
  sessions: Session[];
  constructor() {
    this.system = new System();
    this.application = new Application(this);
    this.sessions = [];
  }

  register(person : Person, password : String) {
      const user = this.system.addUser(person, password);
      return user;
  }

  login(user : User, password : String) {
    if (user.pass === password) {
      const session = new Session(user);
      this.sessions.push(session);
      return session;
    }
    return null;
  }
}

class Session {
  user: User;
  admin: any;
  constructor(user : User) {
    this.user = user;
  }
}

class Person {
  ppsn: any;
  name: any;
  address: any;
  email: any;
  phone: any;
  date_of_birth: any;
  constructor(ppsn, name, address, email, phone, dob) {
    this.ppsn = ppsn;
    this.name = name;
    this.address = address;
    this.email = email;
    this.phone = phone;
    this.date_of_birth = dob;
  }
}

class System {
  users: any[];
  constructor() {
    this.users = [];
  }

  addUser(person, password) {
    const exists = this.users.some(user => user.details.ppsn === person.ppsn);
    if (!exists) {
      const user = new User(person, password);
      this.users.push(user);
      return user;
    }
    return null;
  }

  addAdmin(user) {
    if (user instanceof User && !user.isAdmin) {
      user.setAdmin(true);
      return user;
    }
    return null;
  }
}

class User {
  pass: String;
  isAdmin : Boolean;
  
  details: any;
  constructor(details : Person, password : String) {
    this.details = details;
    this.pass = password;
    this.isAdmin = false;
  }

  setAdmin(value : Boolean) {
    this.isAdmin = value;
  }
}

class Admin extends User {

  

}

class Teller extends User {
  
}

class Candidate extends User {

}


class Ballot {
  candidates: any;
  title: any;
  closing_datetime: any;
  constructor(title, closingDateTime) {
    this.title = title;
    this.closing_datetime = closingDateTime;
    this.candidates = [];
  }

  addCandidate(candidate) {
    if (candidate instanceof User) {
      this.candidates.push(candidate);
    }
  }
}

class Election {
    ballot: Ballot;
    voters: any[];
    votes: {};
    isElectionOpen: boolean;
    constructor(ballot) {
      this.ballot = ballot;  // Ballot with candidates
      this.voters = [];
      this.votes = {};
      this.isElectionOpen = false;
    }
  
    openVoting() {
      this.isElectionOpen = true;
      console.log("Voting has started. Ballot is now open.");
    }
  
    closeVoting() {
      this.isElectionOpen = false;
      console.log("Voting has ended. Ballot is now closed.");
    }
  
    addVoter(person) {
      if (!this.isElectionOpen) {
        const isNotVoter = this.voters.every(voter => voter.details.ppsn !== person.ppsn);
        if (isNotVoter) {
          const voter = new Voter(person);
          this.voters.push(voter);
        }
      } else {
        console.log("Cannot add voters after voting has started.");
      }
    }


  
    castVote(voter, preferences : Candidate) {
      // `preferences` should be an array of candidates in order of preference
      if (this.isElectionOpen && this.voters.some(v => v.details.ppsn === voter.details.ppsn)) {
        this.votes[voter.details.ppsn] = preferences;
        console.log(`${voter.details.name} has cast their vote.`);
        return true;
      } else {
        console.log("Voting failed. Check if voting is open and voter is registered.");
        return false;
      }
    }
  
    countVotes() {
      // Simplified preferential vote counting (first-past-the-post in this example)
      let results = {};
      this.ballot.candidates.forEach(candidate => {
        results[candidate.details.name] = 0;  // Initialize result for each candidate
      });
  
      Object.values(this.votes).forEach(preferences => {
        if (preferences.length > 0) {
          const firstChoice = preferences[0];
          results[firstChoice.details.name]++;
        }
      });
  
      return results;
    }
  
    run_cycle() {
      console.log("Election cycle has started.");
      
      this.openVoting();
      setTimeout(() => {
        this.closeVoting();
  
        const voteResults = this.countVotes();
        console.log("Election Results:", voteResults);
  
        console.log("Election cycle has completed.");
      }, 10000);  // Represents the voting period (e.g., 10 seconds here for simulation)
    }
  }
  
  class Voter {
    details: any;
    constructor(details) {
      this.details = details;
    }
  }

  function run_cycle() {
    const evote1 = new EVote();
    const person_admin = new Person();
    person_admin.ppsn = 1;
    const userAdmin = evote1.system.addUser(person_admin, "xxx");
    const admin1 = evote1.system.addAdmin(userAdmin);
    const session1 = evote1.login(admin1, "xxx");
    session1.admin.setPPSN_range(1, 20);
    const ballot1 = new Ballot("Today1", "1/1/1");
    const potential_candidates = evote1.system.users
      .filter((x) => x instanceof User)
      .filter((x) => x.details.ppsn > 0);
    for (let i = 1; i < 6; i++) {
      ballot1.addCandidate(potential_candidates[i]);
    }
    const election1 = evote1.application.addElection(ballot1, session1);

    const potential_voters = evote1.system.users.filter(
      (x) => x instanceof User
    );
    session1.admin.setPPSN_range(100, 200);
    for (let i = 100; i < 200; i++) {
      election1.addVoter(potential_voters[i]);
    }
    for (const x of election1.voters) {
      const count = election1.ballot.candidates.length;
      const randomN = randomInt(count);
      const vote1 = new Vote({ One: 1 }, 1);
      x.castVote(election1.ballot.candidates[randomN], vote1);
    }

    const results = election1.ballot.candidates;
  }