'use client';
import * as React from 'react';

import Box from '@mui/material/Box';
import Chart from 'chart.js/auto'; // Add this line
import Header from '../../components/header/header';

import Script from 'next/script'
import { useState, useEffect } from 'react'
import { Toolbar } from '@mui/material';
import { useRouter } from 'next/navigation';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

/*
After the submit handler calls the runDBCallAsync, this does the thing
This function does the actual work
calling the fetch to get things from the database.
*/
async function runDBCallAsync(url) {


  await fetch(url)
    .then((res) => res.json())
    .then((data) => {
      setData(data.result);

      console.log("Requested Data:");
      console.log(data.result);
    })
}




export default function Page() {

  const [data, setData] = useState(null);
  const [ballot, setBallot] = useState(null);
  const [ballot_candidates, setBallotCandidates] = useState(null);
  const [person_suggested, setPersonSuggested] = useState(null);
  const router = useRouter();

  let warning1;

  const handleSubmit = (event) => {

    console.log("handling submit");



    event.preventDefault();

    const data = new FormData(event.currentTarget);


    let person_ppsn = data.get('person_ppsn');

    console.log("Sent person ppsn:" + person_ppsn);
    let url_person_confirm = `http://localhost:3000/api/database/controllers/Admin/Person/confirm_person_exists_on_the_system/?person_ppsn=${person_ppsn}`;
    //runDBCallAsync(url_person_confirm);

    //useEffect(() => {
    setPersonSuggested(data);
    fetch(url_person_confirm)
      .then((res) => res.json())
      .then((data) => {
        setPersonSuggested(data.result);
        console.log("Person Suggested data")
        console.log(data.result);
        console.log(person_suggested);

      })
    //}, []);

  }; // end handler




  useEffect(() => {
    const { searchParams } = new URL(window.location.href);
    const ballot_id = searchParams.get('ballotID');
    fetch(`http://localhost:3000/api/database/controllers/Admin/Ballot/retrieve_the_ballot/?ballotID=${ballot_id}`)
      .then((res) => res.json())
      .then((data) => {
        setBallot(data.result);

        console.log("Ballot data")
        console.log(data.result);
      })

    fetch(`http://localhost:3000/api/database/controllers/Admin/Candidate/retrieve_candidates_for_the_ballot?ballotID=${ballot_id}`)
      .then((res) => res.json())
      .then((data) => {
        setBallotCandidates(data.result);

        console.log("Candidate data")
        console.log(data.result);
      })
  }, []);

  if ((!ballot || !ballot_candidates)) return <p>No ballot or candidate found. </p>;

  console.log(ballot);

  const getPersons = () => { };

  let dataElement1 =
    <tr key={ballot._id}><td>{ballot._id}</td><td>{ballot.closing_datetime}</td><td>{ballot.title}</td></tr>

    ;
  let dataElement2 = (ballot_candidates.map(ballot_candidate =>
    <tr key={ballot_candidate._id.toString()}><td>{ballot_candidate._id}</td><td>{ballot_candidate.ballotID}</td><td>{ballot_candidate.person_ppsn}</td><td><button onClick={() => goRemoveBallot(ballot._id.toString())}>Remove</button></td></tr>
  ));
  let element = <Box>
    <h1>Candidates on the ballot</h1>
    <h2>Ballot</h2>
    <table>
      <thead><tr>
        <th>ID</th>
        <th>Closing Date and Time</th>
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
        <th>Person PPSN</th>
        <th>Actions</th>
      </tr></thead>
      <tbody>
        {dataElement2}
      </tbody></table>
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="person_ppsn"
        label="person_ppsn"
        name="person_ppsn"
        autoComplete="person_ppsn"
        autoFocus
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Add Person to the Ballot
      </Button>

    </Box>


    <p>
      <button onClick={() => goBackToElections()}>Back to Elections</button>
      <button onClick={() => goBackToProfile()}>Back to Profile</button>
      <button onClick={() => goToBallots()}>Back to Ballots</button></p>
  </Box>
  const goBackToElections = () => {
    router.push('/Admin/Election/');
  };

  const goBackToBallotCandidates = (ballotID) => {
    router.push('/Admin/Candidate/?ballotID={' + ballotID + '}');
  };
  const goBackToProfile = () => {
    router.push('/Admin/Profile/');
  };
  const goToBallots = () => {
    router.push('/Admin/Ballot/');
  };

  const goToAddPersonToTheBallot = (ballotID, personPPSN) => {
    router.push('/Admin/Candidate/AddPersonToTheBallot/?ballotID={' + ballotID + '}&person_ppsn={' + personPPSN + '}');
  }


  const goAddCandidate = (ballotID) => {
    router.push('/Admin/Candidate/AddPersonToBallot/?ballotID={' + ballotID + '}');
  };

  const goRemoveBallot = (ballotID) => {
    router.push('/Admin/Ballot/RemoveBallot/?ballotID={' + ballotID + '}');
  };

  const goCreateBallot = () => {
    router.push('/Admin/Ballot/CreateBallot');
  };

  const goManageCandidates = (ballotID) => {
    router.push('/Admin/Candidates/?ballotID={' + ballotID + '}');
  };

  if (person_suggested && person_suggested != {} && person_suggested.ppsn) {
    console.log(person_suggested);
    goToAddPersonToTheBallot(ballot._id, person_suggested.ppsn);
  } else if (person_suggested == {}) {
    warning1 = <Box><p>No such person exists on this system. </p></Box>;
  } else if (person_suggested && person_suggested != {}) {
    warning1 = <Box><p>System error. </p></Box>
  }



  return (

    <Box component="main" sx={{ p: 3 }} style={{ height: 400, width: '100%' }}>

      <Toolbar></Toolbar>
      {element}
      {warning1}
    </Box>


  );
}