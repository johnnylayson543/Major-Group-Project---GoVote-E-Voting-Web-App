'use client';
import * as React from 'react';

import Box from '@mui/material/Box';
import Header from '../../components/header/header';
import Chart from 'chart.js/auto'; // Add this line

import Script from 'next/script'
import { useState, useEffect } from 'react'
import { Toolbar } from '@mui/material';
import { useRouter } from 'next/navigation';


export default function Page() {

    const [finished_elections, setFinishedElections] = useState(null);
    const [tally_for_election, setTallyForElection] = useState(null);
    const router = useRouter();

    useEffect(() => {
        fetch(`http://localhost:3000/api/database/controllers/Teller/Election/retrieve_the_finished_elections`)
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
        <tr key={election._id.toString()}><td>{election._id}</td><td>{election.ballotID}</td><td><button onClick={() => goTallyTheVotes(election._id)}>Tally the Votes</button></td></tr>
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
        router.push('/Teller/Profile/');
    };

    const goTallyTheVotes = async (election_id) => {

        fetch(`http://localhost:3000/api/database/controllers/Teller/Election/Vote/retrieve_the_tally_for_the_election?electionID=${election_id}`)
            .then((res) => res.json())
            .then((data) => {
                setTallyForElection(data.result);

                console.log("Tally data")
                console.log(data.result);
            })
          
    };
    if(tally_for_election)  {
        console.log("Tally for the election: ");
        console.log(tally_for_election);
        router.push('/Teller/Election/Vote' );
    }

    return (

        <Box component="main" sx={{ p: 3 }} style={{ height: 400, width: '100%' }}>
            <Header></Header>
            <Toolbar></Toolbar>
            {element}
        </Box>


    );
}