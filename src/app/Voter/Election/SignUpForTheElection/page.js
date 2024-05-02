'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useEffect, useState, useContext } from "react";
import { useRouter } from 'next/navigation';
import { UserAuthentication, UserContext } from '@/app/components/header/userAuthentication';
import { Button, Card, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { formatDateTime, objectIdToOKLCH } from '../../../components/helpers';




export default function Page() {
    const router = useRouter();

    const { user, voter } = useContext(UserContext);
    const [election, setElection] = useState(null);
    const [ballot, setBallot] = useState(null);
    const [candidates_for_the_ballot, setBallotCandidates] = useState(null);


    const goConfirmSignupAsVoterForTheElection = async (person_id, election_id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/database/controllers/Voter/Election/signup_for_the_election?person_ppsn=${person_id}&electionID=${election_id}`);
            const data = await response.json();

            if (response.ok) {
                const voter_id = data.result._id;
                router.push(`/Voter/Election/SignedUpForElections?voterID=${voter_id}`);
            } else {
                // Handle error case
                console.error('Error signing up for the election:', data.error);
            }
        } catch (error) {
            // Handle network or other errors
            console.error('Error signing up for the election:', error);
        }

    };

    useEffect(() => {
        const { searchParams } = new URL(window.location.href);
        const ballot_id = searchParams.get('ballotID');

        fetch(`http://localhost:3000/api/database/controllers/Admin/Election/retrieve_the_election?ballotID=${ballot_id}`)
            .then((res) => res.json())
            .then((data) => {
                setElection(data.result);

                console.log("Election data")
                console.log(data.result);
            })

        fetch(`http://localhost:3000/api/database/controllers/Admin/Ballot/retrieve_the_ballot?ballotID=${ballot_id}`)
            .then((res) => res.json())
            .then((data) => {
                setBallot(data.result);

                console.log("Ballot data")
                console.log(data.result);
            })


        fetch(`http://localhost:3000/api/database/controllers/Admin/Candidate/retrieve_candidates_for_the_ballot?ballotID=${ballot_id}`)
            .then((res) => res.json())
            .then((data) => {
                setBallotCandidates(data.result);

                console.log("Ballot Candidate data")
                console.log(data.result);
            })


    }, []);

    if (!election || !ballot || !candidates_for_the_ballot || !user) return <p>No elections available. </p>;
    else {
        console.log("userInfo: ");
        console.log(user);
        UserAuthentication.user
    }


    let dataElement1 =
        <TableRow key={ballot._id.toString()} style={{ backgroundColor: objectIdToOKLCH(ballot._id) }}><TableCell>{ballot._id}</TableCell><TableCell>{formatDateTime(ballot.closing_datetime)}</TableCell><TableCell>{ballot.title}</TableCell></TableRow>

        ;

    let dataElement2 = (candidates_for_the_ballot.map(ballot_candidate =>
        <TableRow key={ballot_candidate._id.toString()} style={{ backgroundColor: objectIdToOKLCH(ballot_candidate._id) }}><TableCell>{ballot_candidate._id}</TableCell><TableCell>{ballot_candidate.ballotID}</TableCell><TableCell>{ballot_candidate.person_ppsn}</TableCell></TableRow>
    ));

    let dataElement3 =
        <TableRow key={election._id} style={{ backgroundColor: objectIdToOKLCH(election._id) }}><TableCell>{election._id}</TableCell><TableCell>{election.ballotID}</TableCell></TableRow>

        ;

    let element = <Box>
        <h1>The Election Details</h1>

        <Card>
        <h2>Ballot</h2>
        <Table>
            <TableHead><TableRow>
                <th>Ballot ID</th>
                <th>Closing Date Time</th>
                <th>Title</th>
            </TableRow></TableHead>
            <TableBody>
                {dataElement1}
            </TableBody></Table>
            </Card>
            <Card>
        <h2>Ballot Candidates</h2>
        <Table>
            <TableHead><TableRow>
                <th>Candidate ID</th>
                <th>Ballot ID</th>
                <th>PPSN</th>
            </TableRow></TableHead>
            <TableBody>
                {dataElement2}
            </TableBody></Table>
            </Card>
            <Card>
        <h2>Election Running with this ballot</h2>
        <Table>
            <TableHead><TableRow>
                <th>Election ID</th>
                <th>Ballot ID</th>
            </TableRow></TableHead>
            <TableBody>
                {dataElement3}
            </TableBody></Table>
            </Card>
        <Button onClick={() => goConfirmSignupAsVoterForTheElection(user.ppsn, election._id)}>Confirm the voter sign up for the election</Button>
        <p>
            <Button onClick={() => goBackToProfile()}>Back to Profile</Button>
            <Button onClick={() => goBackToElections()}>Back to Elections</Button>
        </p>
    </Box>


    const goBackToElections = () => {
        router.push('/Voter/Election/');
    };
    const goBackToProfile = () => {
        router.push('/Voter/Profile/');
    };


    return (
        <>
                <Typography component="h1" variant="h5" fontWeight={800} color={"black"}>
                    Register For Election

                </Typography>
                {element}
        </>

    );
}