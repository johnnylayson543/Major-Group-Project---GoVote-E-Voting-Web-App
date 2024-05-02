'use client';
import * as React from 'react';

import Box from '@mui/material/Box';

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { useContext } from 'react'
import { UserContext } from '@/app/components/header/userAuthentication';
import { Button, Card, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { objectIdToOKLCH } from '@/app/components/helpers';



/*
After the submit handler calls the runDBCallAsync, this does the thing
This function does the actual work
calling the fetch to get things from the database.
*/

export default function Page() {

    const { voter } = useContext(UserContext);
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
        <TableRow key={election._id.toString()} style={{backgroundColor: objectIdToOKLCH(election._id)}}><TableCell>{election._id}</TableCell><TableCell>{election.ballotID}</TableCell><TableCell><Button onClick={() => goSeeBallot(election.ballotID)}>See ballot</Button></TableCell><TableCell><Button onClick={() => goSignUpForTheElection(election.ballotID)}>Sign Up</Button></TableCell></TableRow>
    ));

    let voter_profile_button;
    if (voter) {
        voter_profile_button = <Box><p>
            <Button onClick={() => goBackToVoterProfile()}>Back to Voter Profile</Button>
        </p></Box>;
    }


    let element = <Box>
        <Card>
        <h1>Running Elections</h1>
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

        {voter_profile_button}
        <p>
            <Button onClick={() => goBackToUserProfile()}>Back to User Profile</Button>
        </p>
    </Box>

    const goBackToUserProfile = () => {
        router.push('/Voter/Profile/');
    };

    const goBackToVoterProfile = () => {
        router.push('/Voter/Profile/');
    };

    const goSeeBallot = (ballot_id) => {
        router.push('/Voter/Election/SeeBallot?ballotID={' + ballot_id + '}');
    };

    const goSignUpForTheElection = (ballot_id) => {
        router.push('/Voter/Election/SignUpForTheElection?ballotID={' + ballot_id + '}');
    };

    return (
        <>
            {element}
        </>
    );
}