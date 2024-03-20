'use client';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { green, purple } from '@mui/material/colors';
import { useState, useEffect, useContext } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import { UserAuthentication, UserContext } from '@/app/components/header/userAuthentication';

// WARNING: Still Incomplete, needs candidate page on the MongoDB cloud and still figuring out about the name. 
// This is the most important part of the prototype that needs to be completed asap. some variables here like the ballotID are temporary placeholders

export default function Page() {

  const { user, voter, admin } = useContext(UserContext);
  const [ballot, setBallot] = useState(null);
  const [election, setElection] = useState(null);
  const [candidates_for_ballot, setBallotCandidates] = useState(null);
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


  // If there is no data
  if (!ballot || !election || !candidates_for_ballot || !voter) return <p>Loading</p>
  else {
    console.log("user on page:");
    console.log(user);
    console.log("voter on page:");
    console.log(voter);
    console.log("admin on page:");
    console.log(admin);
  }

  let voterButton;
  if (voter) {
    console.log(voter._id);
    voterButton = <button onClick={() => goBackToSignedUpElections(voter._id)}>Back to My Signed Up Elections</button>;
  }


  let dataElement1 =
    <tr key={ballot._id.toString()}><td>{ballot._id}</td><td>{ballot.closing_datetime}</td><td>{ballot.title}</td></tr>

    ;
  let dataElement2 = (candidates_for_ballot.map(ballot_candidate =>
    <tr key={ballot_candidate._id.toString()}><td>{ballot_candidate._id}</td><td>{ballot_candidate.ballotID}</td><td>{ballot_candidate.person_ppsn}</td><td><button onClick={() => goCastTheVote(voter._id, ballot_candidate._id)}>Vote</button></td></tr>
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
    <ThemeProvider theme={theme}>

      {element}
    </ThemeProvider>
  );
}
