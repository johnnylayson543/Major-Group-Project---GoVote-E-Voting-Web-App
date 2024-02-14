'use client'

import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import NavBar from '../header/navBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';


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
  { field: 'device', headerName: 'Device', width: 130 },
];

// Data Table Rows
const rows = [
  { id: 1, voteCode: '#1234567', device: 'Android'},
  { id: 2, voteCode: '#1234567', device: 'Mac OSX'},
  { id: 3, voteCode: '#1234567', device: 'Windows'},
];

// Front-End Page
export default function Page() {
  return (

    <Box component="main" sx={{ p: 3 }} style={{ height: 400, width: '100%' }}>
        <NavBar></NavBar>
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