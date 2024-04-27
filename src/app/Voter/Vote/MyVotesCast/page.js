'use client'

import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Header from '../../../components/header/header';
import { useState, useEffect, useContext } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import { UserAuthentication, UserContext } from '../../../components/header/userAuthentication';


// Setting the Item and children for the Grid and its properties
const Item = ({ children }) => (
    <Box sx={{ border: '4px solid #00008B', padding: 3 , backgroundColor: '#6F9CDE' , fontWeight: 500 }}>
      {children}
    </Box>
);

// Data Table Columns 
const columns = [
  { field: 'id', headerName: 'Poll', width: 70 },
  { field: 'voteCode', headerName: 'Vote Code', width: 130 },
  { field: 'device', headerName: 'Device', width: 130 , renderCell: (params) => {
    return <a href='${params.id}'>{params.id}</a>; } }
];

// Data Table Rows (Note: the free version is limited to 100 rows, you have to pay to add more rows)
// These are placeholder values
const rows = [
  { id: 1, voteCode: '#1234567', device: ''},
  { id: 2, voteCode: '#1234567', device: ''},
  { id: 3, voteCode: '#1234567', device: ''},
];

// Front-End Page
export default function Page() {
  const { user, voter, admin } = useContext(UserContext);
  const [ votes_cast_by_the_voter, setVotesCastByTheVoter] = useState(null);
  const router = useRouter();


  useEffect(() => {
    const { searchParams } = new URL(window.location.href);
    const voter_id = searchParams.get('voterID');

    fetch(`http://localhost:3000/api/database/controllers/Voter/Vote/retrieve_the_votes_for_the_voter?voterID=${voter_id}`)
      .then((res) => res.json())
      .then((data) => {
        setVotesCastByTheVoter(data.result);

        console.log("Votes Cast for the elections the voter cast them in data:");
        console.log(data.result);
      });   

  }, []);

   // If there is no data
   if (!votes_cast_by_the_voter || !voter) return <p>Loading</p>
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

  let dataElement1 = (votes_cast_by_the_voter.map( (vote) =>
    <tr key={vote._id.toString()}><td>{vote._id}</td><td>{vote.voterID}</td><td>{vote.candidateID}</td><td><button onClick={() => goSeeCandidate(vote.candidateID)}>Candidate details</button></td></tr>
  ));

  let element = <Box>
    <h1>The Votes cast on elections</h1>
    <h2>Votes Cast</h2>
    <table>
      <thead><tr>
        <th>Vote ID</th>
        <th>Voter ID</th>
        <th>Candidate ID</th>
        <th>Actions</th>
      </tr></thead>
      <tbody>
        {dataElement1}
      </tbody></table>
   
    <p>
      <button onClick={() => goBackToElections()}>Back to Elections</button>
      <button onClick={() => goBackToProfile()}>Back to Profile</button>
      {voterButton}
    </p>
  </Box>

  const goSeeCandidate = (candidate_id) => {
    router.push('/Voter/Vote/SeeCandidate?candidateID={' + candidate_id + '}' );
  };

  const goBackToElections = () => {
    router.push('/Voter/Election/');
  };
  const goBackToProfile = () => {
    router.push('/Voter/Profile/');
  };
  const goBackToSignedUpElections = (voter_id) => {
    router.push('/Voter/Election/SignedUpForElections?voterID={' + voter_id + '}');
  };


  const other_element = <Grid container spacing={12}>
  <Grid item xs={12}>
      <Item>
      <Typography variant="h5" component="h2" fontWeight={800} color={"black"} align='center'>
          My Votes Cast
      </Typography>
      <br></br>
          <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
              pagination: {
              paginationModel: { page: 0, pageSize: 5 },
              },
          }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
          />
      </Item>
  </Grid>
</Grid>

  return (

    <Box component="main" sx={{ p: 3 }} style={{ height: 400, width: '100%' }}>
        <Header></Header>
        <Toolbar></Toolbar>
        <br></br>
        {element}
    </Box>

  );
}