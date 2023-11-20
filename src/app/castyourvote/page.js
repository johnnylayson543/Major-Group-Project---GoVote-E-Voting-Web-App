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


//
// Function for putting items into the shopping cart.
//
function castTheVote(ballotID){
  console.log("casting vote: " + ballotID)
  fetch("http://localhost:3000/api/voter/castVote?ballotID="+ ballotID);
}
  


  const [data, setData] = useState(null)
  const [weather, setWeatherData] = useState(0)



  // This pre-made react method is for fetching the items on the database and turning into a json data
  useEffect(() => {
    fetch('http://localhost:3000/api/admin/addCandidate')
    .then((res) => res.json())
    .then((data) => {
    setData(data)
    })

  }, [])

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
    data.map((candidate, i) => (
    <div style={{padding: '20px'}} key={i} >
    Unique ID: {candidate._id}
    <br></br>
    {candidate.ppsn}
    -
    {candidate.ballotID}
    <br></br>
    <Button onClick={() => castTheVote(candidate.ballotID)} variant="outlined">Cast Vote</Button>
    </div>
    ))
  }
  </div>
    </Container>
    </ThemeProvider>
  );
}
