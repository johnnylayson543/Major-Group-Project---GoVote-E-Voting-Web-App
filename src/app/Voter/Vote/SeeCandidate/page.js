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
import { Toolbar } from '@mui/material';

import { useState, useEffect, useContext } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import { UserAuthentication, UserContext } from '../../../components/header/userAuthentication';

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


  const { user, voter, admin } = useContext(UserContext);
  const [votes_cast_by_the_voter, setVotesCastByTheVoter] = useState(null);
  const [candidate_information, setCandidateInformation] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const { searchParams } = new URL(window.location.href);
    const candidate_id = searchParams.get('candidateID');
    fetch(`http://localhost:3000/api/database/controllers/Voter/Candidate/retrieve_candidate?candidateID=${candidate_id}`)
      .then((res) => res.json())
      .then((data) => {
        setCandidateInformation(data.result);

        console.log("Ballot Candidate data")
        console.log(data.result);
      })


  }, []);




  if (!candidate_information) return <p>No ballot or candidates_for_ballot or election found. </p>;

  let dataElement1 =
    <tr key={candidate_information.ballot._id.toString()}><td>{candidate_information.ballot._id}</td><td>{candidate_information.ballot.closing_datetime}</td><td>{candidate_information.ballot.title}</td></tr>

    ;
  let dataElement2 =
    <tr key={candidate_information.candidate._id.toString()}><td>{candidate_information.candidate._id}</td><td>{candidate_information.candidate.ballotID}</td><td>{candidate_information.candidate.person_ppsn}</td></tr>
    ;

  let dataElement3 =
    <tr key={candidate_information.election._id}><td>{candidate_information.election._id}</td><td>{candidate_information.election.ballotID}</td></tr>

    ;
  let element = <Box>
    <h1>Candidate associated information</h1>

    <h2>Candidate</h2>
    <svg width="250px" height="50px" xmlns="http://www.w3.org/2000/svg">

      <rect x="5" y="5" width="40" height="40" fill="none" stroke="black" stroke-width="2" />

      <text x="55" y="35" font-family="Arial" font-size="20" fill="black">
        👤 John Doe
      </text>
    </svg>
    <table>
      <thead><tr>
        <th>Candidate ID</th>
        <th>Ballot ID</th>
        <th>PPSN</th>
      </tr></thead>
      <tbody>
        {dataElement2}
      </tbody></table>
    <h3>Associated Ballot</h3>
    <svg width="200px" height="220px" xmlns="http://www.w3.org/2000/svg" version="1.1">

      <text x="10" y="20" font-family="Verdana" font-size="14" font-weight="bold">Ballot Sheet</text>


      <rect x="10" y="40" width="180" height="30" stroke="black" fill="none" stroke-width="1" />
      <text x="20" y="60" font-family="Verdana" font-size="12">Option A</text>

      <text x="160" y="60" font-family="Verdana" font-size="18" fill="green">&#x2714;</text>


      <rect x="10" y="80" width="180" height="30" stroke="black" fill="none" stroke-width="1" />
      <text x="20" y="100" font-family="Verdana" font-size="12">Option B</text>

      <text x="160" y="100" font-family="Verdana" font-size="18" fill="red">&#x2716;</text>


      <rect x="10" y="120" width="180" height="30" stroke="black" fill="none" stroke-width="1" />
      <text x="20" y="140" font-family="Verdana" font-size="12">Option C</text>

      <text x="160" y="140" font-family="Verdana" font-size="18">&#x2714;</text>


      <rect x="10" y="160" width="180" height="30" stroke="black" fill="none" stroke-width="1" />
      <text x="20" y="180" font-family="Verdana" font-size="12">Option D</text>

      <text x="160" y="180" font-family="Verdana" font-size="18" fill="green">&#x2714;</text>


      <text x="10" y="210" font-family="Verdana" font-size="10">Please review your choices.</text>
    </svg>
    <table>
      <thead><tr>
        <th>Ballot ID</th>
        <th>Closing Date Time</th>
        <th>Title</th>
      </tr></thead>
      <tbody>
        {dataElement1}
      </tbody></table>
    <h3>Election Running with this ballot and candidate</h3>

    <table>
      <thead><tr>
        <th>Election ID</th>
        <th>Ballot ID</th>
      </tr></thead>
      <tbody>
        {dataElement3}
      </tbody></table>
    <p>
      <Button variant="contained" color="primary" onClick={() => goBackToElections()}>
        Back to Elections
      </Button>
    </p>
    <p>
      <Button variant="contained" color="primary" onClick={() => goBackToProfile()}>
        Back to Profile
      </Button>
    </p>
    <Button variant="contained" color="primary" onClick={() => goBackToMyVotesCast(voter._id)}>
      Back to My Votes Cast
    </Button>

  </Box>

  const goBackToElections = () => {
    router.push('/Voter/Election/');
  };
  const goBackToProfile = () => {
    router.push('/Voter/Profile/');
  };


  const goBackToMyVotesCast = (voter_id) => {
    router.push('/Voter/Vote/MyVotesCast?voterID=' + voter_id + '}');
  };


  return (

    <>
      <Box component="main" sx={{ p: 3 }} style={{ height: 400, width: '100%' }}>

        <Toolbar></Toolbar>
        {element}
      </Box>
    </>

  );
}