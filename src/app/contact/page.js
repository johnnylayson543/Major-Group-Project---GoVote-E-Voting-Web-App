'use client'

// Import necessary components and libraries from Material-UI
import * as React from 'react';
import NavBar from '../header/navBar'
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import {blue, green, purple} from '@mui/material/colors';

export default function Page() {

    return (
        <Box component="main" sx={{p: 3}}>
            <NavBar>
            </NavBar>
            <Toolbar>
            </Toolbar>
            <Typography variant="h5" component="h2" fontWeight={800} color={"black"}>
                Contact Us
            </Typography>
            <Typography>
                This is the Contacts page. <br/>
                Should the user have any issues with the website they can use this page to reach a helpline
            </Typography>
        </Box>
        
    );
}




