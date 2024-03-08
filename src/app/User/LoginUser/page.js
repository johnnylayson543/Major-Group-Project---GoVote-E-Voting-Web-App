'use client';
import * as React from 'react';
import NavBar from "../../header/navBar";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

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
   This is the submit handler for the e-voting register page after the button is fired
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


// This returns the front-end page
  return (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
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
            <NavBar>
            </NavBar>

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
              <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
              />
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2" underline="none" color="inherit">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="./register" variant="body2" underline="none" color="inherit">
                    {"Don't have an account on GoVote? Sign Up to start voting!"}
                  </Link>
                </Grid>
              </Grid>

            </Box>
          </Box>

        </Container>

  );
}