'use client';
import * as React from 'react';

import NavBar from '../components/header/navBar';
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

import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'dayjs/locale/en-gb';



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
      console.log("Date is valid!")


    } else {

      console.log("Date is not valid!")
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


    let dob = data.get('dob');
    
    console.log("Sent dob:" + dob);
    

    // Call this function to pass the data created by the FormData
    // runDBCallAsync(`http://localhost:3000/api/general/User/register_user?person_email=${person_email}&person_date_of_birth=${person_date_of_birth}&user_ppsn=${user_ppsn}&user_pass=${user_pass}`);

  }; // end handler


  // Setting Values for the Date Picker
  const [value, setValue] = React.useState(null);

  // Setting the Item and children for the Grid and its properties
  const Item = ({ children }) => (
    <Box sx={{ border: '4px solid #00008B', padding: 3 , backgroundColor: '#6F9CDE' , fontWeight: 500 }}>
      {children}
    </Box>
   );

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // The actual front-end page (still under construction - time could be added)
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
            <NavBar>
            </NavBar>

            <br></br>

            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <Grid container spacing={12}>
                    <Grid item xs={12}>
                        <Item>
                        <Typography component="h1" variant="h5" fontWeight={800} color={"black"} align='center'>
                            Create Ballot
                        </Typography>
                        <br></br>
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                            <DatePicker
                                label="Closing Date"
                                id="dob"
                                name="dob"
                                value={value}
                                onChange={(newValue) => setValue(newValue)}
                                required
                                fullWidth
                                slotProps={{
                                textField: {
                                helperText: 'DD/MM/YYYY',
                                },
                            }}
                            /> 
                        </LocalizationProvider>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2}}
                        >
                            Create Ballot
                        </Button>
                        </Item>
                    </Grid>
                </Grid>
            
            </Box>
          </Box>

        </Container>

  );
}