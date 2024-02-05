'use client'

import React from 'react';
import NavBar from './/header/navBar'; // Adjust the path based on your project structure
import Avatar from '@mui/material/Avatar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import {blue, green, purple} from '@mui/material/colors';
import Link from '@mui/material/Link';
import runDBCallAsync from "./login/page"
//login
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


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

    // Setting the Item and children for the Grid and its properties
    const Item = ({ children }) => (
        <Box sx={{ border: '3px solid #ddd', padding: 3 }}>
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
        }
    });

    return (
// <body background>
        <ThemeProvider theme={theme}>
        <Box component="main" sx={{ p: 3 }}>
            <NavBar>
            </NavBar>
            <Toolbar/>
            <Typography variant="h5" component="h2" fontWeight={600} color={"black"}>
            Welcome to GoVote - Ireland's No. 1 E-Voting Website!
            </Typography>
            <Grid container spacing={1}>
                
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

                 <Grid item xs={3}>
                 <Item>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}></Avatar> 
                    <Typography component="h1" variant="h5" fontWeight={600} color={"black"}>
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

                 <Grid item xs={6}>
                 <Item>Some Photos go here</Item>
                 </Grid>
            </Grid>
        </Box>
        </ThemeProvider>
    );

}


