'use client'

import React from 'react';
import Header from '../../components/header/header';
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
import PollIcon from '@mui/icons-material/Poll';
import TableChartIcon from '@mui/icons-material/TableChart';
import SettingsIcon from '@mui/icons-material/Settings';
import {blue, green, purple, white, pink} from '@mui/material/colors'; 

export default function Page() {

    // Setting the Item and children for the Grid and its properties
    const Item = ({ children }) => (
        <Box sx={{ border: '4px solid #00008B', padding: 3 , backgroundColor: '#6F9CDE' , fontWeight: 500 }}>
          {children}
        </Box>
    );

    // Front-End Page
    return (
        <Box component="main" sx={{ p: 3 }}>
            <Header>
            </Header>
            <Toolbar>
            </Toolbar>
            <br></br>
            <Grid container spacing={10}>
                <Grid item xs={4}>
                <Item>
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main'}}><Face6Icon></Face6Icon></Avatar>
                    <Typography variant="h5" component="h2" fontWeight={800} color={"black"}>
                        Welcome to GoVote User!
                    </Typography>
                </Item>
                </Grid>

                <Grid item xs={4}>
                <Item>
                <b>Dashboard</b>
                <br></br>
                Choose between viewing the Admin profile, the User profile or the User account details.
                </Item>
                </Grid>

                <Grid item xs={3}>
                <Item>
                    <Box sx={{ width: '100%', maxWidth: 360}}>
                        <List>
                            <Divider>Executive</Divider>
                            <ListItem disablePadding>
                                <ListItemButton sx={{ backgroundColor: 'blue', color: 'white' , mb: 0.2 }} href='../../Admin/Profile/'>
                                    <ListItemIcon>
                                        <HowToVoteIcon sx={{ color: 'white' }}></HowToVoteIcon>
                                    </ListItemIcon>
                                    <ListItemText primary="Admin"/>
                                </ListItemButton>
                            </ListItem>

                            <Divider></Divider>
                            <ListItem disablePadding>
                                <ListItemButton sx={{ backgroundColor: 'blue', color: 'white' , mb: 0.2 }} href='../../Voter/Profile/'>
                                    <ListItemIcon>
                                        <HowToVoteIcon sx={{ color: 'white' }}></HowToVoteIcon>
                                    </ListItemIcon>
                                    <ListItemText primary="Voter"/>
                                </ListItemButton>
                            </ListItem>
                            <Divider>Person</Divider>
                            <ListItem disablePadding>
                                <ListItemButton sx={{ backgroundColor: 'blue', color: 'white' , mb: 0.2 }} href='Person/updatedetails'>
                                    <ListItemIcon>
                                        <SettingsIcon sx={{ color: 'white' }}></SettingsIcon>
                                    </ListItemIcon>
                                    <ListItemText primary="Update Details"/>
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </Box>
                </Item>
                </Grid>
            </Grid>
        </Box>
    );
     
}


