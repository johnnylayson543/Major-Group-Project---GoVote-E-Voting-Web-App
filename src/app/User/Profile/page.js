'use client'

import React, { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import Face6Icon from '@mui/icons-material/Face6';
import SettingsIcon from '@mui/icons-material/Settings';
import { useRouter } from 'next/navigation';
import { useContext } from 'react'
import { UserContext } from '@/app/components/header/userAuthentication';
import Layout from '@/app/layout';
import Cookies from 'js-cookie';

export default function Page() {

    const router = useRouter();
    const { user, voter, admin, teller, candidate } = useContext(UserContext);


    // Setting the Item and children for the Grid and its properties
    const Item = ({ children }) => (
        <Box sx={{ border: '4px solid #00008B', padding: 3, backgroundColor: '#6F9CDE', fontWeight: 500 }}>
            {children}
        </Box>
    );


    function checkCookieAndReload() {
        const hasReloaded = Cookies.get('hasReloaded');
        const authToken = Cookies.get('user_authenticated');
    
        if (authToken && !hasReloaded) {
            Cookies.set('hasReloaded', 'true');
            window.location.reload();
        }
    }


    if (!user) {
        checkCookieAndReload();
        return <><Box><p>Loading</p></Box></>;
    }


    let adminButton;
    if (admin) {
        console.log(voter._id);
        adminButton =
            <ListItem disablePadding>
                <ListItemButton sx={{ backgroundColor: 'blue', color: 'white', mb: 0.2 }} onClick={() => goToAdminProfile(voter._id)} >
                    <ListItemIcon>
                        <HowToVoteIcon sx={{ color: 'white' }}></HowToVoteIcon>
                    </ListItemIcon>
                    <ListItemText primary="Admin" />
                </ListItemButton>
            </ListItem >
    }

    let voterButton;
    if (voter) {
        console.log(voter._id);
        voterButton =
            <ListItem disablePadding>
                <ListItemButton sx={{ backgroundColor: 'blue', color: 'white', mb: 0.2 }} onClick={() => goToVoterProfile(admin._id)} >
                    <ListItemIcon>
                        <HowToVoteIcon sx={{ color: 'white' }}></HowToVoteIcon>
                    </ListItemIcon>
                    <ListItemText primary="Voter" />
                </ListItemButton>
            </ListItem >
    }

    let tellerButton;
    if (teller) {
        console.log(teller._id);
        tellerButton =
            <ListItem disablePadding>
                <ListItemButton sx={{ backgroundColor: 'blue', color: 'white', mb: 0.2 }} onClick={() => goToTellerProfile(teller._id)} >
                    <ListItemIcon>
                        <HowToVoteIcon sx={{ color: 'white' }}></HowToVoteIcon>
                    </ListItemIcon>
                    <ListItemText primary="Teller" />
                </ListItemButton>
            </ListItem >
    }

    let candidateButton;
    if (candidate) {
        console.log(teller._id);
        candidateButton =
            <ListItem disablePadding>
                <ListItemButton sx={{ backgroundColor: 'blue', color: 'white', mb: 0.2 }} onClick={() => goToCandidateProfile(candidate._id)} >
                    <ListItemIcon>
                        <HowToVoteIcon sx={{ color: 'white' }}></HowToVoteIcon>
                    </ListItemIcon>
                    <ListItemText primary="Candidate" />
                </ListItemButton>
            </ListItem >
    }

    const goToVoterProfile = (voter_id) => {
        router.push('/Voter/Profile?voterID={' + voter_id + '}');
    };

    const goToCandidateProfile = (candidate_id) => {
        router.push('/Candidate/Profile?candidateID={' + candidate_id + '}');
    };

    const goToAdminProfile = (admin_id) => {
        router.push('/Admin/Profile?voterID={' + admin_id + '}');
    };

    const goToTellerProfile = (teller_id) => {
        router.push('/Teller/Profile?voterID={' + teller_id + '}');
    };


    // Front-End Page
    return (

        <>
            <Box component="main" sx={{ p: 3 }}>
                <Grid container spacing={10}>
                    {/* Adjust the grid sizing for different breakpoints */}
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Item>
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <Face6Icon />
                            </Avatar>
                            <Typography variant="h5" component="h2" fontWeight={800} color={"black"}>
                                Welcome to GoVote User!
                            </Typography>
                        </Item>
                    </Grid>

                    {/* Adjust the grid sizing for different breakpoints */}
                    <Grid item xs={12} sm={6} md={8} lg={9}>
                        <Item>
                            <b>Dashboard</b>
                            <br />
                            Choose between viewing the Admin profile, the User profile or the User account details.
                        </Item>
                    </Grid>

                    {/* Adjust the grid sizing for different breakpoints */}
                    <Grid item xs={12} md={4}>
                        <Item>
                            <Box sx={{ width: '100%', maxWidth: 360 }}>
                                <List>
                                    <Divider>Executive</Divider>
                                    {adminButton}
                                    {tellerButton}
                                    {voterButton}
                                    {candidateButton}
                                    <Divider>User Controls</Divider>
                                    <ListItem disablePadding>
                                        <ListItemButton sx={{ backgroundColor: 'blue', color: 'white', mb: 0.2 }} href='../Voter/Election/'>
                                            <ListItemIcon>
                                                <HowToVoteIcon sx={{ color: 'white' }} />
                                            </ListItemIcon>
                                            <ListItemText primary="Become a Voter" />
                                        </ListItemButton>
                                    </ListItem>

                                    <ListItem disablePadding>
                                        <ListItemButton sx={{ backgroundColor: 'blue', color: 'white', mb: 0.2 }} href='../../User/Media/'>
                                            <ListItemIcon>
                                                <HowToVoteIcon sx={{ color: 'white' }} />
                                            </ListItemIcon>
                                            <ListItemText primary="My Media" />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <ListItemButton sx={{ backgroundColor: 'blue', color: 'white', mb: 0.2 }} href='Person/UpdateMyDetails'>
                                            <ListItemIcon>
                                                <SettingsIcon sx={{ color: 'white' }} />
                                            </ListItemIcon>
                                            <ListItemText primary="Update Details" />
                                        </ListItemButton>
                                    </ListItem>
                                </List>
                            </Box>
                        </Item>
                    </Grid>
                </Grid>
            </Box>
        </>
    );

}


