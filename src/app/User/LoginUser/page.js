'use client';
import * as React from 'react';
import Header from '../../components/header/header';
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
import { useRouter } from 'next/navigation';
import { useState } from 'react'
import Layout from '@/app/layout';

export default function Page() {

  //const { user, voter } = useContext(UserContext);
  const [user, setUser] = useState(null);
  const router = useRouter();
  /*
  This function does the actual work
  calling the fetch to get things from the database.
  After the submit handler calls the runDBCallAsync, this does the thing
  */
  async function runDBCallAsync(url) {

    const res = await fetch(url);
    const data = await res.json();

    setUser(data.result);

    console.log("Data and data result: ");
    console.log(data);
    console.log(data.result);
    if (data.data == "Okay") {
      console.log("Successfully Registered!");
    } else {
      console.log("Registration Failed!");
    }
  }

  const goToAdminProfilePage = () => {
    router.push('/Admin/Profile/');
  };
  const goToUserProfilePage = () => {
    router.push('/User/Profile/');
  };

  const goToVoterProfilePage = () => {
    router.push('/Voter/Profile/');
  };


  /*
   This is the submit handler for the e-voting register page after the button is fired
  When the button is clicked, this is the event that is fired.
  The first thing we need to do is prevent the default refresh of the page.
  */
  const handleSubmit = async (event) => {

    console.log("handling submit");
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let ppsn = data.get('ppsn')
    let pass = data.get('pass')
    console.log("Sent ppsn:" + ppsn)
    console.log("Sent pass:" + pass)

    // Call this function to pass the data created by the FormData
    await runDBCallAsync(`http://localhost:3000/api/database/controllers/User/login_user/?ppsn=${ppsn}&pass=${pass}`)


  }; // end handler


  if (user) {
    const user_roles = user.roles;
    if (user_roles.filter(role => role == 'user')) {
      goToUserProfilePage();
    }
  }

  // Using a function component for Grid item to avoid duplication
  const Item = ({ children, xs }) => (
    <Grid item xs={xs}>
        <Box sx={{ border: '4px solid #00008B', padding: 3, backgroundColor: '#e9ecef', fontWeight: 500 }}>
            {children}
        </Box>
    </Grid>
  );

  // This returns the front-end page
  return (
    <>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 8, display: 'flex', alignItems: 'center' }}>
        <Grid container spacing={2}>
          <Item xs={12}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}></Avatar>

            <Typography component="h1" variant="h5" fontWeight={800} color={"black"}>
                Login to GoVote
            </Typography>
          </Item>
          <Item xs={12}>
            
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
          </Item>
          <Item xs={12}>
              <Link href="#" variant="body2" underline="none" color="inherit">
                  Forgot password?
              </Link>
              <br></br>
              <Link href="./register" variant="body2" underline="none" color="inherit">
                  {"Don't have an account on GoVote? Sign Up to start voting!"}
              </Link>
          </Item>
        </Grid>

      </Box>
        

    </>
  );
}