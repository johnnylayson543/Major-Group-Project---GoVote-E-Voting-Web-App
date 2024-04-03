'use client';
import * as React from 'react';

import Box from '@mui/material/Box';
import Header from '../../../components/header/header';
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
    const [election_tallies, setElectionTallies] = useState(null);

    const router = useRouter();

    useEffect(() => {
        fetch(`http://localhost:3000/api/database/controllers/Teller/Election/retrieve_the_finished_elections`)
            .then((res) => res.json())
            .then((data) => {
                setFinishedElections(data.result);

                console.log("Finished Election data")
                console.log(data.result);
            })

        fetch(`http://localhost:3000/api/database/controllers/Teller/Election/Tally/retrieve_the_tallies`)
            .then((res) => res.json())
            .then((data) => {
                setElectionTallies(data.result);

                console.log("Election Tallies data")
                console.log(data.result);
            })

    }, []);

    if (!finished_elections || ((election_tallies === null || election_tallies === undefined) && !Array.isArray(election_tallies))) return <p>No elections available. </p>;

    let dataElement1 = (finished_elections.map(election => {
        if(election_tallies instanceof Array){
            const election_tallies_length = election_tallies.length;
            const tally_election_ids = (election_tallies_length >0) ? election_tallies.map(x => x.electionID) : [];
            const isTallied = (tally_election_ids.length > 0) ? tally_election_ids.includes(election._id.toString()) : false;
            
            const seeTallyButton = (isTallied)?
                 <td><button onClick={() => goSeeTheTally(election._id, election.ballotID)}>See the tally</button></td>:
                 <td>No tally yet</td>;
            const maybe_tallied_election = <tr key={election._id.toString()}><td>{election._id}</td><td>{election.ballotID}</td>{seeTallyButton}</tr>;
            return maybe_tallied_election;
        }
        return null
    }
    ));


    let element = <Box>
        <h1>Tallied Elections</h1>
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
        <p>
            <button onClick={() => goBackToFinishedElections()}>Back to Finished Elections</button>
        </p>
    </Box>


    const goBackToProfile = () => {
        router.push('/Teller/Profile/');
    };
    const goBackToFinishedElections = () => {
        router.push('/Teller/Election/');
    };
    const goSeeTheTally = (election_id, ballot_id) => {
        router.push(`/Teller/Election/Vote/SeeTheTally?electionID=${election_id}&ballotID=${ballot_id}`);
    }

    return (

        <Box component="main" sx={{ p: 3 }} style={{ height: 400, width: '100%' }}>
            <Header></Header>
            <Toolbar></Toolbar>
            {element}
        </Box>


    );
}