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
import { Toolbar } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';

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

  const [ballot, setBallot] = useState(null);
  const [election, setElection] = useState(null);
  const [candidates_for_ballot, setBallotCandidates] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const { searchParams } = new URL(window.location.href);
    const ballot_id = searchParams.get('ballotID');
    const election_id = searchParams.get('electionID');
    fetch(`http://localhost:3000/api/database/controllers/Admin/Ballot/retrieve_the_ballot?ballotID=${ballot_id}`)
      .then((res) => res.json())
      .then((data) => {
        setBallot(data.result);

        console.log("Ballot data");
        console.log(data.result);
      })

    fetch(`http://localhost:3000/api/database/controllers/Admin/Election/retrieve_the_election?ballotID=${ballot_id}`)
      .then((res) => res.json())
      .then((data) => {
        setElection(data.result);


        console.log("Election data");
        console.log(data.result);
      })

    fetch(`http://localhost:3000/api/database/controllers/Admin/Candidate/retrieve_candidates_for_the_ballot?ballotID=${ballot_id}`)
      .then((res) => res.json())
      .then((data) => {
        setBallotCandidates(data.result);

        console.log("Ballot Candidates data")
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

  if (!ballot || !candidates_for_ballot || !election) return <Box><p>No ballot or candidates_for_ballot or election found. </p></Box>;

  let dataElement1 =
    <tr key={ballot._id.toString()}><td>{ballot._id}</td><td>{ballot.closing_datetime}</td><td>{ballot.title}</td></tr>

    ;
  let dataElement2 = (candidates_for_ballot.map(ballot_candidate =>
    <tr key={ballot_candidate._id.toString()}><td>{ballot_candidate._id}</td><td>{ballot_candidate.ballotID}</td><td>{ballot_candidate.person_ppsn}</td></tr>
  ));

  let dataElement3 =
    <tr key={election._id}><td>{election._id}</td><td>{election.ballotID}</td></tr>

    ;
  let element = <Box>
    <h1>The Ballot used in the Election</h1>
    <h2>Ballot</h2>
    <table>
      <thead><tr>
        <th>Ballot ID</th>
        <th>Closing Date Time</th>
        <th>Title</th>
      </tr></thead>
      <tbody>
        {dataElement1}
      </tbody></table>
    <h2>Ballot Candidates</h2>
    <table>
      <thead><tr>
        <th>Candidate ID</th>
        <th>Ballot ID</th>
        <th>PPSN</th>
      </tr></thead>
      <tbody>
        {dataElement2}
      </tbody></table>
    <h2>Election Running with this ballot</h2>
    <table>
      <thead><tr>
        <th>Election ID</th>
        <th>Ballot ID</th>
      </tr></thead>
      <tbody>
        {dataElement3}
      </tbody></table>
    <button onClick={() => goBackToElections()}>Back to Elections</button>
    <button onClick={() => goBackToProfile()}>Back to Profile</button>
    <button onClick={() => goBackToBallots()}>Back to Ballots</button>
  </Box>

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
    </Box>


  );
}