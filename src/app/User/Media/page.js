'use client';
import * as React from 'react';

import Box from '@mui/material/Box';
import Header from '../../components/header/header';
import Chart from 'chart.js/auto'; // Add this line

import Script from 'next/script'

import { useState, useEffect, useContext } from 'react'
import { UserAuthentication, UserContext } from '@/app/components/header/userAuthenticationn';
import { Container, Toolbar } from '@mui/material';
import { useRouter } from 'next/navigation';


/*
After the submit handler calls the runDBCallAsync, this does the thing
This function does the actual work
calling the fetch to get things from the database.
*/
async function runDBCallAsync(url) {

    const res = await fetch(url);
    const data = await res.json();

    if (data.data == "valid") {
        console.log("election is valid!")



    } else {

        console.log("election is not valid!")
    }
}




export default function Page() {

    const { user, voter } = useContext(UserContext);
    const [media_for_this_user, setMediaForThisUser] = useState(null);
    const router = useRouter();

    useEffect(() => {

        if (user) {
            fetch(`http://localhost:3000/api/database/controllers/User/Media/retrieve_my_media?user_id=${user._id}`)
                .then((res) => res.json())
                .then((data) => {
                    setMediaForThisUser(data.result);

                    console.log("Media for this user data")
                    console.log(data.result);
                })
        }
    }, []);


    const goAddNewMedia = (user_id) => {
        router.push(`/User/Media/AddNewMedia?userID=${user_id}`);
    };


    const add_new_media_button = (user) ? <button onClick={() => goAddNewMedia(user._id)}>Add new media</button> : null;


    if (!media_for_this_user || !user) return <Box component="main" sx={{ p: 3 }} style={{ height: 400, width: '100%' }}>
        <Header></Header>
        <Toolbar></Toolbar>
        <Box><p>No media available. </p></Box>
        {add_new_media_button}
    </Box>;

    console.log(media_for_this_user);

    let dataElement1 = (user) ? (media_for_this_user.map(media =>
        <tr key={media._id.toString()}><td>{media._id}</td><td>{media.storageID}</td><td>{media.fileID}</td><td>{media.access}</td><td>{media.placement}</td></tr>
    )) : null;


    let element = <Box>
        <h1>My Media</h1>
        <table>
            <thead><tr>
                <th>User ID</th>
                <th>File ID</th>
                <th>placement</th>
                <th>access</th>
            </tr></thead>
            <tbody>
                {dataElement1}
            </tbody></table>

        <p>
            {add_new_media_button}
        </p>

        <p>
            <button onClick={() => goBackToProfile()}>Back to Profile</button>
        </p>
    </Box>;





    const goBackToProfile = () => {
        router.push('/User/Profile/');
    };

    const goSeeBallot = (ballotID) => {
        router.push('/Voter/Election/SeeBallot?ballotID={' + ballotID + '}');
    };

    const goSignUpForTheElection = (ballot_id) => {
        router.push('/Voter/Election/SignUpForTheElection?ballotID={' + ballot_id + '}');
    };


    const goCancelElection = (ballotID) => {
        router.push('/Admin/Election/CancelElection/?ballotID={' + ballotID + '}');
    };



    const goAdminProfilePage = (userIDtoken) => {
        router.push('/Admin/?userIDtoken={' + userIDtoken + '}');
    };


    return (
        <>
            {element}
        </>
    );
}