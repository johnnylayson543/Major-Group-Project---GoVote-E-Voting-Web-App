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


  /*
  This is the submit handler for the e-voting register page after the button is fired
  When the button is clicked, this is the event that is fired.
  The first thing we need to do is prevent the default refresh of the page.
  */
	const handleSubmit = (event) => {
		
		console.log("handling login submit");


    event.preventDefault();
  
		const data = new FormData(event.currentTarget);


    let rangeMin = data.get('rangeMin')
    let rangeMax = data.get('rangeMax')

    console.log("Range Min:" + rangeMin)
    console.log("Range Max:" + rangeMax)


    runDBCallAsync(`http://localhost:3000/api/admin/addStubAccounts?rangeMin=${rangeMin}&rangeMax=${rangeMax}`)




  }; // end login submit handler




  // Create a theme
  const theme = createTheme({
    palette: {
     
      secondary: {
        main: green[500],
      },
    },
  });
  



  // This is what's get displayed on the main page (the frontend)
  return (
    <ThemeProvider theme={theme}>
    <Container component="main"  maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
  
        </Avatar>
        <Typography component="h1" variant="h5">
          Login to GoVote
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Range Minimum"
            name="rangeMin"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="rangeMax"
            label="Range Maximum"
            name="rangeMax"
            autoFocus
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Add Stub Accounts
          </Button>

        </Box>
      </Box>

    </Container>

    </ThemeProvider>

  );
}