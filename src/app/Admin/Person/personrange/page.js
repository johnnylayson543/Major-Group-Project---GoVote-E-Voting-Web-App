'use client';
import * as React from 'react';
import NavBar from "../../../header/navBar";
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
      console.log("Successfully Passed the Range of Person Values!")


    } else {

      console.log("Failed to Pass the Range of Person Values")
    }
  }


  /*
   This is the submit handler for the Person Range page after the button is fired
  When the button is clicked, this is the event that is fired.
  The first thing we need to do is prevent the default refresh of the page.
  */
  const handleSubmit = (event) => {

    console.log("handling submit of person range");


    event.preventDefault();

    const data = new FormData(event.currentTarget);


    let ppsnMin = data.get('ppsnMin')
    let ppsnMax = data.get('ppsnMax')



    console.log("Sent ppsnMin:" + ppsnMin)
    console.log("Sent ppsnMax:" + ppsnMax)


    // Call this function to pass the data created by the FormData
    runDBCallAsync(`http://localhost:3000/api/admin/add_persons_range?ppsnMin=${ppsnMin}&ppsnMax=${ppsnMax}`)


  }; // end handler


// This returns the front-end page
  return (
        <Container component="main" maxWidth="xs">
           <NavBar>
            </NavBar>
            <br></br>
          <CssBaseline />
          <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                border: '4px solid #00008B',
                backgroundColor: '#6F9CDE',
                fontWeight: 500,
                padding: 3
              }}
          >
            <br></br>
            <Typography component="h1" variant="h5" fontWeight={800} color={"black"}>
              Set Person Range
            </Typography>

            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="ppsnMin"
                  label="Minimum PPSN"
                  name="ppsnMin"
                  autoComplete="ppsnMin"
              />
              <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="ppsnMax"
                  label="Maximum PPSN"
                  name="ppsnMax"
                  autoComplete="ppsnMax"
              />
              <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
              >
                Submit Range
              </Button>

            </Box>
          </Box>

        </Container>

  );
}