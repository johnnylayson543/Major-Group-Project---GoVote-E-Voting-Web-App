'use client';
import * as React from 'react';

import Box from '@mui/material/Box';
import Header from '../../components/header/header';
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

    const [finished_elections, setFinishedElections] = useState(null);
    const router = useRouter();

    useEffect(() => {
        fetch(`http://localhost:3000/api/database/controllers/User/Election/retrieve_the_finished_elections`)
            .then((res) => res.json())
            .then((data) => {
                setFinishedElections(data.result);

                console.log("Election data")
                console.log(data.result);
            })

    }, []);

    if (!finished_elections) return <p>No elections available. </p>;

    console.log(finished_elections);

    let dataElement1 = (finished_elections.map(election =>
        <tr key={election._id.toString()}><td>{election._id}</td><td>{election.ballotID}</td><td><button onClick={() => goSeeTheTally(election._id)}>See the tally</button></td></tr>
    ));


    let element = <Box>
        <h1>Finished Elections</h1>
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