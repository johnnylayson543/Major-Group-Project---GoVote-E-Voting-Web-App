'use client';
import * as React from 'react';

import NavBar from '../../../header/navBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

global.mongoURL = "mongodb+srv://evote.kyxphj1.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority";

export default function Page() {

  /*
  This function does the actual work
  calling the fetch to get things from the database.
  After the submit handler calls the runDBCallAsync, this does the thing
  */
  async function runDBCallAsync(url) {


    const res = await fetch(url);
    const data = await res.json();

    // If the data fetched and json returned by the route is "valid"
    if(data.data== "valid"){
      console.log("Update is valid!")


    } else {

      console.log("Update is not valid!")
    }
  }


  /*
  This is the submit handler for the e-voting update details page after the button is fired
  When the button is clicked, this is the event that is fired.
  The first thing we need to do is prevent the default refresh of the page.
  */
  const handleSubmit = (event) => {

    console.log("handling submit and update details");


    event.preventDefault();

    const data = new FormData(event.currentTarget);

    let person_ppsn = data.get('ppsn');
    let person_name = data.get('name');
    let person_address = data.get('address');
    let person_phone = data.get('phone');
    let person_email = data.get('email');
    let person_date_of_birth = data.get('dob');
    
    
    
    console.log("Sent person ppsn:" + person_ppsn);
    console.log("Sent person name:" + person_name);
    console.log("Sent person address:" + person_address);
    console.log("Sent person phone:" + person_phone);
    console.log("Sent person email:" + person_email);
    console.log("Sent person date_of_birth:" + person_date_of_birth);
    
    

    // Call this function to pass the data created by the FormData
    runDBCallAsync(`http://localhost:3000/api/general/User/register_user?person_ppsn=${person_ppsn}&person_name=${person_name}
    &person_address=${person_address}&person_phone=${person_phone}&person_email=${person_email}&person_date_of_birth=${person_date_of_birth}`);

  }; // end handler


  // The actual front-end page
  return (

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
            <br></br>
            <NavBar>
            </NavBar>
            <Typography component="h1" variant="h5" fontWeight={800} color={"black"}>
              Update Details
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
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="name"
                  autoFocus
              />
              <TextField
                  margin="normal"
                  fullWidth
                  id="address"
                  label="Address"
                  name="address"
                  autoComplete="address"
                  autoFocus
              />
              <TextField
                  margin="normal"
                  fullWidth
                  id="phone"
                  label="Phone"
                  name="phone"
                  autoComplete="phone"
                  autoFocus
              />
              <TextField
                  margin="normal"
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
              />
              <TextField
                  margin="normal"
                  fullWidth
                  id="dob"
                  label="Date of Birth"
                  name="dob"
                  autoComplete="dob"
                  autoFocus
              />
              <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2}}
              >
                Update Details
              </Button>
            </Box>
          </Box>

        </Container>

  );
}
