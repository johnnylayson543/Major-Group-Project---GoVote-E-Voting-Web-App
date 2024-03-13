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
  { field: 'id', headerName: 'ID', width: 130 },
  { field: 'candidate', headerName: 'Candidate', width: 200 },
  { field: 'count', headerName: 'Count', width: 130 },
  { field: 'share', headerName: 'Share', width: 130 }
];

// Data Table Rows (Note: the free version is limited to 100 rows, you have to pay to add more rows)
// These are placeholder values
const rows = [
  { id: 1, candidate: 'John Layson', count: '66', share: '67'},
  { id: 2, candidate: 'Adam OShea', count: '88', share: '99'},
  { id: 3, candidate: 'Emmanuel Ojomo-Amaka', count: '234', share: '457'}
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
                        View Results
                    </Typography>
                    <Typography variant="h6" component="h4" fontWeight={800} color={"black"} align='center'>
                        Poll #1
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