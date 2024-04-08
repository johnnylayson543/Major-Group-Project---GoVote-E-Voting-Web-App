'use client';
import * as React from 'react';

import Box from '@mui/material/Box';
import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/navigation';
import { UserContext } from '@/app/components/header/userAuthentication';
import Layout from '@/app/layout';


export default function Page() {

  const { voter } = useContext(UserContext);
  const [candidateInformation, setCandidateInformation] = useState(null);
  const router = useRouter();
  const candidate_id = router.query.candidateID; // Use Next.js router to get query params

  useEffect(() => {
    if (candidate_id) {
      fetch(`http://localhost:3000/api/database/controllers/Voter/Candidate/retrieve_candidate?candidateID=${encodeURIComponent(candidate_id)}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Network response was not ok');
          }
          return res.json();
        })
        .then((data) => {
          setCandidateInformation(data.result);
        })
        .catch((error) => {
          console.error('Failed to fetch candidate information:', error);
        });
    }
  }, [candidate_id]);

  if (!candidateInformation) return <Typography>No ballot or candidates_for_ballot or election found.</Typography>;

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
    <button onClick={() => goBackToElections()}>Back to Elections</button>
    <button onClick={() => goBackToProfile()}>Back to Profile</button>
    <button onClick={() => goBackToMyVotesCast(voter._id)}>Back to My Votes Cast</button>

  </Box>

  const goBackToElections = () => {
    router.push('/Voter/Election/');
  };
  const goBackToProfile = () => {
    router.push('/Voter/Profile/');
  };

  const goBackToMyVotesCast = (voter_id) => {
    router.push(`/Voter/Vote/MyVotesCast?voterID=${encodeURIComponent(voter_id)}`);
  };


  return (
    <Layout>
        {element}
    </Layout>
  );
}