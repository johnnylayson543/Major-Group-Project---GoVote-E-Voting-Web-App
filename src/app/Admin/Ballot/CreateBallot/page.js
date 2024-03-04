'use client';
import * as React from 'react';

import Box from '@mui/material/Box';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Chart from 'chart.js/auto'; // Add this line
import NavBar from '../../../header/navBar';

import Script from 'next/script'
import { useState, useEffect } from 'react'
import { Toolbar } from '@mui/material';
import { useRouter } from 'next/navigation';

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




export default function Page() {
  
  const [ballots, setBallots] = useState(null);
  const router = useRouter();

  const handleSubmit = (event) => {

    console.log("handling submit");


    event.preventDefault();

    const data = new FormData(event.currentTarget);


    let ballot_closing_date = data.get('ballot_closing_date');
    let ballot_title = data.get('ballot_title');

    console.log("Sent ballot_closing_date:" + ballot_closing_date);

    // Call this function to pass the data created by the FormData
    // src\app\api\database\controllers\Admin\Ballot\create_ballot
    runDBCallAsync(`http://localhost:3000/api/database/controllers/Admin/Ballot/create_ballot?ballot_closing_date=${ballot_closing_date}&ballot_title=${ballot_title}`);

  }; // end handler



  return (
    
    <Box component="main" sx={{ p: 3 }} style={{ height: 400, width: '100%' }}>
        
    <NavBar></NavBar>
    <Toolbar></Toolbar>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="ballot_closing_date"
                  label="ballot_closing_date"
                  name="ballot_closing_date"
                  autoComplete="ballot_closing_date"
                  autoFocus
              />
              <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="ballot_title"
                  label="ballot_title"
                  name="ballot_title"
                  autoComplete="ballot_title"
                  autoFocus
              />

              <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2}}
              >
                Create Ballot
              </Button>
              
            </Box>
    </Box>
	  

  );
}