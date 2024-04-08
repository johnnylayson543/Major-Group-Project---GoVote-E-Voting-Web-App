'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import Layout from '@/app/layout'; // Assuming this is the correct path for your layout component

export default function Page() {
    return (
        <Layout>
            <Box textAlign="center" sx={{ my: 4 }}>
                <Typography variant="h5" fontWeight={800} color="black" gutterBottom>
                    Welcome to GoVote
                </Typography>
                <Typography variant="subtitle1" sx={{ fontSize: '25px', fontWeight: '700', my: 2 }}>
                    Our Mission: Making Voting Inclusive and Accessible to ALL
                </Typography>
                <Typography paragraph>
                    At GoVote, we believe in the power of democracy and the importance of every voice being heard.
                    Inspired by the success of Estonia's e-voting system and fueled by the desire to empower every eligible voter,
                    we set out on a journey to create a platform that makes voting more inclusive and accessible, regardless of your location or situation.
                </Typography>
                <Typography variant="subtitle1" sx={{ fontSize: '25px', fontWeight: '700', my: 2 }}>
                    The Genesis of GoVote
                </Typography>
                <Typography paragraph>
                    The idea was born when our founders, John Layson, Adam O'Shea,
                    and Emmanuel Ojomo, recognized the transformative impact of e-voting in Estonia. They were moved by stories
                    of individuals unable to cast their votes due to being abroad during crucial elections that directly affected them.
                    Determined to bridge this gap, they envisioned a platform that would empower citizens to participate in the democratic process,
                    no matter where life takes them.
                </Typography>
                <Typography variant="subtitle1" sx={{ fontSize: '25px', fontWeight: '700', my: 2 }}>
                    Our Commitment to Inclusivity
                </Typography>
                <Typography paragraph>
                    At GoVote, inclusivity is at the heart of everything we do. Our mission is to break down barriers
                    and ensure that every eligible voter has the opportunity to exercise their democratic right. Whether you're living abroad,
                    facing mobility challenges, or simply prefer the convenience of online voting, our platform is designed
                    to make the electoral process seamless and accessible.
                </Typography>
                <Typography variant="subtitle1" sx={{ fontSize: '25px', fontWeight: '700', my: 2 }}>
                    Join Us in Shaping the Future of Democracy
                </Typography>
                <Typography paragraph>
                    We invite <b>you</b> to be part of this democratic revolution. Your voice matters, and with GoVote,
                    you can make it heard. Together, let's pave the way for a more inclusive and accessible electoral system.
                </Typography>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    href="./register" // Consider using a Link component here if applicable
                    sx={{ mt: 5, mb: 4 }}
                >
                    Register
                </Button>
            </Box>
        </Layout>
    );
}