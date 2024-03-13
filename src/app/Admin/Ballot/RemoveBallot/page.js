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

import Script from 'next/script'
import { useState, useEffect } from 'react'
import { Toolbar } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';

  /*
  After the submit handler calls the runDBCallAsync, this does the thing
  This function does the actual work
  calling the fetch to get things from the database.
  */ 
  async function runDBCallAsync(url) {

    const res = await fetch(url);
    const data = await res.json();
 
    if(data.data== "valid"){
      console.log("remove ballot is valid!")


      
    } else {

      console.log("remove ballot is not valid!")
    }
  }




export default function Page() {
  
  const [ballot, setBallot] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const { searchParams } = new URL(window.location.href);
    const ballot_id = searchParams.get('ballotID');
    fetch(`http://localhost:3000/api/database/controllers/Admin/Ballot/retrieve_ballot?ballotID=${ballot_id}`)
      .then((res) => res.json())
      .then((data) => {
        const list1 = data.result;
        setBallot(list1);
        

        console.log("Ballot data");
        console.log(data.result);
      })
  }, []);

  const handleSubmit = (event) => {

    console.log("handling submit");


    event.preventDefault();



    let ballot_id = ballot._id;
    console.log("Sent ballot_id:" + ballot_id);

    // Call this function to pass the data created by the FormData
    // src\app\api\database\controllers\Admin\Ballot\create_ballot
    runDBCallAsync(`http://localhost:3000/api/database/controllers/Admin/Ballot/remove_ballot?ballotID=${ballot_id}`);
    goBack();

  }; // end handler


  const goBack = () => {
    router.push('/Admin/Ballot/');
  };

  if (!ballot) return <p>No ballots found. </p>;

  let dataElement =  
    <p> BallotID: {ballot._id} <br /> Closing date: {ballot.closing_datetime} <br /> Title: {ballot.title}</p>
     ;
  let element = <Box>
        <h1>Ballots</h1>
        <table><tbody>
        { dataElement }
            </tbody></table>


            </Box>
  const goToElections = () => {
    router.push('/Admin/Election/');
  };

  const goBackToProfile = () => {
    router.push('/Admin/Profile');
  };
  const goBackToBallots = () => {
    router.push('/Admin/Ballot/');
  };


  return (
    
    <Box component="main" sx={{ p: 3 }} style={{ height: 400, width: '100%' }}>
        
    <Header></Header>
    <Toolbar></Toolbar>

        
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        { element }

              <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2}}
              >
                Confirm Ballot Removal
              </Button>
              
            </Box>

            <Box><p>
            <button onClick={() => goToElections()}>Back to Elections</button>
            <button onClick={() => goBackToProfile()}>Back to Profile</button>
            <button onClick={() => goBackToBallots()}>Back to Ballots</button></p></Box>
    </Box>
	  

  );
}