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
            const res = await fetch(`http://localhost:3000/api/database/controllers/System/get_user_information`);
            const data = await res.json();
            const user_information = data.result;
            console.log("user_information: ");
            console.log(user_information);


            if (isMounted) {
                if (user_information.user) {
                    setUser(user_information.user);
                    if (user_information.voter) {
                        setVoter(user_information.voter);
                        console.log("voter:");
                        console.log(user_information.voter);
                        if (user_information.votes) {
                            setVotes(user_information.votes);
                            console.log("votes:");
                            console.log(user_information.votes);
                        }
                    }

                    if (user_information.admin) {
                        setAdmin(user_information.admin);
                        console.log("admin:");
                        console.log(user_information.admin);
                    }

                    if (user_information.teller) {
                        setTeller(user_information.teller);
                        console.log("teller:");
                        console.log(user_information.teller);
                    }

                    if (user_information.candidate) {
                        setCandidate(user_information.candidate);
                        console.log("candidate:");
                        console.log(user_information.candidate);
                    }

                    setPerson(user_information.person);
                    console.log("person:");
                    console.log(user_information.person);

                    console.log("user:");
                    console.log(user_information.user);
                } else {
                    console.log("Not signed in")
                }
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


