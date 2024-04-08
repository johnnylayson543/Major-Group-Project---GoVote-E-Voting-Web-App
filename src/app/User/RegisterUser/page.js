'use client';
import * as React from 'react';

import Header from '../../components/header/header';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Layout from '@/app/layout';

export default function Register_UserPage() {

  /*
  This function does the actual work
  calling the fetch to get things from the database.
  After the submit handler calls the runDBCallAsync, this does the thing
  */
  async function runDBCallAsync(url) {


    const res = await fetch(url);
    const data = await res.json();

    // If the data fetched and json returned by the route is "valid"
    if (data.data == "valid") {
      console.log("Login is valid!")


    } else {

      console.log("Login is not valid!")
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


    let person_email = data.get('email');
    let person_date_of_birth = data.get('dob');
    let user_ppsn = data.get('ppsn');
    let user_pass = data.get('pass');

    console.log("Sent email:" + person_email);
    console.log("Sent dob:" + person_date_of_birth);
    console.log("Sent date of ppsn:" + user_ppsn);
    console.log("Sent pass:" + user_pass);

    // Call this function to pass the data created by the FormData
    runDBCallAsync(`http://localhost:3000/api/database/controllers/User/register_user?person_email=${person_email}&person_date_of_birth=${person_date_of_birth}&user_ppsn=${user_ppsn}&user_pass=${user_pass}`);

  }; // end handler


  // The actual front-end page
  return (
    <Layout>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',

        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>

        </Avatar>
        <Header>
        </Header>
        <Typography component="h1" variant="h5" fontWeight={800} color={"black"}>
          Register Your GoVote Account
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="dob"
            label="Date of Birth"
            name="dob"
            autoComplete="date-of-birth"
            autoFocus
          />
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
            label="Pass"
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
            Register
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="./login" variant="body2" underline="none" color="inherit">
                Already Registered? Login to GoVote
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>

    </Layout>

  );
}
