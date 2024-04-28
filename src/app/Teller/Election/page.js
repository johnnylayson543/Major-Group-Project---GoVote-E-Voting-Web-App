'use client';
import * as React from 'react';

import Box from '@mui/material/Box';
import Header from '../../components/header/header';

import { useState, useEffect } from 'react'
import { Button, Card, FormLabel, Tab, Table, TableBody, TableCell, TableHead, TableRow, Toolbar } from '@mui/material';
import { useRouter } from 'next/navigation';
import { objectIdToOKLCH } from '@/app/components/helpers';



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
        <TableRow key={election._id.toString()} style={{ backgroundColor: objectIdToOKLCH(election._id)}}><TableCell>{election._id}</TableCell><TableCell>{election.ballotID}</TableCell><TableCell><Button onClick={() => goTallyTheVotes(election._id)}>Tally the Votes</Button></TableCell></TableRow>
    ));


    let element = <Box>
        <Card>
        <h1>Finished Elections</h1>
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
    if (tally_for_election) {
        console.log("Tally for the election: ");
        console.log(tally_for_election);
        router.push('/Teller/Election/Vote');
    }

    return (
        <>
            {element}
        </>
    );
}