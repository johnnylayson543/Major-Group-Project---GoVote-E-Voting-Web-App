'use client';
import * as React from 'react';
import React, { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import { UserContext } from '@/app/components/header/userAuthentication';
import Layout from '@/app/layout';

export default function Page() {
  const { voter } = useContext(UserContext);
  const [data, setData] = useState({ ballot: null, election: null, candidates_on_the_ballot: null });
  const router = useRouter();

  //
  // Function for casting the vote and sending the voter to the MyVotesCastPage.
  //
  const goCastTheVote = async (voter_id, candidate_id) => {
    try {
      console.log("CandidateID: " + candidate_id + ", voterID: " + voter_id);
      var url = `http://localhost:3000/api/database/controllers/Voter/Vote/cast_the_vote_for_the_election?candidateID=${candidate_id}&voterID=${voter_id}`;
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        const voter_id = voter._id;
        router.push(`/Voter/Vote/MyVotesCast?voterID=${voter_id}`);
      } else {
        // Handle error case
        console.error('Error casting the vote for the election:', data.error);
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Error casting the vote for the election:', error);
    }


  };



  useEffect(() => {
    const ballot_id = router.query.ballotID; // Use the router to get the ballotID

    if (ballot_id) {
      Promise.all([
        fetch(`http://localhost:3000/api/database/controllers/Admin/Ballot/retrieve_the_ballot?ballotID=${ballot_id}`),
        fetch(`http://localhost:3000/api/database/controllers/Admin/Election/retrieve_the_election?ballotID=${ballot_id}`),
        fetch(`http://localhost:3000/api/database/controllers/Admin/Candidate/retrieve_candidates_for_the_ballot?ballotID=${ballot_id}`),
      ])
      .then(async ([ballotRes, electionRes, candidatesRes]) => {
        if (!ballotRes.ok || !electionRes.ok || !candidatesRes.ok) throw new Error('One or more requests failed');
        const ballot = await ballotRes.json();
        const election = await electionRes.json();
        const candidates = await candidatesRes.json();
        setData({ ballot: ballot.result, election: election.result, candidates: candidates.result });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
    }
  }, [router.query.ballotID]);

  if (!data.ballot || !data.election || !data.candidates) {
    return <Typography>Loading...</Typography>;
  }

  let voterButton;
  if (voter) {
    console.log(voter._id);
    voterButton = <button onClick={() => goBackToSignedUpElections(voter._id)}>Back to My Signed Up Elections</button>;
  }


  let dataElement1 = 
    <tr key={data.ballot._id.toString()}><td>{data.ballot._id}</td><td>{data.ballot.closing_datetime}</td><td>{data.ballot.title}</td></tr>

    ;
  let dataElement2 = (data.candidates_on_the_ballot.map(ballot_candidate =>
    <tr key={ballot_candidate._id.toString()}><td>{ballot_candidate._id}</td><td>{ballot_candidate.ballotID}</td><td>{ballot_candidate.person_ppsn}</td><td><button onClick={() => goCastTheVote(voter._id, ballot_candidate._id)}>Vote</button></td></tr>
  ));

  let dataElement3 =
    <tr key={data.election._id}><td>{data.election._id}</td><td>{data.election.ballotID}</td></tr>

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
    <p>
      <button onClick={() => goBackToElections()}>Back to Elections</button>
      <button onClick={() => goBackToProfile()}>Back to Profile</button>
      {voterButton}
    </p>
  </Box>

  const goBackToElections = () => {
    router.push('/Voter/Election/');
  };
  const goBackToProfile = () => {
    router.push('/Vote/Profile/');
  };
  const goBackToSignedUpElections = (voter_id) => {
    router.push('/Voter/Election/SignedUpForElections?voterID={' + voter_id + '}');
  };


  const theme = createTheme({
    palette: {
      secondary: {
        main: green[500],
      },
    },
  });
  return (
    <>
      {element}
    </>
  );
}
