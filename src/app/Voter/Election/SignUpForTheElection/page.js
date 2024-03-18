'use client'

import * as React from 'react';
import Header from '../../../components/header/header';
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
import { useEffect, useState } from "react";
import UserAuthentication from '@/app/components/header/userAuthentication';
import getUser from '@/app/components/header/userAuthentication';
import { useRouter } from 'next/navigation';


export default function Page() {
    const router = useRouter();

    const [election, setElection] = useState(null);
    const [ballot, setBallot] = useState(null);
    const [candidates_for_the_ballot, setBallotCandidates] = useState(null);
    const [user, setUser] = useState(null);
    



    const [pass, setPass] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);
    // const [electionInfo, setElectionInfo] = useState('');

    const handleChange = (event) => {
        setPass(event.target.value);
        setSelectedItem(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        let ppsn = data.get('ppsn');
        console.log("Sent date of ppsn:" + ppsn);

        // Call this function to pass the data created by the FormData
        await runDBCallAsync(`http://localhost:3000/api/general/register?ppsn=${ppsn}`);
    };

    async function runDBCallAsync(url) {
        const res = await fetch(url);
        const data = await res.json();

        // If the data fetched and json returned by the route is "valid"
        if (data.data === "valid") {
            console.log("It worked! Good data response. ");
            return data;
        } else {
            console.log("It did not work! Bad data response. ");
        }

    }

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

            setUser(getUser());
            
    }, []);

    if (!User || !election || !ballot || !candidates_for_the_ballot) return <p>No elections available. </p>;

    

    let dataElement1 =
        <tr key={ballot._id.toString()}><td>{ballot._id}</td><td>{ballot.closing_datetime}</td><td>{ballot.title}</td></tr>

        ;

    let dataElement2 = (candidates_for_the_ballot.map(ballot_candidate =>
        <tr key={ballot_candidate._id.toString()}><td>{ballot_candidate._id}</td><td>{ballot_candidate.ballotID}</td><td>{ballot_candidate.ppsn}</td></tr>
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
        <button onClick={() => goConfirmSignupAsVoterForTheElection((user.ppsn, election._id)}>Confirm the voter sign up for the election</button>
        <p>
            <button onClick={() => goBackToProfile()}>Back to Profile</button>
            <button onClick={() => goBackToElections()}>Back to Elections</button>
        </p>
    </Box>

    const goConfirmSignupAsVoterForTheElection = (person_id, election_id) => {
        runDBCallAsync(`http://localhost:3000/api/database/controllers/Voter/signup_for_the_election?person_ppsn=${person_id}&electionID=${election_id}`).then( (data) => {
            
            const voter_id = data.result._id;
            router.push('/Voter/Election/SignedUpForElections?voterID={' +  voter_id + '}' )

        }
          
        
        );
    }

    const goBackToElections = () => {
        router.push('/Voter/Election/');
    };
    const goBackToProfile = () => {
        router.push('/Voter/Profile/');
    };


    /* Retrieve data from text file
        const fetchElectionInfo = async (year) => {
            try {
                const response = await fetch("/$(year)_election_info.txt");
                const text = await response.text();
                setElectionInfo(text);
            } catch (error) {
                console.error('Error fetching election info: ', error)
            }
        };
        */

    /*
        useEffect(() => {
                if (selectedItem) {
                    fetchElectionInfo(selectedItem);
                }
            }, [selectedItem]);
    
     */

    const electionInf = () => {
        if (selectedItem === '2024') {
            return <Typography>2024 Elections close 3rd March </Typography>
        } else if (selectedItem === '2023') {
            return <Typography>2023 Elections are clsoed as of 3rd March 2023</Typography>
        } else if (selectedItem === '2022') {
            return <Typography>2022 Elections are closed as of 3rd March 2022</Typography>
        } else {
            return null;
        }
    };


    const otherElements = <Box
        sx={{
            marginTop: 12,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}
    > <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="ppsn"
                label="PPSN"
                name="ppsn"
                autoComplete="ppsn"
                autoFocus
            />

            <TextField
                fullWidth
                margin="normal"
                required
                label="Elections"
                select
                value={pass}
                onChange={handleChange}
            >
                <MenuItem value="2024">2024</MenuItem>
                <MenuItem value="2023">2023</MenuItem>
                <MenuItem value="2022">2022</MenuItem>
            </TextField>


            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Register
            </Button>
            <Grid container>
                <Grid item xs>
                    <Link href="./login" variant="body2" underline="none" color="inherit">
                        Go Back
                    </Link>
                </Grid>
                <br /><br />
                <br />

                <Grid item xs>
                    {electionInf()}
                </Grid>
            </Grid>
        </Box></Box>


    return (
        
            

            <Box component="main" sx={{ p: 3 }} style={{ height: 400, width: '100%' }}>
                <CssBaseline />
                <Header></Header>
                <Typography component="h1" variant="h5" fontWeight={800} color={"black"}>
                    Register For Election

                </Typography>

                {element}
            </Box>

    );
}