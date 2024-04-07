'use strict';
import React from 'react';
import { createContext, useState, useEffect } from "react";
export const UserContext = createContext(null);

export function UserAuthentication({ children }) {

    const [user, setUser] = useState(null);
    const [voter, setVoter] = useState(null);
    const [teller, setTeller] = useState(null);
    const [admin, setAdmin] = useState(null);
    const [person, setPerson] = useState(null);
    const [votes, setVotes] = useState(null);
    const [candidate, setCandidate] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const getUserInfo = async () => {
            const res = await fetch(`http://localhost:3000/api/database/controllers/User/is_signed_into_account`);
            const data = await res.json();
            const user = data.result;
            //console.log("user 0");
            //console.log(user);
        
            if(user){
                //console.log("user 1");
                //console.log(user);
                const person_ppsn = user.ppsn;

                const isVoter = (user.roles).includes('voter');
                let voter;
                let votes;
                if (isVoter) {
                    const res1 = await fetch(`http://localhost:3000/api/database/controllers/Voter/retrieve_the_voter?person_ppsn=${person_ppsn}`);
                    const data1 = await res1.json();
                    voter = data1.result;
                    const voter_id = voter._id;

                    const res1_1 = await fetch(`http://localhost:3000/api/database/controllers/Voter/Vote/retrieve_the_votes_for_the_voter?voterID=${voter_id}`);
                    const data1_1 = await res1_1.json();
                    votes = data1_1.result;
                }

                const isCandidate = (user.roles).includes('candidate');
                let candidate;
                if(isCandidate && person_ppsn){
                    const res4 = await fetch(`http://localhost:3000/api/database/controllers/User/Candidate/retrieve_the_candidate_with_this_ppsn?ppsn=${person_ppsn}`);
                    const data4 = await res4.json();
                    candidate = data4.result;
                }

                const isUser = (user.roles).includes('user');
                let person;
                if (isUser && person_ppsn) {
                    const res3 = await fetch(`http://localhost:3000/api/database/controllers/User/Person/retrieve_the_persons_details?ppsn=${person_ppsn}`);
                    const data3 = await res3.json();
                    person = data3.result;
                }

                const isAdmin = (user.roles).includes('admin');
                let admin;
                if (isAdmin) {
                    const res2 = await fetch(`http://localhost:3000/api/database/controllers/Admin/retrieve_the_admin?person_ppsn=${person_ppsn}`);
                    const data2 = await res2.json();
                    admin = data2.result;
                }

                const isTeller = (user.roles).includes('teller');
                let teller;
                if (isTeller) {
                    const res2 = await fetch(`http://localhost:3000/api/database/controllers/Teller/retrieve_the_teller?person_ppsn=${person_ppsn}`);
                    const data2 = await res2.json();
                    teller = data2.result;
                }

                if (isMounted) {
                    if (isUser && user) {
                        setUser(user);
                        if (isVoter && voter) {
                            setVoter(voter);
                            setVotes(votes);
                            console.log("voter:");
                            console.log(voter);
                            console.log("votes:");
                            console.log(votes);
                        }

                        if (isAdmin && admin) {
                            setAdmin(admin);
                            console.log("admin:");
                            console.log(admin);
                        }

                        if (isTeller && teller) {
                            setTeller(teller);
                            console.log("teller:");
                            console.log(teller);
                        }

                        if (isCandidate && candidate) {
                            setCandidate(candidate);
                            console.log("candidate:");
                            console.log(candidate);
                        }

                        setPerson(person);
                        console.log("person:");
                        console.log(person);

                        console.log("user:");
                        console.log(user);
                    }
                }
            } else {
                console.log("Not signed in")
            }
        }

        getUserInfo();


        return () => {
            isMounted = false;
        };
    }, []);

    const contextValue = {
        user,
        voter,
        teller,
        admin,
        person,
        votes,
        candidate,
    };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
}


