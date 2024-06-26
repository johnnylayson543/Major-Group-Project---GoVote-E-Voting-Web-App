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
import { Card, Table, TableBody, TableCell, TableHead, TableRow, Toolbar } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import { formatDateTime, objectIdToOKLCH } from '@/app/components/helpers';

/*
After the submit handler calls the runDBCallAsync, this does the thing
This function does the actual work
calling the fetch to get things from the database.
*/
async function runDBCallAsync(url) {

  const res = await fetch(url);
  const data = await res.json();

  if (data.data == "valid") {
    console.log("see ballot is valid!")



  } else {

    console.log("see ballot is not valid!")
  }
}




export default function Page() {

  const [runnable_ballots, setRunnableBallots] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetch(`http://localhost:3000/api/database/controllers/Admin/Ballot/retrieve_runnable_ballots`)
      .then((res) => res.json())
      .then((data) => {
        setRunnableBallots(data.result);
        console.log("Ballot data");
        console.log(data.result);
      })

  }, []);

  const handleSubmit = (event) => {

    console.log("handling submit");


    event.preventDefault();

    // Call this function to pass the data created by the FormData
    // src\app\api\database\controllers\Admin\Ballot\create_ballot
    goBack();

  }; // end handler


  const goBack = () => {
    router.push('/Admin/Ballot/');
  };




  if (!runnable_ballots) return <Box><p>No runnable ballots available. </p>
  </Box>
    ;

  let dataElement1 = (runnable_ballots.map(ballot =>
    <TableRow key={ballot._id.toString()} style={{ backgroundColor: objectIdToOKLCH(ballot._id)}}><TableCell>{ballot._id}</TableCell><TableCell>{formatDateTime(ballot.closing_datetime)}</TableCell><TableCell>{ballot.title}</TableCell><TableCell><Button onClick={() => goRunTheBallotForTheElection(ballot._id)}>Run the Election with this Ballot</Button></TableCell></TableRow>
  ));
  let element = <Box><Card>
    <h1>Runnable Ballots</h1>
    <Table>
      <TableHead><TableRow>
        <TableCell>Ballot ID</TableCell>
        <TableCell>Closing Date Time</TableCell>
        <TableCell>Title</TableCell>


      </TableRow></TableHead>
      <TableBody>
        {dataElement1}
      </TableBody></Table>
      </Card>
  </Box>;




  const goRunTheBallotForTheElection = (ballot_id) => {
    router.push("/Admin/Election/StartElection/?ballotID={" + ballot_id + "}");
  }
  const goBackToElections = () => {
    router.push('/Admin/Election/');
  };
  const goBackToProfile = () => {
    router.push('/Admin/Profile/');
  };
  const goBackToBallots = () => {
    router.push('/Admin/Ballot/');
  };



  return (

    <Box component="main" sx={{ p: 3 }} style={{ height: 400, width: '100%' }}>

      <Toolbar></Toolbar>
      {element}
      <Button onClick={() => goBackToElections()}>Back to Elections</Button>
      <Button onClick={() => goBackToProfile()}>Back to Profile</Button>
      <Button onClick={() => goBackToBallots()}>Back to Ballots</Button>
    </Box>


  );
}