'use client';

import { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext(null);

export default function UserAuthentication({ children }) {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const getUserInfo = async () => {
            const res = await fetch(`http://localhost:3000/api/database/controllers/User/is_signed_into_account`);
            const data = await res.json();
            const user = data.result;
            setUser(user);

            console.log("user:");
            console.log(user);
            return user;
        }

        getUserInfo();

    }, []);

    userInfo = useContext(UserContext);

    return (
        <UserContext.Provider value={{ userInfo }}>
            {children}
        </UserContext.Provider>
    );
}


