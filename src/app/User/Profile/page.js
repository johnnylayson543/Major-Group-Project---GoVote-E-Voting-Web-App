'use client'

import React from 'react';
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

export default function MediaMainPage_UserPage() {

    const router = useRouter();
    const { user, voter, admin, teller } = useContext(UserContext);

    // Setting the Item and children for the Grid and its properties
    const Item = ({ children }) => (
        <Box sx={{ border: '4px solid #00008B', padding: 3, backgroundColor: '#6F9CDE', fontWeight: 500 }}>
            {children}
        </Box>
    );

    if (!user) return <Box><p>Loading</p></Box>;
    let voterButton;
    if (voter) {
        console.log(voter._id);
        voterButton =
            <ListItem disablePadding>
                <ListItemButton sx={{ backgroundColor: 'blue', color: 'white', mb: 0.2 }} onClick={() => goToAdminProfile(voter._id)} >
                    <ListItemIcon>
                        <HowToVoteIcon sx={{ color: 'white' }}></HowToVoteIcon>
                    </ListItemIcon>
                    <ListItemText primary="Admin" />
                </ListItemButton>
            </ListItem >
    }

    let adminButton;
    if (admin) {
        console.log(admin._id);
        adminButton =
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

    const goToVoterProfile = (voter_id) => {
        router.push('/Voter/Profile?voterID={' + voter_id + '}');
    };

    const goToAdminProfile = (admin_id) => {
        router.push('/Admin/Profile?voterID={' + admin_id + '}');
    };

    const goToTellerProfile = (teller_id) => {
        router.push('/Teller/Profile?voterID={' + teller_id + '}');
    };


    // Front-End Page
    return (
        <Layout>
            <Grid container spacing={10}>
                <Grid item xs={4}>
                    <Item>
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}><Face6Icon></Face6Icon></Avatar>
                        <Typography variant="h5" component="h2" fontWeight={800} color={"black"}>
                            Welcome to GoVote User!
                        </Typography>
                    </Item>
                </Grid>

                <Grid item xs={7}>

                <Item>
                <b>Dashboard</b>
                <br></br>
                Choose between viewing the Admin profile, the User profile or the User account details.
                </Item>
                </Grid>

                <Grid item xs={5}>
                    <Item>
                        <Box sx={{ width: '100%', maxWidth: 360 }}>
                            <List>
                                <Divider>Executive</Divider>
                                {adminButton}
                                {tellerButton}
                                {voterButton}
                                <Divider>User Controls</Divider>
                                <ListItem disablePadding>
                                    <ListItemButton sx={{ backgroundColor: 'blue', color: 'white', mb: 0.2 }} href='../Voter/Election/'>
                                        <ListItemIcon>
                                            <HowToVoteIcon sx={{ color: 'white' }}></HowToVoteIcon>
                                        </ListItemIcon>
                                        <ListItemText primary="Become a Voter" />
                                    </ListItemButton>
                                </ListItem>

                                <ListItem disablePadding>
                                    <ListItemButton sx={{ backgroundColor: 'blue', color: 'white', mb: 0.2 }} href='../../User/Media/'>
                                        <ListItemIcon>
                                            <HowToVoteIcon sx={{ color: 'white' }}></HowToVoteIcon>
                                        </ListItemIcon>
                                        <ListItemText primary="My Media" />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton sx={{ backgroundColor: 'blue', color: 'white', mb: 0.2 }} href='Person/UpdateMyDetails'>
                                        <ListItemIcon>
                                            <SettingsIcon sx={{ color: 'white' }}></SettingsIcon>
                                        </ListItemIcon>
                                        <ListItemText primary="Update Details" />
                                    </ListItemButton>
                                </ListItem>
                            </List>
                        </Box>
                    </Item>
                </Grid>
            </Grid>
        </Layout>
    );

}


