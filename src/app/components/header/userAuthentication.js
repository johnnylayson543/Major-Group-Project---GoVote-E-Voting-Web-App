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
    const [user_information, setUserInformation] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const getUserInfo = async () => {
            const res = await fetch(`http://localhost:3000/api/database/controllers/System/get_user_information`, {
                method: 'GET', // or 'POST', etc.
                credentials: 'include', // This is important for cookies
                headers: {
                    'Content-Type': 'application/json'
                },

            });
            const data = await res.json();
            console.log(data.data);
            if (data.result != null) {
                const userInfo = data.result;
                setUserInformation(data.result);
                console.log(userInfo);

                if (isMounted) {

                    if (userInfo.user) {
                        setUser(userInfo.user);
                        if (userInfo.voter) {
                            setVoter(userInfo.voter);
                            if (userInfo.votes) {
                                setVotes(userInfo.votes);
                            }
                        }

                        if (userInfo.admin) setAdmin(userInfo.admin);

                        if (userInfo.teller) setTeller(userInfo.teller);
                        
                        if (userInfo.candidate) setCandidate(userInfo.candidate);
                        
                        setPerson(userInfo.person);
                    } else {
                        console.log("Not signed in")
                    }
                }
            } else {
                console.log("Not signed in");
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
        user_information
    };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
}


