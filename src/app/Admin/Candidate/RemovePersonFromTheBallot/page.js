'use client';

import Box from '@mui/material/Box';


import { Button, Card, FormLabel, Tab, Table, TableBody, TableCell, TableRow, Toolbar } from '@mui/material';

import { formatDateTime, objectIdToOKLCH } from '@/app/components/helpers';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

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

  let dataElement1 = <Table key={ballot._id.toString()} style={{ backgroundColor: objectIdToOKLCH(ballot._id) }}>
      <TableBody>
        <TableRow><TableCell><FormLabel>Closing date:</FormLabel><Tab></Tab>{formatDateTime(ballot.closing_datetime)}</TableCell></TableRow>
        <TableRow><TableCell><FormLabel>Title:</FormLabel><Tab></Tab> {ballot.title}</TableCell></TableRow>
      </TableBody>
    </Table>
    ;
  let dataElement2 = <Table key={candidate._id.toString()} style={{ backgroundColor: objectIdToOKLCH(candidate._id)}}>
    <TableBody>
      <TableRow><TableCell><FormLabel>Person PPSN:</FormLabel><Tab></Tab>{candidate.person_ppsn}</TableCell></TableRow>
    </TableBody>
  </Table>
    ;

  let dataElement3 = <Table key={candidatePerson._id.toString()} style={{ backgroundColor: objectIdToOKLCH(candidatePerson._id)}}><TableBody>
    <TableRow><TableCell><FormLabel>id:</FormLabel><Tab></Tab>{candidatePerson._id}</TableCell></TableRow>
    <TableRow><TableCell><FormLabel>Name:</FormLabel><Tab></Tab>{candidatePerson.name}</TableCell></TableRow>
    <TableRow><TableCell><FormLabel>Address:</FormLabel><Tab></Tab>{candidatePerson.address}</TableCell></TableRow>
    <TableRow><TableCell><FormLabel>Email:</FormLabel><Tab></Tab>{candidatePerson.email}</TableCell></TableRow>
    <TableRow><TableCell><FormLabel>Phone:</FormLabel><Tab></Tab>{candidatePerson.phone}</TableCell></TableRow>
    <TableRow><TableCell><FormLabel>Date of Birth:</FormLabel><Tab></Tab>{candidatePerson.date_of_birth}</TableCell></TableRow>
    </TableBody></Table>
    ;
  let element = <Card>
    <h1>Remove Person from the Ballot - End a Candidacy</h1>
    <h2>Ballot of the Candidate</h2>

    {dataElement1}

    <Card>
    <h2>Candidate Information</h2>
    <h3>The Candidate</h3>
        {dataElement2}
    </Card>

    <Card>
    <h3>The Person Information of the Candidate</h3>
        {dataElement3}
      </Card>

    <p>
      <Button onClick={() => goConfirmCandidateRemoval(candidate.person_ppsn, candidate.ballotID)}>Confirm Candidate Removal</Button>

    </p>

  </Card>

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
      {element}


      <Box>
        <Button onClick={() => goToElections()}>Back to Elections</Button>
        <Button onClick={() => goBackToProfile()}>Back to Profile</Button>
        <Button onClick={() => goBackToBallots()}>Back to Ballots</Button></Box>
    </Box>

  );
}