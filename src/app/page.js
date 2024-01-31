'use client'

import React from 'react';
import NavBar from './/header/navBar'; // Adjust the path based on your project structure
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import {blue, green, purple} from '@mui/material/colors';

import runDBCallAsync from "./login/page"

//login
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';

const Item = ({ children }) => (
    <Box sx={{ border: '4px solid #ddd', padding: 4 }}>
      {children}
    </Box>
  );

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

export default function Page() {


    async function runDBCallAsync(url) {


        const res = await fetch(url);
        const data = await res.json();


        if(data.data== "true"){
            console.log("Successfully Registered!")


        } else {

            console.log("Registration Failed!")
        }
    }

    const handleSubmit = (event) => {

        console.log("handling submit");


        event.preventDefault();

        const data = new FormData(event.currentTarget);


        let ppsn = data.get('ppsn')
        let pass = data.get('pass')



        console.log("Sent ppsn:" + ppsn)
        console.log("Sent pass:" + pass)


        // Call this function to pass the data created by the FormData
        runDBCallAsync(`http://localhost:3000/api/general/register?ppsn=${ppsn}&pass=${pass}`)


    }; // end handler

    return (
// <body background>
        <ThemeProvider theme={theme}>
        <Box component="main" sx={{ p: 3 }}>
            <NavBar/>
            <Toolbar/>
            <Typography variant="h5" component="h2">
            Welcome to GoVote - Ireland's No. 1 E-Voting Website!
            </Typography>
            <Grid container spacing={6}>
                <Grid item xs={8}>
                <Item>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique unde
                fugit veniam eius, perspiciatis sunt? Corporis qui ducimus quibusdam,
                aliquam dolore excepturi quae. Distinctio enim at eligendi perferendis in
                cum quibusdam.
                <br></br>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Mauris et nulla ac eros aliquet suscipit ut quis libero. 
                Sed quam erat, dictum in consequat id, dapibus eu libero.
                </Item>
                </Grid>

                 <Grid item xs={4}>
                 <Item> <Typography component="h1" variant="h5">
                     Login to GoVote
                 </Typography>

                     <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                         <TextField
                             margin="normal"
                             required
                             fullWidth
                             id="ppsn"
                             label="PPSN"
                             name="ppsn"
                             autoComplete="ppsn"
                             autoFocus
                         />
                         <TextField
                             margin="normal"
                             required
                             fullWidth
                             name="pass"
                             label="Password"
                             type="password"
                             id="pass"
                             autoComplete="current-password"
                         />
                         <Button
                             type="submit"
                             fullWidth
                             variant="contained"
                             sx={{ mt: 3, mb: 2 }}
                         >
                             Login
                         </Button>
                         <Grid item>
                             <Link href="./register" variant="body2" textAlign={"center"}>
                                 {"New Here? Register An Account Now!"}
                             </Link>
                         </Grid>
                     </Box>
                 </Item>
                 </Grid>

                 <Grid item xs={8}>
                 <Item>Some Photos go here</Item>
                 </Grid>
            </Grid>
        </Box>
        </ThemeProvider>
    );

}


