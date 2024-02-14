'use client'
import * as React from 'react';
import NavBar from '../header/navBar'
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";

export default function Page() {


    return (
        
        <Box component="main" sx={{ p: 3 }}>
            <NavBar></NavBar>
            <Toolbar></Toolbar>
            <Typography textAlign={"center"} variant="h5" component="h2" fontWeight={800} color={"black"}>
                Welcome to GoVote
            </Typography>
            <Typography>
                <h2>Our Mission: Making Voting Inclusive and Accessible to ALL</h2>

                At GoVote, we believe in the power of democracy and the importance of every voice being heard.
                Inspired by the success of Estonia's e-voting system and fueled by the desire to empower every eligible voter,
                we set out on a journey to create a platform that makes voting more inclusive and accessible, regardless of your location or situation.

                <br/>
                <h2>The Genesis of GoVote</h2>
                The idea was born when our founders, John Layson, Adam O'Shea,
                and Emmanuel Ojomo, recognized the transformative impact of e-voting in Estonia. They were moved by stories
                of individuals unable to cast their votes due to being abroad during crucial elections that directly affected them.
                Determined to bridge this gap, they envisioned a platform that would empower citizens to participate in the democratic process,
                no matter where life takes them.

                <br/>
                <h2>Our Commitment to Inclusivity</h2>
                At GoVote, inclusivity is at the heart of everything we do. Our mission is to break down barriers
                and ensure that every eligible voter has the opportunity to exercise their democratic right. Whether you're living abroad,
                facing mobility challenges, or simply prefer the convenience of online voting, our platform is designed
                to make the electoral process seamless and accessible.

                <br/>
                <h2>Join Us in Shaping the Future of Democracy</h2>
                We invite <b>you</b> to be part of this democratic revolution. Your voice matters, and with GoVote,
                you can make it heard. Together, let's pave the way for a more inclusive and accessible electoral system.

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    href={"./register"}
                    sx={{ mt: 5, mb: 4 }}
                >
                    Register

                </Button>
            </Typography>
        </Box>
        
    );
}

