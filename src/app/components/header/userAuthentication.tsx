'use strict';
import { ITeller } from '@/app/api/database/models/Teller';
import { IUser } from '@/app/api/database/models/User';
import { IVoter } from '@/app/api/database/models/Voter';
import { IAdmin } from '@/app/api/database/models/Admin';
import React from 'react';
import { createContext, useState, useEffect } from "react";
import { IPerson } from '@/app/api/database/models/Person';
import { IVote } from '@/app/api/database/models/Vote';
import { ICandidate } from '@/app/api/database/models/Candidate';
export const UserContext = createContext<currentUserContextType | null>(null);

interface currentUserContextType {
    user : IUser & Document | null
    voter : IVoter & Document | null
    teller: ITeller & Document | null
    admin: IAdmin & Document | null
    person: IPerson & Document | null
    votes: Array<IVote & Document>
    candidate: ICandidate & Document | null
    user_information: Object | null
}


export function UserAuthentication({ children }):React.ReactElement {

    const [user, setUser] = useState(null);
    const [voter, setVoter] = useState(null);
    const [teller, setTeller] = useState(null);
    const [admin, setAdmin] = useState(null);
    const [person, setPerson] = useState(null);
    const [votes, setVotes] = useState([]);
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


