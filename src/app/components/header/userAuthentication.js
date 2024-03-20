'use strict';
import React from 'react';
import { createContext, useState, useEffect } from "react";
export const UserContext = createContext(null);

export function UserAuthentication({ children }) {

    const [user, setUser] = useState(null);
    const [voter, setVoter] = useState(null);
    const [admin, setAdmin] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const getUserInfo = async () => {
            const res = await fetch(`http://localhost:3000/api/database/controllers/User/is_signed_into_account`);
            const data = await res.json();
            const user = data.result;
            const person_ppsn = user.ppsn;

            const isVoter = (user.roles).includes('voter');
            let voter;
            if(isVoter){
                const res1 = await fetch(`http://localhost:3000/api/database/controllers/Voter/retrieve_the_voter?person_ppsn=${person_ppsn}`);
                const data1 = await res1.json();
                voter = data1.result;
            }

            const isAdmin = (user.roles).includes('admin');
            let admin;
            if(isVoter){
                const res2 = await fetch(`http://localhost:3000/api/database/controllers/Admin/retrieve_the_admin?person_ppsn=${person_ppsn}`);
                const data2 = await res2.json();
                admin = data2.result;
            }

            if (isMounted) {
                setUser(user);
                if(isVoter && voter){
                    setVoter(voter);
                    console.log("voter:");
                    console.log(voter);
                }

                if(isAdmin && admin){
                    setAdmin(admin);
                    console.log("admin:");
                    console.log(admin);
                }

                console.log("user:");
                console.log(user);
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
        admin,
    };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
}


