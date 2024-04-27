'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import styled from '@emotion/styled';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(3),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Page() {
  // Form submission handler
  const handleSubmit = (event) => {
    event.preventDefault();
    // Process form data here
  };

  return (
    <>
      <Box component="main" sx={{ p: 3 }}>
        <Box sx={{ flexGrow: 1, mt: 4 }}>
          <Grid container spacing={5}>
              <Item>
                  <Typography variant="h5" component="h2" fontWeight={800} gutterBottom>
                    Contact Us
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: '700', mt: 2, mb: 4 }}>
                    We Value Your Feedback!
                  </Typography>
                  <Typography>
                    At GoVote, we're committed to providing a seamless and inclusive voting experience.
                    Your feedback, questions, and suggestions are important to us.
                    Feel free to come in and talk to us or drop us a query form and we will get back to you as soon as convenient.
                  </Typography>
                </Item>
            <Grid item xs={12} md={6}>
              <Item elevation={0}>
                {/* Embedded Google Map */}
                <iframe
                  title="Company Location"
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d9526.616988505923!2d-6.2603496!3d53.3494452!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48670e8441acbc79%3A0x377a23c877cf03a6!2sAn%20Post%2C%20General%20Post%20Office!5e0!3m2!1sen!2sie!4v1707927457561!5m2!1sen!2sie"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </Item>
            </Grid>

            <Grid item xs={12} md={6}>
              <Item elevation={0}>
                <Typography variant="h6" gutterBottom>
                  Leave Your Feedback
                </Typography>
                <form onSubmit={handleSubmit}>
                  <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="email"
                  />
                  <TextField
                    label="Query"
                    multiline
                    rows={4}
                   variant="outlined"
                    fullWidth
                    margin="normal"
                  />
                  <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
                    Submit
                  </Button>
                </form>
              </Item>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}