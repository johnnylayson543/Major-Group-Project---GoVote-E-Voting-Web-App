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
    console.log("remove person from ballot is valid!")



  } else {

    console.log("remove person from ballot is not valid!")
  }
}



export default function Page() {

  const router = useRouter();

  const [ballot, setBallot] = useState(null);
  const [candidate, setCandidate] = useState(null);
  const [candidatePerson, setCandidatePerson] = useState(null);

  useEffect(() => {
    const { searchParams } = new URL(window.location.href);
    const candidate_id = searchParams.get('candidateID');
    console.log("candidateID: " + candidate_id);

    fetch(`http://localhost:3000/api/database/controllers/Admin/Candidate/retrieve_the_candidate?candidateID=${candidate_id}`)
      .then((res) => res.json())
      .then((data) => {
        setCandidate(data.result);

        console.log("Candidate data");
        console.log(data.result);

        data.result;
      });





  }, []);



  useEffect(() => {
    if (candidate !== null && candidate != {}) {
      fetch(`http://localhost:3000/api/database/controllers/Admin/Ballot/retrieve_the_ballot?ballotID=${candidate.ballotID}`)
        .then((res) => res.json())
        .then((data) => {
          setBallot(data.result);

          console.log("Ballot data");
          console.log(data.result);
        });

      fetch(`http://localhost:3000/api/database/controllers/Admin/Candidate/retrieve_selected_person?person_ppsn=${candidate.person_ppsn}`)
        .then((res) => res.json())
        .then((data) => {
          setCandidatePerson(data.result);

          console.log("Candidate Person data");
          console.log(data.result);
        });
    };
  }, [candidate]);



  if (!ballot || !candidate || !candidatePerson) return <Box><p>Please wait while loading. </p></Box>;

  let dataElement1 =
    <tr key={ballot._id.toString()}><td>{ballot._id}</td><td>{ballot.closing_datetime}</td><td>{ballot.title}</td></tr>

    ;
  let dataElement2 =
    <tr key={candidate._id.toString()}><td>{candidate._id}</td><td>{candidate.person_ppsn}</td><td>{candidate.ballotID}</td></tr>

    ;

  let dataElement3 =
    <tr key={candidatePerson._id.toString()}><td>{candidatePerson._id}</td><td>{candidatePerson.name}</td><td>{candidatePerson.address}</td><td>{candidatePerson.email}</td><td>{candidatePerson.phone}</td><td>{candidatePerson.date_of_birth}</td></tr>

    ;
  let element = <Box>
    <h1>Remove Person from the Ballot - End a Candidacy</h1>
    <h2>Ballot of the Candidate</h2>
    <table>
      <thead>
        <tr>
          <th>Ballot ID</th>
          <th>title</th>
          <th>closing date time</th>
        </tr>
      </thead>
      <tbody>
        {dataElement1}
      </tbody></table>
    <h2>Candidate Information</h2>
    <h3>The Candidate</h3>
    <table>
      <thead>
        <tr>
          <th>Candidate ID</th>
          <th>Person PPSN</th>
          <th>BallotID</th>
        </tr>
      </thead>
      <tbody>
        {dataElement2}
      </tbody></table>

    <h3>The Person Information of the Candidate</h3>
    <table>
      <thead>
        <tr>
          <th>PPSN</th>
          <th>Name</th>
          <th>Address</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Date of Birth</th>
        </tr>
      </thead>
      <tbody>
        {dataElement3}
      </tbody></table>

      <p>
            <button onClick={() => goConfirmCandidateRemoval(candidate.person_ppsn, candidate.ballotID)}>Confirm Candidate Removal</button>
            
        </p>

  </Box>

  const goConfirmCandidateRemoval = (person_id, ballot_id) => {
      const url = `/api/database/controllers/Admin/Candidate/remove_person_from_ballot_endCandidate?person_ppsn=${person_id}&ballotID=${ballot_id}`;
      runDBCallAsync(url);
      router.push(`../Candidate?ballotID=${ballot_id}`);
  };
  const handleSubmit = (event) => {

    console.log("handling submit");


    event.preventDefault();

    const data = new FormData(event.currentTarget);


    let person_ppsn = data.get('person_ppsn');

    console.log("Sent person_ppsn:" + person_ppsn);

    // Call this function to pass the data created by the FormData
    // src\app\api\database\controllers\Admin\Ballot\create_ballot
    runDBCallAsync(`http://localhost:3000/api/database/controllers/Admin/Ballot/remove_person_from_ballot_removeCandidate?person_ppsn=${person.ppsn}&ballotIDe=${ballot._id}`);

    goBack(ballot._id);

  }; // end handler


  const goBack = (ballotID) => {
    router.push('/Admin/Candidate/?ballotID={' + ballotID + '}');
  };

  return (

    <Box component="main" sx={{ p: 3 }} style={{ height: 400, width: '100%' }}>

      <Toolbar></Toolbar>
      {element}

    </Box>

  );
}