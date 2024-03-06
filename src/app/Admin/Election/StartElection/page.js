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
    <tr key={ballot._id.toString()}><td>{ballot._id}</td><td>{ballot.closing_datetime}</td><td>{ballot.title}</td><button onClick={() => goUseBallot(ballot._id)}>Use Ballot</button></tr>
     ));
  let element = <Box>
        <h1>Ballots to use to start an election</h1>
        <table><tbody>
        { dataElement }
            </tbody></table>


            <button onClick={() => goBackToElections()}>Back to Elections</button>
            <button onClick={() => goBackToProfile()}>Back to Profile</button>
            <button onClick={() => goBackToBallots()}>Back to Ballots</button>
  </Box>

const goBackToElections = () => {
    router.push('/Admin/Election/');
  };
  const goToProfile = () => {
    router.push('/Admin/');
  };
  const goToBallots = () => {
    router.push('/Admin/Ballot/');
  };

  
  return (
    
    <Box component="main" sx={{ p: 3 }} style={{ height: 400, width: '100%' }}>
        
    <NavBar></NavBar>
    <Toolbar></Toolbar>
        { element }
    </Box>
	  

  );
}