'use client';
import * as React from 'react';

import Box from '@mui/material/Box';
import Chart from 'chart.js/auto'; // Add this line
import NavBar from '../../header/navBar';

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
    <tr key={ballot._id.toString()}><td>{ballot._id}</td><td>{ballot.closing_datetime}</td><td>{ballot.title}</td><td><button onClick={() => goEditBallot(ballot._id)}>Edit</button><button onClick={() => goRemoveBallot(ballot._id.toString())}>Remove</button><button  onClick={() => goManageCandidates(ballot._id.toString())}>Manage Candidates</button></td></tr>
     ));
  let element = <Box>
        <h1>Ballots</h1>
        <table><tbody>
        { dataElement }
            </tbody></table>
            <p><button onClick={() => goCreateBallot()}>Create New Ballot</button></p>

            <p>
            <button onClick={() => goBackToProfile()}>Back to Profile</button>
            <button onClick={() => goToElections()}>Back to Elections</button></p>
  </Box>

  const goBackToProfile = () => {
    router.push('/Admin/');
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
        
    <NavBar></NavBar>
    <Toolbar></Toolbar>
        { element }
    </Box>
	  

  );
}