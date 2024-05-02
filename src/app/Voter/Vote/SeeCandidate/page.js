'use client';
import * as React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


import { Card, Table, TableBody, TableCell, TableHead, TableRow, Toolbar } from '@mui/material';

import { UserContext } from '@/app/components/header/userAuthentication';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { formatDateTime, objectIdToOKLCH } from '../../../components/helpers';

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
    <TableRow key={candidate_information.ballot._id.toString()} style={{ backgroundColor: objectIdToOKLCH(candidate_information.ballot._id) }}><TableCell>{candidate_information.ballot._id}</TableCell><TableCell>{formatDateTime(candidate_information.ballot.closing_datetime)}</TableCell><TableCell>{candidate_information.ballot.title}</TableCell></TableRow>

    ;
  let dataElement2 =
    <TableRow key={candidate_information.candidate._id.toString()} style={{ backgroundColor: objectIdToOKLCH(candidate_information.candidate._id) }}><TableCell>{candidate_information.candidate._id}</TableCell><TableCell>{candidate_information.candidate.ballotID}</TableCell><TableCell>{candidate_information.candidate.person_ppsn}</TableCell></TableRow>
    ;

  let dataElement3 =
    <TableRow key={candidate_information.election._id} style={{ backgroundColor: objectIdToOKLCH(candidate_information.election._id) }}><TableCell>{candidate_information.election._id}</TableCell><TableCell>{candidate_information.election.ballotID}</TableCell></TableRow>

    ;
  let element = <Box>
    <h1>Candidate associated information</h1>

    <Card>
    <h2>Candidate</h2>
    <svg width="250px" height="50px" xmlns="http://www.w3.org/2000/svg">

      <rect x="5" y="5" width="40" height="40" fill="none" stroke="black" stroke-width="2" />

      <text x="55" y="35" font-family="Arial" font-size="20" fill="black">
        👤 John Doe
      </text>
    </svg>
    <Table>
      <TableHead><TableRow>
        <th>Candidate ID</th>
        <th>Ballot ID</th>
        <th>PPSN</th>
      </TableRow></TableHead>
      <TableBody>
        {dataElement2}
      </TableBody></Table>
      </Card>
      <Card>
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
    <Table>
      <TableHead><TableRow>
        <th>Ballot ID</th>
        <th>Closing Date Time</th>
        <th>Title</th>
      </TableRow></TableHead>
      <TableBody>
        {dataElement1}
      </TableBody></Table>
      </Card>
      <Card>
    <h3>Election Running with this ballot and candidate</h3>

    <Table>
      <TableHead><TableRow>
        <th>Election ID</th>
        <th>Ballot ID</th>
      </TableRow></TableHead>
      <TableBody>
        {dataElement3}
      </TableBody></Table>
      </Card>
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
        {element}
    </>

  );
}