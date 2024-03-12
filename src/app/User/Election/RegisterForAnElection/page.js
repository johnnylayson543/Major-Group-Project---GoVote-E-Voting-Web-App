'use client'

import * as React from 'react';
import NavBar from '../../../components/header/navBar';
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
import {useEffect, useState} from "react";

global.mongoURL = "mongodb+srv://evote.kyxphj1.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority";

export default function Page() {
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
            console.log("Login is valid!");
        } else {
            console.log("Login is not valid!");
        }
    }


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
        if (selectedItem === '2024'){
            return <Typography>2024 Elections close 3rd March </Typography>
        } else if (selectedItem === '2023'){
            return <Typography>2023 Elections are clsoed as of 3rd March 2023</Typography>
        } else if (selectedItem === '2022'){
            return <Typography>2022 Elections are closed as of 3rd March 2022</Typography>
        } else {
            return null;
        }
    };



    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 12,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <NavBar />
                <Typography component="h1" variant="h5" fontWeight={800} color={"black"}>
                    Register For Election
                </Typography>

                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
                        <br/><br/>
                        <br/>

                        <Grid item xs>
                            {electionInf()}
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}