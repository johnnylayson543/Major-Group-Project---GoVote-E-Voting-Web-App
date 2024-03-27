'use client'

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { useRouter } from 'next/navigation';
import { UserAuthentication, UserContext } from '@/app/components/header/userAuthentication';






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

    if (!election || !ballot || !candidates_for_the_ballot) return <p>No elections available. </p>;
    else {
        console.log("userInfo: ");
        console.log(user);
        UserAuthentication.user
    }


    let dataElement1 =
        <tr key={ballot._id.toString()}><td>{ballot._id}</td><td>{ballot.closing_datetime}</td><td>{ballot.title}</td></tr>

        ;

    let dataElement2 = (candidates_for_the_ballot.map(ballot_candidate =>
        <tr key={ballot_candidate._id.toString()}><td>{ballot_candidate._id}</td><td>{ballot_candidate.ballotID}</td><td>{ballot_candidate.person_ppsn}</td></tr>
    ));

    let dataElement3 =
        <tr key={election._id}><td>{election._id}</td><td>{election.ballotID}</td></tr>

        ;

    let element = <Box>
        <h1>The Election Details</h1>
        <h2>Ballot</h2>
        <table>
            <thead><tr>
                <th>Ballot ID</th>
                <th>Closing Date Time</th>
                <th>Title</th>
            </tr></thead>
            <tbody>
                {dataElement1}
            </tbody></table>
        <h2>Ballot Candidates</h2>
        <table>
            <thead><tr>
                <th>Candidate ID</th>
                <th>Ballot ID</th>
                <th>PPSN</th>
            </tr></thead>
            <tbody>
                {dataElement2}
            </tbody></table>
        <h2>Election Running with this ballot</h2>
        <table>
            <thead><tr>
                <th>Election ID</th>
                <th>Ballot ID</th>
            </tr></thead>
            <tbody>
                {dataElement3}
            </tbody></table>
        <button onClick={() => goConfirmSignupAsVoterForTheElection(user.ppsn, election._id)}>Confirm the voter sign up for the election</button>
        <p>
            <button onClick={() => goBackToProfile()}>Back to Profile</button>
            <button onClick={() => goBackToElections()}>Back to Elections</button>
        </p>
    </Box>


    const goBackToElections = () => {
        router.push('/Voter/Election/');
    };
    const goBackToProfile = () => {
        router.push('/Voter/Profile/');
    };


    return (



        <Box component="main" sx={{ p: 3 }} style={{ height: 400, width: '100%' }}>
            <CssBaseline />
            <Typography component="h1" variant="h5" fontWeight={800} color={"black"}>
                Register For Election

            </Typography>

            {element}
        </Box>

    );
}