'use client'
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';



export default function Page() {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/general/getBallot?ballotID=1')
      .then((res) => res.json())
      .then((data) => {
        setCandidates(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  async function runDBCallAsync(url) {
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data.data === "valid") {
        console.log("recast vote is valid!");
      } else {
        console.log("recast vote is not valid!");
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  function recastVote(candidateID, voterID) {
    const url = `http://localhost:3000/api/voter/recastVote?candidateID=${candidateID}&voterID=${voterID}`;
    runDBCallAsync(url);
  }

  if (candidates.length === 0) return <p>Loading...</p>;

  return (
    <>
        <div style={{ fontSize: '40px' }}>Cast Your Vote</div>
        <div>
          {candidates.map((candidate, index) => (
            <div key={index} sx={{ padding: 2 }}>
              Unique ID: {candidate._id}
              <br />
              PPSN: {candidate.ppsn}
              <br />
              CandidateID: {candidate.ballotID}
              <br />
              <Button
                onClick={() => recastVote(candidate.candidateID, candidate.ballotID)}
                variant="outlined"
                color="secondary"
              >
                Update Vote
              </Button>
            </div>
          ))}
        </div>
    </>
  );
}