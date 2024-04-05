'use client';
import * as React from 'react';

import Box from '@mui/material/Box';
import Header from '../../components/header/header';
import Chart from 'chart.js/auto'; // Add this line

import Script from 'next/script'
import { useState, useEffect } from 'react'
import { Toolbar } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useContext } from 'react'
import { UserContext } from '@/app/components/header/userAuthentication';


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

    const { user, voter, admin, teller } = useContext(UserContext);
    const [elections, setElections] = useState(null);
    const router = useRouter();

    useEffect(() => {
        fetch(`http://localhost:3000/api/database/controllers/Admin/Election/retrieve_elections`)
            .then((res) => res.json())
            .then((data) => {
                setElections(data.result);

                console.log("Election data")
                console.log(data.result);
            })

    }, []);

    if (!elections) return <p>No elections available. </p>;

    console.log(elections);

    let dataElement1 = (elections.map(election =>
        <tr key={election._id.toString()}><td>{election._id}</td><td>{election.ballotID}</td><td><button onClick={() => goSeeBallot(election.ballotID)}>See ballot</button></td><td><button onClick={() => goSignUpForTheElection(election.ballotID)}>Sign Up</button></td></tr>
    ));

    let voter_profile_button;
    if (voter) {
        voter_profile_button = <Box><p>
            <button onClick={() => goBackToVoterProfile()}>Back to Voter Profile</button>
        </p></Box>;
    }


    let element = <Box>
        <h1>Running Elections</h1>
        <table>
            <thead><tr>
                <th>Election ID</th>
                <th>Ballot ID</th>
                <th>Actions</th>
            </tr></thead>
            <tbody>
                {dataElement1}
            </tbody></table>


        {voter_profile_button}
        <p>
            <button onClick={() => goBackToUserProfile()}>Back to User Profile</button>
        </p>
    </Box>

    const goBackToUserProfile = () => {
        router.push('/Voter/Profile/');
    };

    const goBackToVoterProfile = () => {
        router.push('/Voter/Profile/');
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

        <Box component="main" sx={{ p: 3 }} style={{ height: 400, width: '100%' }}>
            <Header></Header>
            <Toolbar></Toolbar>
            {element}
        </Box>


    );
}