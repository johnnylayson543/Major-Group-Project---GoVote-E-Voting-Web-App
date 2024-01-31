'use client'
import * as React from 'react';
import NavBar from '../header/navBar'
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import {blue, green, purple} from '@mui/material/colors';

export default function Page() {

    //Theme Provider
    const theme = createTheme({
        palette: {
            background: {
                default: "#c2c2a3"
            },
            secondary: {
                main: green[500],
            },
            /* to change text white
            text: {
              primary: '#ffffff',
            },
           */
        }
    });

    return (
        <ThemeProvider theme={theme}>
        <Box component="main" sx={{ p: 3 }}>
            <NavBar/>
            <Toolbar/>
            <Typography variant="h5" component="h2">
            About GoVote
            </Typography>
            <Typography>
                This is the About Page <br/>
                This page will explain the motivation and functionality of the page.
            </Typography>
        </Box>
        </ThemeProvider>
    );
}

