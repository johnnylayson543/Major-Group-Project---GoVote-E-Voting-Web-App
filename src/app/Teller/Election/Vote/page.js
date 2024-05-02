'use client';
import * as React from 'react';

import Box from '@mui/material/Box';
import Header from '../../../components/header/header';

import { useState, useEffect } from 'react'
import { Button, Card, Table, TableBody, TableCell, TableHead, TableRow, Toolbar } from '@mui/material';
import { useRouter } from 'next/navigation';
import { objectIdToOKLCH } from '@/app/components/helpers';


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
        if (election_tallies instanceof Array) {
            const election_tallies_length = election_tallies.length;
            const tally_election_ids = (election_tallies_length > 0) ? election_tallies.map(x => x.electionID) : [];
            const isTallied = (tally_election_ids.length > 0) ? tally_election_ids.includes(election._id.toString()) : false;

            const seeTallyButton = (isTallied) ?
                <TableCell><Button onClick={() => goSeeTheTally(election._id, election.ballotID)}>See the tally</Button></TableCell> :
                <TableCell>No tally yet</TableCell>;
            const maybe_tallied_election = <TableRow key={election._id.toString()} style={{ backgroundColor: objectIdToOKLCH(election._id) }} ><TableCell>{election._id}</TableCell><TableCell>{election.ballotID}</TableCell>{seeTallyButton}</TableRow>;
            return maybe_tallied_election;
        }
        return null
    }
    ));


    let element = <Box>
        <Card>
            <h1>Tallied Elections</h1>
            <Table>
                <TableHead><TableRow>
                    <th>Election ID</th>
                    <th>Ballot ID</th>
                    <th>Actions</th>
                </TableRow></TableHead>
                <TableBody>
                    {dataElement1}
                </TableBody></Table>
        </Card>
        <p>
            <Button onClick={() => goBackToProfile()}>Back to Profile</Button>
        </p>
        <p>
            <Button onClick={() => goBackToFinishedElections()}>Back to Finished Elections</Button>
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
        <>
            {element}
        </>

    );
}