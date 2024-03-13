'use client';
import * as React from 'react';

import Box from '@mui/material/Box';
import Chart from 'chart.js/auto'; // Add this line
import NavBar from '../../components/header/navBar';

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
      console.log("election is valid!")


      
    } else {

      console.log("election is not valid!")
    }
  }




export default function Page() {
  
  const [elections, setElections] = useState(null);
  const [ballots, setBallots] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetch(`http://localhost:3000/api/database/controllers/Admin/Election/retrieve_elections`)
      .then((res) => res.json())
      .then((data) => {
        setElections(data.result);

        console.log("Election data")
        console.log(data.result);
      })

      fetch(`http://localhost:3000/api/database/controllers/Admin/Ballot/retrieve_ballots`)
        .then((res) => res.json())
        .then((data) => {
          setBallots(data.result);
  
          console.log("Ballots data")
          console.log(data.result);
        })
    }, []);
  
    if (!elections || !ballots) return <p>No elections or ballots found. </p>;

    console.log(elections);

    let dataElement = ( elections.map( election => 
      <tr key={election._id.toString()}><td>{election._id}</td><td>{election.ballotID}</td><td>{ballot.title}</td><td><button onClick={() => goSeeBallot(ballot._id)}>See ballot</button></td><td><button onClick={() => goCancelElection(ballot._id)}>Cancel Election</button></td></tr>
      ));
    let element = <Box>
          <h1>Running Elections</h1>
          <table><tbody>
          { dataElement }
              </tbody></table>


            <button onClick={() => goBackToProfile()}>Back to Profile</button>
            <button onClick={() => goToBallots()}>Back to Ballots</button>
  </Box>

  const goBackToProfile = () => {
    router.push('/Admin/');
  };
  const goToBallots = () => {
    router.push('/Admin/Ballot/');
  };

  const goSeeBallot = (ballotID) => {
    router.push('/Admin/Election/SeeBallot?={' + ballotID + '}');
  };


  const goCancelElection = (ballotID) => {
    router.push('/Admin/Ballot/CancelElection/?ballotID={' + ballotID + '}');
  };

    
    
  const goAdminProfilePage = (userIDtoken) => {
    router.push('/Admin/?userIDtoken={' + userIDtoken + '}');
  };

  
  return (
    
    <Box component="main" sx={{ p: 3 }} style={{ height: 400, width: '100%' }}>
        
    <NavBar></NavBar>
    <Toolbar></Toolbar>
        { element }
    </Box>
	  

  );
}