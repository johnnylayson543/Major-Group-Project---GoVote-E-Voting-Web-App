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
import { useRouter } from 'next/navigation';
import Head from 'next/head';

  /*
  After the submit handler calls the runDBCallAsync, this does the thing
  This function does the actual work
  calling the fetch to get things from the database.
  */ 
  async function runDBCallAsync(url) {

    const res = await fetch(url);
    const data = await res.json();
 
    if(data.data== "valid"){
      console.log("add person to ballot is valid!")

      console.log("Data and data.result:");
      console.log(data);
      console.log(data.result);


      
    } else {

      console.log("add person to ballot is not valid!")
    }
  }



export default function Page() {
  
  const router = useRouter();

  const [ballot, setBallot] = useState(null);
  const [person, setPerson] = useState(null);
  


  useEffect(() => {
    const { searchParams } = new URL(window.location.href);
    const ballot_id = searchParams.get('ballotID');
    const person_ppsn = searchParams.get('person_ppsn');
    console.log("searchParams: " + ballot_id + ", " + person_ppsn);
    fetch(`http://localhost:3000/api/database/controllers/Admin/Ballot/retrieve_ballot?ballotID=${ballot_id}`)
      .then((res) => res.json())
      .then((data) => {
        setBallot(data.result);

        console.log("Ballot data");
        console.log(data.result);
      })
      
    fetch(`http://localhost:3000/api/database/controllers/Admin/Candidate/retrieve_selected_person?person_ppsn=${person_ppsn}`)
      .then((res) => res.json())
      .then((data) => {
        setPerson(data.result);

        console.log("Person data");
        console.log(data.result);
      })
  }, []);

  let element;
  if(person && ballot){
    let dataElement1 =  
      <div key={ballot._id.toString()}>
        <p>{ballot._id}</p><p>{ballot.closing_datetime}</p><p>{ballot.title}</p></div>

      ;
      let dataElement2 =  
      <div key={person._id.toString()}><p>{person._id}</p><p>{person.name}</p><p>{person.address}</p><p>{person.email}</p><p>{person.phone}</p><p>{person.date_of_birth}</p></div>

      ;
    element = <Box>
          <h1>Add Person to the Ballot - Create a Candidate</h1>
          <h2>Ballot</h2>
          <section>
          { dataElement1 }
          </section>
          <h2>Person</h2>
          <section>
          { dataElement2 }
          </section>

              
    </Box>
  } else { element = <Box><p>No ballot or person found. </p>
    <button onClick={() => goBackToProfile()}>Back to Profile</button></Box>
  }

  const handleSubmit = (event) => {

    console.log("handling submit");


    event.preventDefault();

    const data = new FormData(event.currentTarget);


    let person_ppsn = data.get('person_ppsn');

    console.log("Sent person_ppsn:" + person_ppsn);

    console.log(person);
    console.log(ballot);

    // Call this function to pass the data created by the FormData
    // src\app\api\database\controllers\Admin\Ballot\create_ballot
    runDBCallAsync(`http://localhost:3000/api/database/controllers/Admin/Candidate/add_person_to_the_ballot?person_ppsn=${person.ppsn}&ballotID=${ballot._id}`);

    goBackToBallotCandidates(ballot._id);

  }; // end handler


  const goBackToBallotCandidates = (ballotID) => {
    router.push('/Admin/Candidate/?ballotID={' + ballotID + '}');
  };

  
  const goBackToProfile = () => {
    router.push('/Admin/Profile');
  };

  

  return (
    
    <Box component="main" sx={{ p: 3 }} style={{ height: 400, width: '100%' }}>
        
    <Toolbar></Toolbar>

        { element }
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              
              <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2}}
              >
                Confirm Candidate
              </Button>
              
            </Box>
            <button onClick={() => goBackToProfile()}>Back to Profile</button>
    </Box>
	  

  );
}