'use client'

import React from 'react';
import Avatar from '@mui/material/Avatar';
import Toolbar from '@mui/material/Toolbar';
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
import BallotIcon from '@mui/icons-material/Ballot';
import PersonIcon from '@mui/icons-material/Person';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Face6Icon from '@mui/icons-material/Face6';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import AddIcon from '@mui/icons-material/Add';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ChecklistIcon from '@mui/icons-material/Checklist';
import { blue, green, purple, white, pink } from '@mui/material/colors';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useContext } from 'react'
import { UserAuthentication, UserContext } from '@/app/components/header/userAuthentication';
import Layout from '@/app/layout';

export default function Page() {

    const router = useRouter();
    const { user, voter, admin } = useContext(UserContext);
    // Setting the Item and children for the Grid and its properties
    const Item = ({ children }) => (
        <Box sx={{ border: '4px solid #00008B', padding: 3, backgroundColor: '#6F9CDE', fontWeight: 500 }}>
            {children}
        </Box>
    );

    let voterButton;
    if (voter) {
        console.log(voter._id);
        voterButton =
            <ListItem disablePadding>
                <ListItemButton sx={{ backgroundColor: 'blue', color: 'white', mb: 0.2 }} onClick={() => goBackToVoterProfile(voter._id)} >
                    <ListItemIcon>
                        <HowToVoteIcon sx={{ color: 'white' }}></HowToVoteIcon>
                    </ListItemIcon>
                    <ListItemText primary="Voter" />
                </ListItemButton>
            </ListItem >
    }

    const goBackToVoterProfile = (voter_id) => {
        router.push('/Voter/Profile?voterID={' + voter_id + '}');
    };

    const goToPersons = () => {
        router.push('/Admin/Person/');
    };
    const goToElections = () => {
        router.push('/Admin/Election/');
    };
    const goToHomePage = () => {
        router.push('/');
    };
    const goToBallots = () => {
        router.push('/Admin/Ballot/');
    };
    const goToUserArea = () => {
        router.push('/User/Profile/')
    }

    // Front-End Page
    return (
        <Box component="main" sx={{ p: 3 }}>
            <Toolbar>
            </Toolbar>
            <br></br>
            <Grid container spacing={10}>
                <Grid item xs={3.5}>
                    <Item>
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}><Face6Icon></Face6Icon></Avatar>
                        <Typography variant="h5" component="h2" fontWeight={800} color={"black"}>
                            Welcome to GoVote Management System Admin!
                        </Typography>
                    </Item>
                </Grid>

                <Grid item xs={5.5}>
                    <Item>
                        <b>Dashboard</b>
                        <br></br>
                        Here you can manage various settings and activities related to the voting process.
                        As an administrator, you have the authority to make changes to individual profiles,
                        create, update, and delete ballots, as well as modify election parameters.
                        Please use the provided options to navigate and administer the voting system effectively.
                    </Item>
                </Grid>

                <Grid item xs={4}>
                    <Item>
                        <Box sx={{ width: '100%', maxWidth: 360 }}>
                            <List>
                                <Divider>Executive</Divider>
                                <ListItem disablePadding>
                                    <ListItemButton onClick={() => goToUserArea()} sx={{ backgroundColor: 'blue', color: 'white', mb: 0.2 }}>
                                        <ListItemIcon>
                                            <HowToVoteIcon sx={{ color: 'white' }}></HowToVoteIcon>
                                        </ListItemIcon>
                                        <ListItemText primary="User" />
                                    </ListItemButton>
                                </ListItem>
                                <Divider>Admin Controls</Divider>
                                <ListItem disablePadding>
                                    <ListItemButton onClick={() => goToPersons()} sx={{ backgroundColor: 'blue', color: 'white', mb: 0.2 }}>

                                        <ListItemIcon>
                                            <AddIcon sx={{ color: 'white' }}></AddIcon>

                                        </ListItemIcon>
                                        <ListItemText primary="Persons" />
                                    </ListItemButton>
                                </ListItem>
                                <Divider></Divider>
                                <ListItem disablePadding>
                                    <ListItemButton onClick={() => goToBallots()} sx={{ backgroundColor: 'blue', color: 'white', mb: 0.2 }}>
                                        <ListItemIcon>
                                            <BallotIcon sx={{ color: 'white' }}></BallotIcon>
                                        </ListItemIcon>
                                        <ListItemText primary="Ballots" />
                                    </ListItemButton>
                                </ListItem>
                                <Divider></Divider>
                                <ListItem disablePadding>
                                    <ListItemButton onClick={() => goToElections()} sx={{ backgroundColor: 'blue', color: 'white', mb: 0.2 }}>
                                        <ListItemIcon>
                                            <HowToVoteIcon sx={{ color: 'white' }}></HowToVoteIcon>
                                        </ListItemIcon>
                                        <ListItemText primary="Elections" />
                                    </ListItemButton>
                                </ListItem>
                                <Divider>Auditor Controls</Divider>
                                <ListItem disablePadding>
                                    <ListItemButton sx={{ backgroundColor: 'blue', color: 'white', mb: 0.2 }}>
                                        <ListItemIcon>
                                            <HowToRegIcon sx={{ color: 'white' }}></HowToRegIcon>
                                        </ListItemIcon>
                                        <ListItemText primary="Checks" />
                                    </ListItemButton>
                                </ListItem>
                                <Divider></Divider>
                                {voterButton}
                                <Divider></Divider>
                                <Divider></Divider>

                            </List>
                        </Box>
                    </Item>
                </Grid>
            </Grid>
        </Box>
    );

}