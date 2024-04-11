'use client';
import * as React from 'react';

import Box from '@mui/material/Box';

import { useState, useEffect, useContext } from 'react'
import { UserContext } from '@/app/components/header/userAuthentication';
import { useRouter } from 'next/navigation';
import Layout from '@/app/layout';

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

  const { user, voter } = useContext(UserContext);
  const [ballot, setBallot] = useState(null);
  const [election, setElection] = useState(null);
  const [candidates_for_ballot, setBallotCandidates] = useState(null);
  const [tally_for_the_election, setTallyForElection] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const { searchParams } = new URL(window.location.href);
    const ballot_id = searchParams.get('ballotID');
    const election_id = searchParams.get('electionID');



    fetch(`http://localhost:3000/api/database/controllers/Admin/Election/retrieve_the_election?ballotID=${ballot_id}`)
      .then((res) => res.json())
      .then((data) => {
        setElection(data.result);


        console.log("Election data");
        console.log(data.result);
      })



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
    // src\app\api\database\controllers\Teller\Election\Vote\retrieve_the_tally_for_the_election
    fetch(`http://localhost:3000/api/database/controllers/Teller/Election/Vote/retrieve_the_tally_for_the_election?electionID=${election_id}`)
      .then((res) => res.json())
      .then((data) => {
        setTallyForElection(data.result);

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
    router.push('/Voter/Profile/');
  };

  if (!ballot || !candidates_for_ballot || !election || !voter || !tally_for_the_election) return <p>No ballot or candidates_for_ballot or election found. </p>;


  let voterButton;
  if (voter) {
    console.log(voter._id);
    voterButton = <button onClick={() => goBackToSignedUpElections(voter._id)}>Back to My Signed Up Elections</button>;
  }

  let dataElement1 =
    <tr key={ballot._id.toString()}><td>{ballot._id}</td><td>{ballot.closing_datetime}</td><td>{ballot.title}</td></tr>

    ;
  let dataElement2 = (candidates_for_ballot.map(ballot_candidate =>
    <tr key={ballot_candidate._id.toString()}><td>{ballot_candidate._id}</td><td>{ballot_candidate.ballotID}</td><td>{ballot_candidate.person_ppsn}</td></tr>
  ));

  let dataElement3 =
    <tr key={election._id}><td>{election._id}</td><td>{election.ballotID}</td></tr>

    ;

  let dataElement4 =
    <tr key={tally_for_the_election._id}><td>{tally_for_the_election._id}</td><td>{tally_for_the_election.electionID}</td>
      <td>{tally_for_the_election.tally.map(x => <div key={x._id} ><p>CandidateID: {x.candidateID}</p><p>Count: {x.count}</p></div>)}</td></tr>

    ;
  let element = <Box>
    <h1>Tally for this election</h1>
    <table>
      <thead><tr>
        <th>Election ID</th>
        <th>Ballot ID</th>
      </tr></thead>
      <tbody>
        {dataElement4}
      </tbody></table>
    <p>
      <button onClick={() => goBackToTalliedElections()}>Back to Tallied Elections</button>
      <button onClick={() => goBackToFinishedElections()}>Back to the finished elections</button>
      <button onClick={() => goBackToProfile()}>Back to the teller profile</button>

    </p>

    <hr />
    <details>
      <summary>Click for the details of the Ballot, Election, and Candidates</summary>
      <h1>The Ballot and other details</h1>
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
          <th>Tally ID</th>
          <th>Election ID</th>
          <th>The Tally</th>
        </tr></thead>
        <tbody>
          {dataElement3}
        </tbody></table>
    </details>
  </Box>



  const goBackToTalliedElections = () => {
    router.push('/Teller/Election/Vote');
  };
  const goBackToProfile = () => {
    router.push('/Teller/Profile/');
  };
  const goBackToFinishedElections = (voter_id) => {
    router.push('/Teller/Election/');
  };

  return (
    <>
      <Box component="main" sx={{ p: 3 }} style={{ height: 400, width: '100%' }}>
        {element}
      </Box>
    </>

  );
}