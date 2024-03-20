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

  /*
  After the submit handler calls the runDBCallAsync, this does the thing
  This function does the actual work
  calling the fetch to get things from the database.
  */ 
  async function runDBCallAsync(url) {

    const res = await fetch(url);
    const data = await res.json();
 
    if(data.data== "valid"){
      console.log("remove person from ballot is valid!")


      
    } else {

      console.log("remove person from ballot is not valid!")
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
    fetch(`http://localhost:3000/api/database/controllers/Admin/Ballot/retrieve_the_ballot?ballotID=${ballot_id}`)
      .then((res) => res.json())
      .then((data) => {
        setBallot(data.result);

        console.log("Ballot data");
        console.log(data.result);
      })
      
    fetch(`http://localhost:3000/api/database/controllers/Admin/Candidate/retrieve_selected_person?ballotID=${person_ppsn}`)
      .then((res) => res.json())
      .then((data) => {
        setPerson(data.result[0][0]);

        console.log("Person data");
        console.log(data.result);
      })
  }, []);


  let dataElement1 =  
    <tr key={ballot._id.toString()}><td>{ballot._id}</td><td>{ballot.closing_datetime}</td><td>{ballot.title}</td></tr>

     ;
     let dataElement2 =  
    <tr key={person._id.toString()}><td>{person._id}</td><td>{person.name}</td><td>{person.address}</td><td>{person.email}</td><td>{person.phone}</td><td>{person.date_of_birth}</td></tr>

     ;
  let element = <box>
        <h1>Remove Person from the Ballot - End a Candidacy</h1>
        <table><tbody>
        { dataElement1 }
            </tbody></table>
            <table><tbody>
        { dataElement2 }
            </tbody></table>


  </box>

  const handleSubmit = (event) => {

    console.log("handling submit");


    event.preventDefault();

    const data = new FormData(event.currentTarget);


    let person_ppsn = data.get('person_ppsn');

    console.log("Sent person_ppsn:" + person_ppsn);

    // Call this function to pass the data created by the FormData
    // src\app\api\database\controllers\Admin\Ballot\create_ballot
    runDBCallAsync(`http://localhost:3000/api/database/controllers/Admin/Ballot/remove_person_from_ballot_removeCandidate?person_ppsn=${person.ppsn}&ballotIDe=${ballot._id}`);

    goBack(ballot._id);

  }; // end handler


  const goBack = (ballotID) => {
    router.push('/Admin/Candidate/?ballotID={' + ballotID + '}');
  };

  return (
    
    <Box component="main" sx={{ p: 3 }} style={{ height: 400, width: '100%' }}>
        
    <Toolbar></Toolbar>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              
              <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2}}
              >
                Confirm Candidate Removal
              </Button>
              
            </Box>
    </Box>
	  

  );
}