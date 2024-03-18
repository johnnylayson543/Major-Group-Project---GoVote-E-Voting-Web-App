'use client';

import { useEffect } from "react";
import PropTypes from 'prop-types';
import React, { useState } from 'react';


export default function UserAuthentication({ user }) {

    useEffect(() => {

        fetch(`http://localhost:3000/api/database/controllers/User/is_signed_into_account`).then((res) => res.json())
            .then((data) => {
                user = data.result;
                console.log("User data")
                console.log(data.result);

                console.log("user:");
                console.log(user);

            })
    }, []);


}

export function getUser(){

    const [user, setUser] = useState(null);

    useEffect(() => {

        fetch(`http://localhost:3000/api/database/controllers/User/is_signed_into_account`).then((res) => res.json())
            .then((data) => {
                setUser(data.result);
                console.log("User data")
                console.log(data.result);
                return user;
            })
    }, []);


    return null;    
}


UserAuthentication.user = {
    user: null,
}