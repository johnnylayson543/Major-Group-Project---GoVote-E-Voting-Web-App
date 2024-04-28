'use client';
import * as React from 'react';

import Box from '@mui/material/Box';
import Chart from 'chart.js/auto'; // Add this line

import Script from 'next/script'
import { useState, useEffect } from 'react'
import { Button, Card, Table, TableBody, TableCell, TableHead, TableRow, Toolbar } from '@mui/material';
import { useRouter } from 'next/navigation';
import { objectIdToOKLCH } from '@/app/components/helpers';

/*
After the submit handler calls the runDBCallAsync, this does the thing
This function does the actual work
calling the fetch to get things from the database.
*/
async function runDBCallAsync(url) {

  const res = await fetch(url);
  const data = await res.json();

  if (data.data == "valid") {
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

  let dataElement1 = (elections.map(election =>
    <TableRow key={election._id.toString()} style={{ backgroundColor: objectIdToOKLCH(election._id)}}><TableCell>{election._id}</TableCell><TableCell>{election.ballotID}</TableCell><TableCell><Button onClick={() => goSeeBallot(election.ballotID)}>See ballot</Button></TableCell><TableCell><Button onClick={() => goCancelElection(election.ballotID)}>Cancel Election</Button></TableCell></TableRow>
  ));


  let element = <Box>
    <Card>
    <h1>Running Elections</h1>
    <Table>
      <TableHead><TableRow>
        <TableCell>Election ID</TableCell>
        <TableCell>Ballot ID</TableCell>
        <TableCell>Actions</TableCell>
      </TableRow></TableHead>
      <TableBody>
        {dataElement1}
      </TableBody></Table>
      </Card>
    <p>
      <Button onClick={() => goToRunnableBallots()}>Find Ballots for an election</Button>
    </p>
    <p>
      <Button onClick={() => goBackToProfile()}>Back to Profile</Button>
      <Button onClick={() => goToBallots()}>Back to Ballots</Button>
    </p>
  </Box>

  const goToRunnableBallots = () => {
    router.push('/Admin/Election/SeeRunnableBallots/');
  };

  const goBackToProfile = () => {
    router.push('/Admin/Profile/');
  };
  const goToBallots = () => {
    router.push('/Admin/Ballot/');
  };

  const goSeeBallot = (ballotID) => {
    router.push('/Admin/Election/SeeBallot?ballotID={' + ballotID + '}');
  };


  const goCancelElection = (ballotID) => {
    router.push('/Admin/Election/CancelElection/?ballotID={' + ballotID + '}');
  };



  const goAdminProfilePage = (userIDtoken) => {
    router.push('/Admin/?userIDtoken={' + userIDtoken + '}');
  };


  return (

    <Box component="main" sx={{ p: 3 }} style={{ height: 400, width: '100%' }}>

      <Toolbar></Toolbar>
      {element}
    </Box>


  );
}