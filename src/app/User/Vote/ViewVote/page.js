'use client'

import * as React from 'react';
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


// Front-End Page for the view vote that was elected by the client voter (like a reciept). 
// Currently has placeholder values.
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
                        View Vote
                    </Typography>
                    <Typography variant="h6" component="h4" fontWeight={800} color={"black"} align='center'>
                        #123456
                    </Typography>
                    <Typography variant="h6" component="h2" fontWeight={800} color={"black"} align='center'>
                        Candidate #1
                    </Typography>
                    </Item>
                </Grid>
        </Grid>
    </Box>

  );
}