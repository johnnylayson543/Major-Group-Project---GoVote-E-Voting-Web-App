'use client';
import * as React from 'react';

import Header from '../../../components/header/header';
import Box from '@mui/material/Box';
import Chart from 'chart.js/auto'; // Add this line

import Script from 'next/script'
import { useState, useEffect } from 'react'
import { Toolbar } from '@mui/material';
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

    const [voter_signed_elections, setVoterSignedElections] = useState(null);
    const router = useRouter();

    useEffect(() => {
        fetch(`http://localhost:3000/api/database/controllers/Voter/Election/retrieve_elections_the_voter_signed_up_for?voterID=${voter_id}`)
            .then((res) => res.json())
            .then((data) => {
                setVoterSignedElections(data.result);

                console.log("Voter Signed Election data")
                console.log(data.result);
            })

    }, []);

    if (!voter_signed_elections) return <p>No elections signed by the voter found. </p>;

    console.log(voter_signed_elections);

    let dataElement1 = (elections.map(election =>
        <tr key={election._id.toString()}><td>{election._id}</td><td>{election.ballotID}</td><td><button onClick={() => goSeeBallot(election.ballotID)}>See ballot</button></td></tr>
    ));


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

        <p>
            <button onClick={() => goBackToProfile()}>Back to Profile</button>
        </p>
    </Box>


    const goBackToProfile = () => {
        router.push('/Voter/Profile/');
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