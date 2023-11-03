'use client';
import * as React from 'react';
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
import {ThemeProvider } from '@mui/material/styles';

import { createTheme } from '@mui/material/styles';
import { green, purple } from '@mui/material/colors';


export default function Page() {



  /*
  This function does the actual work
  calling the fetch to get things from the database.
  */ 
  async function runDBCallAsync(url) {


    const res = await fetch(url);
    const data = await res.json();

 
    if(data.data== "valid"){
      console.log("login is valid!")

      
    } else {

      console.log("not valid  ")
    }
  }


  /*

  When the button is clicked, this is the event that is fired.
  The first thing we need to do is prevent the default refresh of the page.
  */
	const handleSubmit = (event) => {
		
		console.log("handling submit voting registration");


    event.preventDefault();
  
		const data = new FormData(event.currentTarget);

    let name = data.get('name')
    let address = data.get('address')
    let email = data.get('email')
		let pass = data.get('pass')
    let dateofbirth = data.get('dateofbirth')
    let ppsn = data.get('ppsn')
    let phone = data.get('phone')
  

    console.log("Sent name:" + name)
    console.log("Sent address:" + address)
    console.log("Sent email:" + email)
    console.log("Sent pass:" + pass)
    console.log("Sent date of birth:" + dateofbirth)
    console.log("Sent ppsn" + ppsn)
    console.log("Sent phone" + phone)


    runDBCallAsync(`http://localhost:3000/api/register?name=${name}&address=${address}&email=${email}pass=${pass}dateofbirth=${dateofbirth}ppsn=${ppsn}phone=${phone}`)




  }; // end handler submit for voting registration




  
  const theme = createTheme({
    palette: {
     
      secondary: {
        main: green[500],
      },
    },
  });
  



  
  return (
    <ThemeProvider theme={theme}>
    <Container component="main"  maxWidth="xs">
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
        <Typography component="h1" variant="h5">
          Create An Account
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
            margin="normal"
            required
            fullWidth
            id="Name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="Address"
            label="Address"
            name="address"
            autoComplete="address"
            autoFocus
          />
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
            name="pass"
            label="Pass"
            type="pass"
            id="pass"
            autoComplete="current-password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="Date Of Birth"
            label="Date Of Birth"
            name="dateofbirth"
            autoComplete="date-of-birth"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="PPSN"
            label="PPSN"
            name="ppsn"
            autoComplete="ppsn"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="Phone"
            label="Phone"
            name="phone"
            autoComplete="phone"
            autoFocus
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Create Account
          </Button>

        </Box>
      </Box>

    </Container>

    </ThemeProvider>

  );
}