'use client';
import * as React from 'react';

import Box from '@mui/material/Box';

import { useState, useEffect, useContext } from 'react'
import { UserContext } from '@/app/components/header/userAuthentication';
import { useRouter } from 'next/navigation';
import { Button, Card, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { formatDateTime, objectIdToOKLCH } from '@/app/components/helpers';



export default function Page() {

  const { voter } = useContext(UserContext);
  const [ballot, setBallot] = useState(null);
  const [election, setElection] = useState(null);
  const [candidates_for_ballot, setBallotCandidates] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const { searchParams } = new URL(window.location.href);
    const ballot_id = searchParams.get('ballotID');




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



  const goBack = () => {
    router.push('/Voter/Profile/');
  };

  if (!ballot || !candidates_for_ballot || !election || !voter) return <Box><p>No ballot or candidates_for_ballot or election found. </p></Box>;


  let voterButton;
  if (voter) {
    console.log(voter._id);
    voterButton = <Button onClick={() => goBackToSignedUpElections(voter._id)}>Back to My Signed Up Elections</Button>;
  }

  let dataElement1 =
    <TableRow key={ballot._id.toString()} style={{backgroundColor: objectIdToOKLCH(ballot._id)}}><TableCell>{ballot._id}</TableCell><TableCell>{formatDateTime(ballot.closing_datetime)}</TableCell><TableCell>{ballot.title}</TableCell></TableRow>

    ;
  let dataElement2 = (candidates_for_ballot.map(ballot_candidate =>
    <TableRow key={ballot_candidate._id.toString()} style={{backgroundColor: objectIdToOKLCH(ballot_candidate._id)}}><TableCell>{ballot_candidate._id}</TableCell><TableCell>{ballot_candidate.ballotID}</TableCell><TableCell>{ballot_candidate.person_ppsn}</TableCell></TableRow>
  ));

  let dataElement3 =
    <TableRow key={election._id} style={{backgroundColor: objectIdToOKLCH(election._id)}}><TableCell>{election._id}</TableCell><TableCell>{election.ballotID}</TableCell></TableRow>

    ;
  let element = <Box>
    <h1>The Ballot used in the Election</h1>

    <Card>
    <h2>Ballot</h2>
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
    <h2>Ballot Candidates</h2>
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
    <h2>Election Running with this ballot</h2>
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
      <Button onClick={() => goBackToElections()}>Back to Elections</Button>
      <Button onClick={() => goBackToProfile()}>Back to Profile</Button>
      {voterButton}
    </p>
  </Box>



  const goBackToElections = () => {
    router.push('/Voter/Election/');
  };
  const goBackToProfile = () => {
    router.push('/Voter/Profile/');
  };
  const goBackToSignedUpElections = (voter_id) => {
    router.push('/Voter/Election/SignedUpForElections?voterID={' + voter_id + '}');
  };

  return (
    <>
        {element}
    </>

  );
}