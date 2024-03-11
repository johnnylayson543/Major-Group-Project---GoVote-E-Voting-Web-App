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
import NavBar from '../../../components/header/navBar';

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
  
  const router = useRouter();

  const [ballot, setBallot] = useState(null);
  const [person, setPerson] = useState(null);


  useEffect(() => {
    const { searchParams } = new URL(window.location.href);
    const ballot_id = searchParams.get('ballotID');
    const person_ppsn = searchParams.get('person_ppsn');
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

        console.log("Person data")
        console.log(data.result);
      })
  }, []);


  let dataElement1 =  
    <tr key={ballot._id.toString()}><td>{ballot._id}</td><td>{ballot.closing_datetime}</td><td>{ballot.title}</td></tr>

     ;
     let dataElement2 =  
    <tr key={person._id.toString()}><td>{person._id}</td><td>{person.name}</td><td>{person.address}</td><td>{person.email}</td><td>{person.phone}</td><td>{person.date_of_birth}</td></tr>

     ;
  let element1 = <Box>
        <h1>Add Person to the Ballot - Create a Candidate</h1>
        <table><tbody>
        { dataElement1 }
            </tbody></table>
            <table><tbody>
        { dataElement2 }
            </tbody></table>

            <button onClick={() => goBackToProfile()}>Back to Profile</button>
  </Box>

let element;
if (!ballot || !person) element = <Box><p>No ballot or person found. </p>
<button onClick={() => goBackToProfile()}>Back to Profile</button></Box>
else element = element1;

  const handleSubmit = (event) => {

    console.log("handling submit");


    event.preventDefault();

    const data = new FormData(event.currentTarget);


    let person_ppsn = data.get('person_ppsn');

    console.log("Sent person_ppsn:" + person_ppsn);

    // Call this function to pass the data created by the FormData
    // src\app\api\database\controllers\Admin\Ballot\create_ballot
    runDBCallAsync(`http://localhost:3000/api/database/controllers/Admin/Ballot/add_person_to_ballot_createCandidate?person_ppsn=${person.ppsn}&ballotIDe=${ballot._id}`);

    goBackToBallotCandidates(ballot._id);

  }; // end handler


  const goBackToBallotCandidates = (ballotID) => {
    router.push('/Admin/Candidate/?ballotID={' + ballotID + '}');
  };

  
  const goBackToProfile = () => {
    router.push('/Admin/');
  };

  

  return (
    
    <Box component="main" sx={{ p: 3 }} style={{ height: 400, width: '100%' }}>
        
    <NavBar></NavBar>
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
    </Box>
	  

  );
}