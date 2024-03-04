'use client';
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
import {ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { green, purple } from '@mui/material/colors';
import { useState, useEffect } from 'react'

// WARNING: Still Incomplete, needs candidate page on the MongoDB cloud and still figuring out about the name.
// This is the most important part of the prototype that needs to be completed asap. some variables here like the ballotID are temporary placeholders

export default function Page() {


    /*
      After the submit handler calls the runDBCallAsync, this does the thing
      This function does the actual work
      calling the fetch to get things from the database.
      */
    async function runDBCallAsync(url) {

        const res = await fetch(url);
        const data = await res.json();

        if(data.data== "valid"){
            console.log("login is valid!")



        } else {

            console.log("login is not valid!")
        }
    }


//
// Function for putting items into the shopping cart.
//

    document.addEventListener('DOMContentLoaded', function () {
        document.getElementById('yourFormId').addEventListener('submit', function (event) {
            event.preventDefault(); // Prevents the default form submission behavior

            // Get the form data
            var candidateID = document.getElementById('candidateID').value;
            var voterID = document.getElementById('voterID').value;


            // Assuming you have a function updateAccount in your JavaScript
            updateVote(candidateID, voterID);
        });
    });



    function recastTheVote(candidateID, voterID){
        console.log("CandidateID: " + candidateID + ", voterID: " + voterID);
        var url = `http://localhost:3000/api/voter/recastVote?candidateID=${candidateID}&voterID=${voterID}`;
        runDBCallAsync(url);
    }

    function getBallotCandidates(ballotID){
        var url = `http://localhost:3000/api/general/getBallot?ballotID=${ballotID}`;
        runDBCallAsync(url);
    }



    const [data, setData] = useState(null)

    useEffect(() => {
        fetch(`http://localhost:3000/api/general/getBallot?ballotID=${1}`)
            .then((res) => res.json())
            .then((data) => {
                setData(data)
            })
            .catch( (error) => { console.error('Error:', error) } );
    }, []);

    // If there is no data
    if (!data) return <p>Loading</p>

    const theme = createTheme({
        palette: {
            secondary: {
                main: green[500],
            },
        },
    });
    return (
        <ThemeProvider theme={theme}>

            <Container component="main" maxWidth="xs">
                <div style={{fontSize: '40px'}} >Cast Your Vote</div>
                <div>
                    {
                        data.map((candidate1, index) => (
                            <div style={{padding: '20px'}} key={index} >
                                Unique ID: {candidate1._id}
                                <br></br>
                                PPSN: {candidate1.ppsn}
                                <br />
                                CandidateID: {candidate1.ballotID}
                                <br></br>
                                <Button onClick={() => recastTheVote(candidate1.candidateID)} variant="outlined">Cast Vote</Button>
                            </div>
                        ))
                    }

                </div>
            </Container>
        </ThemeProvider>
    );
}
