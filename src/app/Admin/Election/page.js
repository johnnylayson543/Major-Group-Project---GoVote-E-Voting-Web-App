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
  
  const [elections, setElections] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetch(`http://localhost:3000/api/database/controllers/Admin/Election/retrieve_elections`)
      .then((res) => res.json())
      .then((data) => {
        setBallots(data.result);

        console.log("Ballot data")
        console.log(data.result);
      })
  }, []);
 
  if (!ballots) return <p>No bElections found. </p>;

  console.log(elections);

  let dataElement = ( elections.map( election => 
    <tr key={election._id.toString()}><td>{election._id}</td><td><button onClick={() => goCancelElection(ballot._id)}>Edit</button><button onClick={() => goRemoveBallot(ballot._id)}>Remove</button></td></tr>
     ));
  let element = <box>
        <h1>Elections</h1>
        <table><tbody>
        { dataElement }
            </tbody></table>
            <button onClick={() => goStartElection()}>Create New Ballot</button>


  </box>



  

  const goCancelElection = (ballotID) => {
    router.push('/Admin/Election/CancelElection/?ballotID={' + ballotID + '}');
  };

  const goStartElection = () => {
    router.push('/Admin/Election/CreateElection');
  };

  
  return (
    
    <Box component="main" sx={{ p: 3 }} style={{ height: 400, width: '100%' }}>
        
    <NavBar></NavBar>
    <Toolbar></Toolbar>
        { element }
    </Box>
	  

  );
}