'use client'

import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Header from '../../components/header/header';
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
  { field: 'device', headerName: 'Device', width: 130, renderCell: (params) => {
    return <a href='/'>view</a>; } }
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
  return (

    <Box component="main" sx={{ p: 3 }} style={{ height: 400, width: '100%' }}>
        <Header></Header>
        <Toolbar></Toolbar>
        <br></br>
        <Grid container spacing={12}>
                <Grid item xs={12}>
                    <Item>
                    <Typography variant="h5" component="h2" fontWeight={800} color={"black"} align='center'>
                        Bulletin Board
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