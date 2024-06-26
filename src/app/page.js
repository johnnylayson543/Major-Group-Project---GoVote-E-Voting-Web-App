'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MuiLink from '@mui/material/Link';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Page() {
    const router = useRouter();
    const [registrationStatus, setRegistrationStatus] = useState('');

    
    
    // This function does the actual work
    // calling the fetch to get things from the database.
    async function runDBCallAsync(ppsn, pass) {
        try {
            const res = await fetch(`http://localhost:3000/api/database/controllers/User/login_user/?ppsn=${ppsn}&pass=${pass}`);

            if (!res.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await res.json();

            if (data.data === "Okay") {
                setRegistrationStatus("Successfully Registered!");
            } else {
                setRegistrationStatus("Registration Failed!");
            }
        } catch (error) {
            setRegistrationStatus("An error occurred while registering.");
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const ppsn = data.get('ppsn');
        const pass = data.get('pass');
        runDBCallAsync(ppsn, pass);
        if(registrationStatus) router.push('http://localhost:3000/')
    };

    // Using a function component for Grid item to avoid duplication
    const Item = ({ children, xs }) => (
        <Grid item xs={xs}>
            <Box sx={{ border: '4px solid #00008B', padding: 3, backgroundColor: '#e9ecef', fontWeight: 500 }}>
                {children}
            </Box>
        </Grid>
    );



    return (
        <>
            <Box sx={{ p: 3 }}>
                <Grid container spacing={2}>
                    <Item xs={8}>
                        <Typography variant="h5" component="h2" fontWeight={800} color={"black"}>
                            Welcome to GoVote - Ireland's No. 1 E-Voting Website!
                        </Typography>
                    </Item>
                    <Item xs={8}>
                        <b>How It Works</b>
                        <p>
                            <b>Registration:</b> Create an account quickly and securely to verify your eligibility to vote.
                        </p>
                        <p>
                            <b>Voting:</b> Log in to your account during the designated voting period to access your ballot and cast your vote with just a few clicks.
                        </p>
                        <p>
                            <b>Confirmation:</b> Receive instant confirmation that your vote has been successfully recorded, providing peace of mind that your voice has been heard.
                        </p>
                        <p>
                            <b>Results:</b> Stay updated on election results in real-time, as they are tabulated and made available to the public.
                        </p>
                        {/* Add any additional content or components here */}
                    </Item>

                    <Item xs={4}>
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} />
                        <Typography component="h1" variant="h5" fontWeight={800} color={"black"}>
                            Login to GoVote
                        </Typography>

                        {registrationStatus && (
                            <Typography color={registrationStatus.includes("Failed") ? "error" : "primary"}>
                                {registrationStatus}
                            </Typography>
                        )}

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

                                <MuiLink href="./User/RegisterUser" variant="body2" textAlign={"center"} underline="none" color="inherit">
                                    {"New Here? Register An Account Now!"}
                                </MuiLink>
                            
                        </Box>
                    </Item>
                </Grid>
            </Box>
            </>
    );
}