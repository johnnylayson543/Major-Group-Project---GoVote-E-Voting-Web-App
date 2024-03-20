'use client'

import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Header from '@/app/components/header/header';
import { useState, useEffect, useContext } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import { UserAuthentication, UserContext } from '@/app/components/header/userAuthentication';


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
  const [ vote_cast_by_the_voter, setVotesCastByTheVoter] = useState(null);
  const router = useRouter();


  useEffect(() => {
    const voter_id = voter._id;

    fetch(`http://localhost:3000/api/database/controllers/Admin/Ballot/retrieve_the_cast_votes_for_the_elections_the_cast_them_in?voterID=${voter_id}`)
      .then((res) => res.json())
      .then((data) => {
        setVotesCastByTheVoter(data.result);

        console.log("Votes Cast for the elections the voter cast them in data:");
        console.log(data.result);
      });   

  }, []);


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



  return (

    <Box component="main" sx={{ p: 3 }} style={{ height: 400, width: '100%' }}>
        <Header></Header>
        <Toolbar></Toolbar>
        <br></br>
        <Grid container spacing={12}>
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
    </Box>

  );
}