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
import BallotIcon from '@mui/icons-material/Ballot';
import PersonIcon from '@mui/icons-material/Person';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Face6Icon from '@mui/icons-material/Face6';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import TableChartIcon from '@mui/icons-material/TableChart';
import { useContext } from 'react'
import { UserContext } from '@/app/components/header/userAuthentication';
import { useRouter } from 'next/navigation';
import Layout from '@/app/layout';


export default function Page() {

    const router = useRouter();
    const { user, voter, admin, teller } = useContext(UserContext);

    // Setting the Item and children for the Grid and its properties
    const Item = ({ children }) => (
        <Box sx={{ border: '4px solid #00008B', padding: 3, backgroundColor: '#6F9CDE', fontWeight: 500 }}>
            {children}
        </Box>
    );

    let adminButton;
    if (admin) {
        console.log(admin._id);
        adminButton =
            <ListItem disablePadding>
                <ListItemButton sx={{ backgroundColor: 'blue', color: 'white', mb: 0.2 }} onClick={() => goBackToAdminProfile(admin._id)} >
                    <ListItemIcon>
                        <HowToVoteIcon sx={{ color: 'white' }}></HowToVoteIcon>
                    </ListItemIcon>
                    <ListItemText primary="Admin" />
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


    let voterButtons;
    if (voter) {
        console.log(voter._id);
        voterButtons = <Box>
            <ListItem disablePadding>
                <ListItemButton sx={{ backgroundColor: 'blue', color: 'white', mb: 0.2 }} onClick={() => goBackToSignedUpElections(voter._id)} >
                    <ListItemIcon>
                        <HowToVoteIcon sx={{ color: 'white' }}></HowToVoteIcon>
                    </ListItemIcon>
                    <ListItemText primary="My Elections" />
                </ListItemButton>
            </ListItem >
            <ListItem disablePadding>
                <ListItemButton sx={{ backgroundColor: 'blue', color: 'white', mb: 0.2 }} onClick={() => goBackToMyVotesCast(voter._id)} >
                    <ListItemIcon>
                        <HowToVoteIcon sx={{ color: 'white' }}></HowToVoteIcon>
                    </ListItemIcon>
                    <ListItemText primary="My Votes" />
                </ListItemButton>
            </ListItem >
        </Box>
    }



    let element1 = <Box> <ListItem disablePadding>
        <ListItemButton sx={{ backgroundColor: 'blue', color: 'white', mb: 0.2 }} href='../../Voter/Election/'>
            <ListItemIcon>
                <HowToVoteIcon sx={{ color: 'white' }}></HowToVoteIcon>
            </ListItemIcon>
            <ListItemText primary="Running Elections" />
        </ListItemButton>
    </ListItem>
        <Divider></Divider>

        <Divider></Divider>
        <ListItem disablePadding>
            <ListItemButton sx={{ backgroundColor: 'blue', color: 'white', mb: 0.2 }} href='../../Voter/Vote/CastYourVote'>
                <ListItemIcon>
                    <HowToVoteIcon sx={{ color: 'white' }}></HowToVoteIcon>
                </ListItemIcon>
                <ListItemText primary="Cast Vote" />
            </ListItemButton>
        </ListItem>
        <Divider></Divider>
        <ListItem disablePadding>
            <ListItemButton sx={{ backgroundColor: 'blue', color: 'white', mb: 0.2 }} href='Vote/BulletinBoard'>
                <ListItemIcon>
                    <DashboardIcon sx={{ color: 'white' }}></DashboardIcon>
                </ListItemIcon>
                <ListItemText primary="Bulletin Board" />
            </ListItemButton>
        </ListItem>
        <Divider></Divider>

        <Divider></Divider>
        <ListItem disablePadding>
            <ListItemButton sx={{ backgroundColor: 'blue', color: 'white', mb: 0.2 }} href='../../Voter/Vote/MyVotesCast'>
                <ListItemIcon>
                    <PersonIcon sx={{ color: 'white' }}></PersonIcon>
                </ListItemIcon>
                <ListItemText primary="My Votes Cast" />
            </ListItemButton>
        </ListItem>
        <Divider></Divider>
        <ListItem disablePadding>
            <ListItemButton sx={{ backgroundColor: 'blue', color: 'white', mb: 0.2 }} href='Election/RegisterForAnElection'>
                <ListItemIcon>
                    <HowToRegIcon sx={{ color: 'white' }}></HowToRegIcon>
                </ListItemIcon>
                <ListItemText primary="Register for Elections" />
            </ListItemButton>
        </ListItem>
        <Divider></Divider>
        <ListItem disablePadding>
            <ListItemButton sx={{ backgroundColor: 'blue', color: 'white', mb: 0.2 }} href='Vote/ViewVote'>
                <ListItemIcon>
                    <BallotIcon sx={{ color: 'white' }}></BallotIcon>
                </ListItemIcon>
                <ListItemText primary="View Vote" />
            </ListItemButton>
        </ListItem>
        <Divider></Divider>
        <ListItem disablePadding>
            <ListItemButton sx={{ backgroundColor: 'blue', color: 'white', mb: 0.2 }} href='Vote/ViewResults'>
                <ListItemIcon>
                    <TableChartIcon sx={{ color: 'white' }}></TableChartIcon>
                </ListItemIcon>
                <ListItemText primary="View Results" />
            </ListItemButton>
        </ListItem>
    </Box>

    const goBackToSignedUpElections = (voter_id) => {
        router.push(`/Voter/Election/SignedUpForElections?voterID=${voter_id}`);
    };
    const goBackToAdminProfile = (admin_id) => {
        router.push('/Admin/Profile?adminID={' + admin_id + '}');
    };

    const goBackToMyVotesCast = (voter_id) => {
        router.push('/Voter/Vote/MyVotesCast?voterID={' + voter_id + '}');
    }

    // Front-End Page
    return (
        <Layout>
            <Grid container spacing={10}>
                <Grid item xs={3.5}>
                    <Item>
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}><Face6Icon></Face6Icon></Avatar>
                        <Typography variant="h5" component="h2" fontWeight={800} color={"black"}>
                            Welcome to GoVote User!
                        </Typography>
                    </Item>
                </Grid>

                <Grid item xs={5}>
                    <Item>
                        <b>Dashboard</b>
                        <br></br>
                        Take control! Browse ongoing elections, view past results,
                        and make your voice heard in upcoming votes. Explore the diverse
                        range of elections happening in your community, nation, or organization.
                    </Item>
                </Grid>

                <Grid item xs={3}>
                    <Item>
                        <Box sx={{ width: '100%', maxWidth: 360 }}>
                            <List>
                                <Divider>Executive</Divider>

                                {adminButton}
                                <ListItem disablePadding>
                                    <ListItemButton sx={{ backgroundColor: 'blue', color: 'white', mb: 0.2 }} href='../User/Profile/'>
                                        <ListItemIcon>
                                            <HowToVoteIcon sx={{ color: 'white' }}></HowToVoteIcon>
                                        </ListItemIcon>
                                        <ListItemText primary="User" />
                                    </ListItemButton>
                                </ListItem>
                                <Divider>User</Divider>
                                <ListItem disablePadding>
                                    <ListItemButton sx={{ backgroundColor: 'blue', color: 'white', mb: 0.2 }} href='../../Voter/Election/'>
                                        <ListItemIcon>
                                            <HowToVoteIcon sx={{ color: 'white' }}></HowToVoteIcon>
                                        </ListItemIcon>
                                        <ListItemText primary="Elections" />
                                    </ListItemButton>
                                </ListItem>


                                <Divider>Voter</Divider>
                                {voterButtons}

                            </List>
                        </Box>
                    </Item>
                </Grid>
            </Grid>
        </Layout>
    );

}


