'use client';
import * as React from 'react';

import Box from '@mui/material/Box';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button, Card, FormLabel, Tab, Table, TableBody, TableCell, TableHead, TableRow, Toolbar } from '@mui/material';
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

  const [ballot, setBallot] = useState(null);
  const [election, setElection] = useState(null);
  const [candidates_for_the_ballot, setBallotCandidates] = useState(null);
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
  const goToElections = () => {
    router.push('/Admin/Election/');
  };

  const goBackToBallots = () => {
    router.push('/Admin/Ballot/');
  };

  const confirmElection = (ballot_id) => {

    runDBCallAsync("http://localhost:3000/api/database/controllers/Admin/Election/start_an_election?ballotID={" + ballot_id + "}");

    router.push('/Admin/Election/');
  };

  if (!ballot || !candidates_for_the_ballot) return <p>No ballot or candidates_for_ballot or election found. </p>;

  let dataElement1 = <Card key={ballot._id.toString()} style={{ backgroundColor: objectIdToOKLCH(ballot._id) }} >
    <Table>
      <TableBody>
        <TableRow><TableCell><FormLabel>Closing date:</FormLabel><Tab></Tab>{formatDateTime(ballot.closing_datetime)}</TableCell></TableRow>
        <TableRow><TableCell><FormLabel>Title:</FormLabel><Tab></Tab> {ballot.title}</TableCell></TableRow>
      </TableBody>
    </Table>
  </Card>
    ;
  let dataElement2 = (candidates_for_the_ballot.map(ballot_candidate =>
    <TableRow key={ballot._id.toString()} style={{ backgroundColor: objectIdToOKLCH(ballot_candidate._id) }}><TableCell>{ballot_candidate.person_ppsn}</TableCell></TableRow>
  ));

  let element = <Box>
    <Card>
      <h1>Ballot</h1>
      {dataElement1}
    </Card>
    <Card>
      <h2>Candidates</h2>
      <Table>
        <TableHead><TableRow>
          <th>PPSN</th>
        </TableRow>
        </TableHead>
        <TableBody>
          {dataElement2}
        </TableBody></Table>
    </Card>
    <p>
      <Button onClick={() => confirmElection(ballot._id)}>Confirm the Start of this election</Button>
    </p><p>
      <Button onClick={() => goBackToElections()}>Back to Elections</Button>
      <Button onClick={() => goBackToProfile()}>Back to Profile</Button>
      <Button onClick={() => goBackToBallots()}>Back to Ballots</Button>
    </p>
  </Box>;

  const goBackToElections = () => {
    router.push('/Admin/Election/');
  };
  const goBackToProfile = () => {
    router.push('/Admin/Profile/');
  };
  const goToBallots = () => {
    router.push('/Admin/Ballot/');
  };


  return (

    <Box component="main" sx={{ p: 3 }} style={{ height: 400, width: '100%' }}>

      <Toolbar></Toolbar>
      {element}
    </Box>


  );
}