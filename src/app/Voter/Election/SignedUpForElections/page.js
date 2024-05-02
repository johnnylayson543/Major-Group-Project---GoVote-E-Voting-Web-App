'use client';
import * as React from 'react';

import Box from '@mui/material/Box';
import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/navigation';
import { UserContext } from '@/app/components/header/userAuthentication';
import { Button, Card, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { objectIdToOKLCH } from '@/app/components/helpers';


export default function Page() {

    const { user, voter, admin } = useContext(UserContext);
    const [voter_signed_elections, setVoterSignedElections] = useState(null);
    const router = useRouter();

    useEffect(() => {
        if (user) {
            const person_ppsn = user.ppsn;
            fetch(`http://localhost:3000/api/database/controllers/Voter/Election/retrieve_elections_the_voter_signed_up_for?person_ppsn=${person_ppsn}`)
                .then((res) => res.json())
                .then((data) => {
                    setVoterSignedElections(data.result);

                    console.log("Voter Signed Election data")
                    console.log(data.result);
                })
        }

    }, [user]);

    if (!voter_signed_elections || !voter) return <Box><p>No elections signed by the voter found. </p></Box>;
    else {
        console.log("user on page:");
        console.log(user);
        console.log("voter on page:");
        console.log(voter);
        console.log("admin on page:");
        console.log(admin);
    }

    console.log(voter_signed_elections);

    let dataElement1 = (voter_signed_elections.map(election =>
        <TableRow key={election._id.toString()} style={{backgroundColor: objectIdToOKLCH(election._id)}}><TableCell>{election._id}</TableCell><TableCell>{election.ballotID}</TableCell>
            <TableCell><Button onClick={() => goSeeBallot(election.ballotID)}>See ballot</Button></TableCell>
            <TableCell><Button onClick={() => goCastTheVote(election.ballotID, voter._id)}>Cast the Vote</Button></TableCell>
        </TableRow>
    ));


    let element = <Box>
        <Card>
            <h1>Voter Signed Up Elections</h1>
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
        router.push('/Voter/Profile/');
    };


    const goSeeBallot = (ballot_id) => {
        router.push('/Voter/Election/SeeBallot?ballotID={' + ballot_id + '}');
    };

    const goCastTheVote = (ballot_id, voter_id) => {
        router.push('/Voter/Vote/CastYourVote?ballotID={' + ballot_id + '}&voterID={' + voter_id + '}');
    };


    return (
        <>
            {element}
        </>
    );
}