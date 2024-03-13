'use client'

// Import necessary components and libraries from Material-UI
import * as React from 'react';
import Header from '../../components/header/header';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import {blue, green, purple} from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function Page() {

    const Item = ({ children }) => (
        <Box sx={{ border: '4px solid #00008B', padding: 3 , backgroundColor: '#AEAEAE' , fontWeight: 500 }}>
            {children}
        </Box>
    );

    return (
        <Box component="main" sx={{p: 3}}>
            <Header/>
            <Toolbar />
            <Typography variant="h5" component="h2" fontWeight={800} color={"black"}>
                Contact Us <br/> <br/>
            </Typography>
            <Typography>
                <span style={{ fontSize: '20px', fontWeight: '700', display: 'block' }}>We Value Your Feedback!</span>
                At GoVote, we're committed to providing a seamless and inclusive voting experience.
                Your feedback, questions, and suggestions are important to us. <br/>
                Feel free to come in and talk to us or drop us a query form and we will get back to you as soon as convenient
                <br/><br/>
            </Typography>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={5}>
                    <Grid item xs={6}>
                        <Item>
                            {/* Embedded Google Map */}
                            <iframe
                                title="Google Map"
                                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d9526.616988505923!2d-6.2603496!3d53.3494452!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48670e8441acbc79%3A0x377a23c877cf03a6!2sAn%20Post%2C%20General%20Post%20Office!5e0!3m2!1sen!2sie!4v1707927457561!5m2!1sen!2sie"
                                width="100%"
                                height="450"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </Item>
                    </Grid>

                    <Grid item xs={5}>
                        <Item>
                            <Typography variant="h6" component="div">
                                Leave Your Feedback
                            </Typography>
                            <form>
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
                                />
                                <TextField
                                    label="Query"
                                    multiline
                                    rows={4}
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                />
                                <Button variant="contained" color="primary" type="submit">
                                    Submit
                                </Button>
                            </form>
                        </Item>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}




