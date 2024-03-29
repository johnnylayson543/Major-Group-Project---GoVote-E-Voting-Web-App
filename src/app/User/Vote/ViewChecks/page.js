'use client'

import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Header from '../../../components/header/header';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CheckIcon from '@mui/icons-material/Check';


// Setting the Item and children for the Grid and its properties
const Item = ({ children }) => (
    <Box sx={{ border: '4px solid #00008B', padding: 3 , backgroundColor: '#6F9CDE' , fontWeight: 500 }}>
      {children}
    </Box>
);

// Data Table Columns (the Device ID part will change so it is not final at the moment)
const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'voteCode', headerName: 'Vote Code', width: 130 },
  { field: 'deviceid', headerName: 'Device ID', width: 130 , renderCell: (params) => {
    return <a href='${params.id}'>{params.id}</a>; } }
];

// Data Table Rows (Note: the free version is limited to 100 rows, you have to pay to add more rows)
// These are placeholder values and is not final (especially the Device ID part)
const rows = [
  { id: 1, voteCode: '#1234567', deviceid: ''},
  { id: 2, voteCode: '#1234567', deviceid: ''},
  { id: 3, voteCode: '#1234567', deviceid: ''},
];

// Front-End Page for the view check that allows the admin or teller to check and see the voters. 
// Currently has placeholder values and is not final.
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
                        View Checks
                    </Typography>
                    <Typography variant="h6" component="h4" fontWeight={800} color={"black"} align='center'>
                        Votes Talled: Votes / Total
                    </Typography>
                    <br></br>
                    <br></br>
                    <Typography variant="h5" component="h2" fontWeight={800} color={"black"} align='center'>
                        Poll #1
                    </Typography>
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
                <Grid item xs={3}>
                    <Item>
                    <ListItemButton sx={{ backgroundColor: 'blue', color: 'white' , mb: 0.2 }} href='#' align ='center'>
                        <ListItemIcon>
                            <CheckIcon sx={{ color: 'white' }}></CheckIcon>
                        </ListItemIcon>
                        <ListItemText primary="Re-Check"/>
                    </ListItemButton>
                    </Item>
                </Grid>
        </Grid>
        
    </Box>

  );
}