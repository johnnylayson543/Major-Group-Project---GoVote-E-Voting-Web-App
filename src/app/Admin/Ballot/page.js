'use client';
import * as React from 'react';

import Box from '@mui/material/Box';
import Chart from 'chart.js/auto'; // Add this line
import NavBar from '../../header/navBar';

import Script from 'next/script'
import { useState, useEffect } from 'react'
import { Toolbar } from '@mui/material';
import { useRouter } from 'next/router';

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
  //const router = useRouter();

  useEffect(() => {
    fetch(`http://localhost:3000/api/database/controllers/Admin/Ballot/retrieve_ballots`)
      .then((res) => res.json())
      .then((data) => {
        setBallots(data.result);
        const router = useRouter();

        console.log("Ballot data")
        console.log(data.result);
      })
  }, []);
 
  if (!ballots) return <p>No ballots found. </p>;

  console.log(ballots);

  
  const goEditBallot = (ballotID) => {
    router.push('./EditBallot/?ballotID={' + ballotID + '}');
  };

  const goRemoveBallot = (ballotID) => {
    router.push('./RemoveBallot/?ballotID={' + ballotID + '}');
  };

  const goCreateBallot = () => {
    router.push('./CreateBallot/');
  };

  
  return (
    
    <Box component="main" sx={{ p: 3 }} style={{ height: 400, width: '100%' }}>
        
    <NavBar></NavBar>
    <Toolbar></Toolbar>
        <h1>Ballots</h1>
        <table><tbody>
        {ballots.map( ballot => 
            <tr key={ballot._id.toString()}><td>{ballot._id}</td><td>{i.n}</td><td><button onClick={goEditBallot(ballot._id)}>Edit</button><button onClick={goRemoveBallot(ballot._id)}>Remove</button></td></tr>
             )
            }
            </tbody></table>
            <button onClick={goCreateBallot()}>Create New Ballot</button>
    </Box>
	  

  );
}