'use client'
import * as React from 'react';
import NavBar from '../header/navBar'
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function Page() {


    return (
        
        <Box component="main" sx={{ p: 3 }}>
            <NavBar></NavBar>
            <Toolbar></Toolbar>
            <Typography variant="h5" component="h2" fontWeight={800} color={"black"}>
            About GoVote
            </Typography>
            <Typography>
                This is the About Page <br/>
                This page will explain the motivation and functionality of the page.
            </Typography>
        </Box>
        
    );
}

