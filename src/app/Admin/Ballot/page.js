'use client';
import * as React from 'react';

import {Box, Table} from '@mui/material';
import Chart from 'chart.js/auto'; // Add this line

import Script from 'next/script'
import { useState, useEffect } from 'react'
import { Toolbar, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { formatDateTime, objectIdToOKLCH } from '@/app/components/helpers';

  /*
  After the submit handler calls the runDBCallAsync, this does the thing
  This function does the actual work
  calling the fetch to get things from the database.
  */ 
  async function runDBCallAsync(url) {

    const res = await fetch(url);
    const data = await res.json();
 
    if(data.data== "valid"){
      console.log("ballot is valid!")


      
    } else {

      console.log("ballot is not valid!")
    }
  }




export default function Page() {
  
  const [ballots, setBallots] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetch(`http://localhost:3000/api/database/controllers/Admin/Ballot/retrieve_ballots`)
      .then((res) => res.json())
      .then((data) => {
        setBallots(data.result);

        console.log("Ballot data")
        console.log(data.result);
      })
  }, []);
 
  if (!ballots) return <p>No ballots found. </p>;

  console.log(ballots);

  let dataElement = ( ballots.map( ballot => 
    <tr key={ballot._id.toString()} style={{backgroundColor: objectIdToOKLCH(ballot._id)}}><td>{formatDateTime(ballot.closing_datetime)}</td><td>{ballot.title}</td><td><Button onClick={() => goEditBallot(ballot._id)}>Edit</Button><Button onClick={() => goRemoveBallot(ballot._id.toString())}>Remove</Button><Button  onClick={() => goManageCandidates(ballot._id.toString())}>Manage Candidates</Button></td></tr>
     ));
  let element = <Box id="BallotIndex" class="information-display">
        <h1>Ballots</h1>
        <Table>
          <thead>
            <tr>
              <th>Closing Date Time</th>
              <th>Title</th>
            </tr>
          </thead>
          
          <tbody>
        { dataElement }
            </tbody></Table>
            <p><Button onClick={() => goCreateBallot()}>Create New Ballot</Button></p>

            <p>
            <Button onClick={() => goBackToProfile()}>Back to Profile</Button>
            <Button onClick={() => goToElections()}>Back to Elections</Button></p>
  </Box>

  const goBackToProfile = () => {
    router.push('/Admin/Profile/');
  };
  const goToElections = () => {
    router.push('/Admin/Election/');
  };

  
  const goEditBallot = (ballotID) => {
    router.push('/Admin/Ballot/EditBallot/?ballotID={' + ballotID + '}');
  };

  const goRemoveBallot = (ballotID) => {
    router.push('/Admin/Ballot/RemoveBallot/?ballotID={' + ballotID + '}');
  };

  const goCreateBallot = () => {
    router.push('/Admin/Ballot/CreateBallot');
  };

  const goManageCandidates = (ballotID) => {
    router.push('/Admin/Candidate/?ballotID={' + ballotID + '}');
  };

  const goAdminProfilePage = (userIDtoken) => {
    router.push('/Admin/?ballotID={' + userIDtoken + '}');
  };

  
  return (
    
    <Box component="main" sx={{ p: 3 }} style={{ height: 400, width: '100%' }}>
        
    <Toolbar></Toolbar>
        { element }
    </Box>
	  

  );
}