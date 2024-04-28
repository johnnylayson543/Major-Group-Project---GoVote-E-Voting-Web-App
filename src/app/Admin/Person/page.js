'use client';
import * as React from 'react';

import Box from '@mui/material/Box';

import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';

/*
After the submit handler calls the runDBCallAsync, this does the thing
This function does the actual work
calling the fetch to get things from the database.
*/
async function runDBCallAsync(url) {

  const res = await fetch(url);
  const data = await res.json();

  if (data.data == "valid") {
    console.log("person is valid!")



  } else {

    console.log("person is not valid!")
  }
}




export default function Page() {

  const router = useRouter();


  //if (!ballots) return <p>No ballots found. </p>;


  let element = <Box>
    <h1>Person Settings</h1>

    <p><Button onClick={() => goSetPersonsPPSNRange()}>Set PPSN range</Button></p>

    <p>
      <Button onClick={() => goBackToProfile()}>Back to Profile</Button>
      <Button onClick={() => goToElections()}>Back to Elections</Button>
      <Button onClick={() => goToBallots()}>Back to Ballots</Button></p>
  </Box>

  const goBackToProfile = () => {
    router.push('/Admin/Profile/');
  };
  const goToElections = () => {
    router.push('/Admin/Election/');
  };

  const goToBallots = () => {
    router.push('/Admin/Ballot/');
  };

  const goSetPersonsPPSNRange = () => {
    router.push('/Admin/Person/SetPersonsPPSNRange/');
  };




  return (

    <>
      {element}
    </>


  );
}