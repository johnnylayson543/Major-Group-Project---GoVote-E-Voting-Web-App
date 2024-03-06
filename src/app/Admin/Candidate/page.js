'use client';
import * as React from 'react';

import Box from '@mui/material/Box';
import Chart from 'chart.js/auto'; // Add this line
import NavBar from '../../header/navBar';

import Script from 'next/script'
import { useState, useEffect } from 'react'
import { Toolbar } from '@mui/material';
import { useRouter } from 'next/navigation';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

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
  
  const [ballot, setBallot] = useState(null);
  const [ballot_candidates, setBallotCandidates] = useState(null);
  const router = useRouter();

  const handleSubmit = (event) => {

    console.log("handling submit");


    event.preventDefault();

    const data = new FormData(event.currentTarget);


    let person_ppsn = data.get('person_ppsn');

    console.log("Sent person ppsn:" + person_ppsn);

    // Call this function to pass the data created by the FormData
    // src\app\api\database\controllers\Admin\Ballot\create_ballot
    //runDBCallAsync(`http://localhost:3000/api/database/controllers/Admin/Ballot/AddPersonToTheBallot?person_ppsn=${person_ppsn}&ballotID=${ballot._id}`);
    goBackToBallotCandidates(ballot._id);
    goBackToAddPersonToTheBallot(ballot._id, person_ppsn);

  }; // end handler

  useEffect(() => {
    const { searchParams } = new URL(window.location.href);
    const ballot_id = searchParams.get('ballotID');
    fetch(`http://localhost:3000/api/database/controllers/Admin/Ballot/retrieve_ballot?ballotID=${ballot_id}`)
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

        console.log("Candidate data")
        console.log(data.result);
      })
  }, []);
 
  if ((!ballot || !ballot_candidates)) return <p>No ballot or candidate found. </p>;

  console.log(ballot);

  let dataElement1 =  
    <tr key={ballot._id}><td>{ballot._id}</td><td>{ballot.closing_datetime}</td><td>{ballot.title}</td></tr>

     ;
     let dataElement2 =  ( ballot_candidates.map( ballot_candidate => 
        <tr key={ballot._id.toString()}><td>{ballot_candidate._id}</td><td>{ballot_candidate.ballotID}</td><td>{ballot_candidate.ppsn}</td><td><button onClick={() => goEditBallot(ballot._id)}>Edit</button><button onClick={() => goRemoveBallot(ballot._id.toString())}>Remove</button><button  onClick={() => goManageCandidates(ballot._id.toString())}>Manage Candidates</button></td></tr>
         ));
  let element = <Box>
        <h1>Candidates on the ballot</h1>
        <h2>Ballot</h2>
        <table><tbody>
        { dataElement1 }
            </tbody></table>
            <h2>Ballot Candidates</h2>
            <table><tbody>
        { dataElement2 }
            </tbody></table>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="person_ppsn"
                  label="person_ppsn"
                  name="person_ppsn"
                  autoComplete="person_ppsn"
                  autoFocus
              />

              <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2}}
              >
                Add Person to the Ballot
              </Button>

            <p>
            <button onClick={() => goBackToElections()}>Back to Elections</button>
            <button onClick={() => goBackToProfile()}>Back to Profile</button>
            <button onClick={() => goToBallots()}>Back to Ballots</button></p>
        </Box>
    </Box>
  const goBackToElections = () => {
    router.push('/Admin/Election/');
  };

  const goBackToBallotCandidates = (ballotID) => {
    router.push('/Admin/Candidate/?ballotID={' + ballotID + '}');
  };
  const goBackToProfile = () => {
    router.push('/Admin/');
  };
  const goToBallots = () => {
    router.push('/Admin/Ballot/');
  };

  const goBackToAddPersonToTheBallot = (ballotID, personPPSN) => {
    router.push('/Admin/Candidate/AddPersonToTheBallot/?ballotID=' + ballotID + '}&person_pps={' + personPPSN + '}');
  }

  
  const goAddCandidate = (ballotID) => {
    router.push('/Admin/Candidate/AddPersonToBallot/?ballotID={' + ballotID + '}');
  };

  const goRemoveBallot = (ballotID) => {
    router.push('/Admin/Ballot/RemoveBallot/?ballotID={' + ballotID + '}');
  };

  const goCreateBallot = () => {
    router.push('/Admin/Ballot/CreateBallot');
  };

  const goManageCandidates = (ballotID) => {
    router.push('/Admin/Candidates/?ballotID={' + ballotID + '}');
  };

  
  


  return (
    
    <Box component="main" sx={{ p: 3 }} style={{ height: 400, width: '100%' }}>
        
    <NavBar></NavBar>
    <Toolbar></Toolbar>
        { element }
              
            </Box>
	  

  );
}