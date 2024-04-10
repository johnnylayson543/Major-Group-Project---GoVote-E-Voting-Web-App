'use client';
import * as React from 'react';

import Header from '../../../components/header/header';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import { Toolbar, Stack, Divider } from '@mui/material';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useContext } from 'react'
import { UserContext } from '@/app/components/header/userAuthentication';
import { useRouter } from 'next/navigation';
import Layout from '@/app/layout';

global.mongoURL = "mongodb+srv://evote.kyxphj1.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority";

export default function Page() {

  const router = useRouter();
  const { user, person } = useContext(UserContext);
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
      console.log("Update is valid!")


    } else {

      console.log("Update is not valid!")
    }
  }

  if (!person) return (<Box><p>Loading</p></Box>);

  let dataElement = (
    <Stack key={person._id.toString()}>
      <p><strong>id:</strong> {person._id}</p>
      <p><strong>PPSN:</strong> {person.ppsn}</p>
      <p><strong>Name:</strong> {person.name}</p>
      <p><strong>Address:</strong> {person.address}</p>
      <p><strong>Email:</strong> {person.email}</p>
      <p><strong>Phone:</strong> {person.phone}</p>
      <p><strong>Date of Birth:</strong> {person.date_of_birth}</p></Stack>
  );
  let element = <Box>
    <h1>My Details</h1>
    {dataElement}
  </Box>




  /*
  This is the submit handler for the e-voting update details page after the button is fired
  When the button is clicked, this is the event that is fired.
  The first thing we need to do is prevent the default refresh of the page.
  */
  const handleSubmit = (event) => {

    console.log("handling submit and update details");


    event.preventDefault();

    const data = new FormData(event.currentTarget);

    let person_name = data.get('name');
    let person_address = data.get('address');
    let person_phone = data.get('phone');
    let person_email = data.get('email');

    console.log("Sent person name:" + person_name);
    console.log("Sent person address:" + person_address);
    console.log("Sent person phone:" + person_phone);
    console.log("Sent person email:" + person_email);



    // Call this function to pass the data created by the FormDatasrc\app\api
    runDBCallAsync(`http://localhost:3000/api/database/controllers/User/Person/update_person_details?ppsn=${person.ppsn}&name=${person_name}
    &address=${person_address}&phone=${person_phone}&email=${person_email}&date_of_birth=${person.date_of_birth}`);

    router.push('../Profile')
  }; // end handler


  // The actual front-end page
  return (

    <>
      <Box>
      <Typography component="h1" variant="h5" fontWeight={800} color={"black"}>
        Update Details
      </Typography>
      <Box>{element}</Box>
      </Box>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',

        }}
      >

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <h1>Fill in the form to update your details. </h1>
          <Divider />
          <TextField
            margin="normal"
            fullWidth
            id="name"
            label="Name"
            name="name"
            defaultValue={person.name}
            autoComplete="name"
            autoFocus
          />
          <TextField
            margin="normal"
            fullWidth
            id="address"
            label="Address"
            name="address"
            defaultValue={person.address}
            autoComplete="address"
            autoFocus
          />
          <TextField
            margin="normal"
            fullWidth
            id="phone"
            label="Phone"
            name="phone"
            defaultValue={person.phone}
            autoComplete="phone"
            autoFocus
          />
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            defaultValue={person.email}
            autoComplete="email"
            autoFocus
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Update Details
          </Button>
        </Box>
      </Box>

    </>

  );
}
