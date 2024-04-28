'use client';
import * as React from 'react';

import Box from '@mui/material/Box';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


import { useState, useEffect } from 'react'
import { FormLabel, Tab, Table, TableBody, TableCell, TableRow, Toolbar } from '@mui/material';
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
    console.log("edit ballot is valid!")



  } else {

    console.log("edit ballot is not valid!")
  }
}




export default function Page() {

  const [ballot, setBallot] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const { searchParams } = new URL(window.location.href);
    const ballot_id = searchParams.get('ballotID');
    fetch(`http://localhost:3000/api/database/controllers/Admin/Ballot/retrieve_the_ballot?ballotID=${ballot_id}`)
      .then((res) => res.json())
      .then((data) => {
        const list1 = data.result;
        setBallot(list1);


        console.log("Ballot data");
        console.log(data.result);
      })
  }, []);

  const handleSubmit = (event) => {

    console.log("handling submit");


    event.preventDefault();

    const data = new FormData(event.currentTarget);


    let ballot_closing_datetime = data.get('ballot_closing_date');
    let ballot_title = data.get('ballot_title');

    console.log("Sent ballot_closing_date:" + ballot_closing_date);

    // Call this function to pass the data created by the FormData
    // src\app\api\database\controllers\Admin\Ballot\create_ballot
    runDBCallAsync(`http://localhost:3000/api/database/controllers/Admin/Ballot/update_ballot?ballot_closing_datetime=${ballot_closing_datetime}&ballot_title=${ballot_title}`);
    goBack();

  }; // end handler


  const goBack = () => {
    router.push('/Admin/Ballot/');
  };

  if (!ballot) return <Box><p>No ballots found. </p></Box>;

  let dataElement =  
  <Table style={{backgroundColor: objectIdToOKLCH(ballot._id)}}>
    <TableBody>
      <TableRow><TableCell><FormLabel>BallotID:</FormLabel><Tab></Tab> {ballot._id} </TableCell></TableRow>
      <TableRow><TableCell><FormLabel>Closing date:</FormLabel><Tab></Tab>{ballot.closing_datetime}</TableCell></TableRow>
      <TableRow><TableCell><FormLabel>Title:</FormLabel><Tab></Tab> {ballot.title}</TableCell></TableRow>
      </TableBody>
      </Table>;
  let element = <Box>
    <h1>Ballots</h1>
    {dataElement}



  </Box>
  const goToElections = () => {
    router.push('/Admin/Election/');
  };

  const goBackToProfile = () => {
    router.push('/Admin/Profile');
  };
  const goBackToBallots = () => {
    router.push('/Admin/Ballot/');
  };


  return (

    <Box component="main" sx={{ p: 3 }} style={{ height: 400, width: '100%' }}>

      <Toolbar></Toolbar>


      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        {element}
        <TextField
          margin="normal"
          required
          fullWidth
          id="ballot_closing_date"
          label="ballot_closing_date"
          name="ballot_closing_date"
          autoComplete="ballot_closing_date"
          autoFocus
          defaultValue={ballot.closing_datetime}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="ballot_title"
          label="ballot_title"
          name="ballot_title"
          autoComplete="ballot_title"
          autoFocus
          defaultValue={ballot.title}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Confirm Ballot Update
        </Button>

      </Box>
      <Box>
        <Button onClick={() => goToElections()}>Back to Elections</Button>
        <Button onClick={() => goBackToProfile()}>Back to Profile</Button>
        <Button onClick={() => goBackToBallots()}>Back to Ballots</Button></Box>
    </Box>


  );
}