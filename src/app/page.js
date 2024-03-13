'use client'

import React from 'react';
import Header from './components/header/header';
import Avatar from '@mui/material/Avatar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import runDBCallAsync from "./User/LoginUser/page"
//login
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';


export default function Page() {

    /*
    This function does the actual work
    calling the fetch to get things from the database.
    After the submit handler calls the runDBCallAsync, this does the thing
    */
    async function runDBCallAsync(url) {


        const res = await fetch(url);
        const data = await res.json();


        if(data.data== "true"){
            console.log("Successfully Registered!")


        } else {

            console.log("Registration Failed!")
        }
    }

    /*
    This is the submit handler for the e-voting login page after the button is fired
    When the button is clicked, this is the event that is fired.
    The first thing we need to do is prevent the default refresh of the page.
  */
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
        <Box sx={{ border: '4px solid #00008B', padding: 3 , backgroundColor: '#6F9CDE' , fontWeight: 500 }}>
          {children}
        </Box>
    );


    return (
// <body background>
        <Box component="main" sx={{ p: 3 }}>
            <Header>
            </Header>
            <Toolbar>
            </Toolbar>
            <br></br>
            <Typography variant="h5" component="h2" fontWeight={800} color={"black"}>
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
                    <Typography component="h1" variant="h5" fontWeight={800} color={"black"}>
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
                             <Link href="./register" variant="body2" textAlign={"center"} underline="none" color="inherit">
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
    );

}


