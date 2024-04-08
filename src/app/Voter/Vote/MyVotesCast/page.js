'use client'
import React, { useContext, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';
import { UserContext } from '@/app/components/header/userAuthentication';
import Layout from '@/app/layout';

export default function Page() {
  const { voter } = useContext(UserContext);
  const [votesCastByTheVoter, setVotesCastByTheVoter] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Replace with your voter ID retrieval logic
    const voter_id = voter?.id || ''; // Add null-check for voter
    fetch(`http://localhost:3000/api/database/controllers/Voter/Vote/retrieve_the_votes_for_the_voter?voterID=${voter_id}`)
      .then((res) => res.json())
      .then((data) => {
        setVotesCastByTheVoter(data.result);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [voter]);

  if (!votesCastByTheVoter) return <Typography>Loading...</Typography>;

  const goSeeCandidate = (candidate_id) => {
    router.push(`/Voter/Vote/SeeCandidate?candidateID=${candidate_id}`);
  };

  const columns = [
    { field: 'id', headerName: 'Vote ID', width: 150 },
    { field: 'voterID', headerName: 'Voter ID', width: 150 },
    { field: 'candidateID', headerName: 'Candidate ID', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => goSeeCandidate(params.row.candidateID)}
        >
          Candidate details
        </Button>
      ),
      width: 180,
    },
  ];

  const rows = votesCastByTheVoter.map((vote) => ({
    id: vote._id,
    voterID: vote.voterID,
    candidateID: vote.candidateID,
  }));

  return (
    <Layout>
        <Typography variant="h5" component="h2" fontWeight={800} color="black" align='center'>
          My Votes Cast
        </Typography>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10]}
          checkboxSelection
        />
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" onClick={() => router.push('/Voter/Election/')}>
            Back to Elections
          </Button>
          <Button variant="contained" sx={{ ml: 2 }} onClick={() => router.push('/Voter/Profile/')}>
            Back to Profile
          </Button>
          {voter && (
            <Button
              variant="contained"
              sx={{ ml: 2 }}
              onClick={() => router.push(`/Voter/Election/SignedUpForElections?voterID=${voter._id}`)}
            >
              Back to My Signed Up Elections
            </Button>
          )}
        </Box>
    </Layout>
  );
}