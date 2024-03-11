'use client'

import React from 'react';
import NavBar from '../../header/navBar'; 
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
            <NavBar>
            </NavBar>
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

                <Grid item xs={7}>
                <Item>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique unde
                fugit veniam eius, perspiciatis sunt? Corporis qui ducimus quibusdam,
                aliquam dolore excepturi quae. Distinctio enim at eligendi perferendis in
                cum quibusdam.
                <br></br>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Mauris et nulla ac eros aliquet suscipit ut quis libero. 
                Sed quam erat, dictum in consequat id, dapibus eu libero.
                </Item>
                </Grid>

                <Grid item xs={3}>
                <Item>
                    <Box sx={{ width: '100%', maxWidth: 360}}>
                        <List>
                            <Divider></Divider>
                            <ListItem disablePadding>
                                <ListItemButton sx={{ backgroundColor: 'blue', color: 'white' , mb: 0.2 }} href='../../Voter/Vote/CastYourVote'>
                                    <ListItemIcon>
                                        <HowToVoteIcon sx={{ color: 'white' }}></HowToVoteIcon>
                                    </ListItemIcon>
                                    <ListItemText primary="Cast Vote"/>
                                </ListItemButton>
                            </ListItem>
                            <Divider></Divider>
                            <ListItem disablePadding>
                                <ListItemButton sx={{ backgroundColor: 'blue', color: 'white' , mb: 0.2 }} href='./tallyvotes'>
                                    <ListItemIcon>
                                        <PollIcon sx={{ color: 'white' }}></PollIcon>
                                    </ListItemIcon>
                                    <ListItemText primary="Tally Votes"/>
                                </ListItemButton>
                            </ListItem>
                            
                            <Divider></Divider>
                            <ListItem disablePadding>
                                <ListItemButton sx={{ backgroundColor: 'blue', color: 'white' , mb: 0.2 }} href='Vote/BulletinBoard'>
                                    <ListItemIcon>
                                        <DashboardIcon sx={{ color: 'white' }}></DashboardIcon>
                                    </ListItemIcon>
                                    <ListItemText primary="Bulletin Board"/>
                                </ListItemButton>
                            </ListItem>
                            <Divider></Divider>

                            <Divider></Divider>
                            <ListItem disablePadding>
                                <ListItemButton sx={{ backgroundColor: 'blue', color: 'white' , mb: 0.2 }} href='../../Voter/Vote/MyVotesCast'>
                                    <ListItemIcon>
                                        <PersonIcon sx={{ color: 'white' }}></PersonIcon>
                                    </ListItemIcon>
                                    <ListItemText primary="My Votes Cast"/>
                                </ListItemButton>
                            </ListItem>
                            <Divider></Divider>
                            <ListItem disablePadding>
                                <ListItemButton sx={{ backgroundColor: 'blue', color: 'white' , mb: 0.2 }} href='Election/RegisterForAnElection'>
                                    <ListItemIcon>
                                        <HowToRegIcon sx={{ color: 'white' }}></HowToRegIcon>
                                    </ListItemIcon>
                                    <ListItemText primary="Register for Elections"/>
                                </ListItemButton>
                            </ListItem>
                            <Divider></Divider>
                            <ListItem disablePadding>
                                <ListItemButton sx={{ backgroundColor: 'blue', color: 'white' , mb: 0.2 }} href='Vote/ViewVote'>
                                    <ListItemIcon>
                                        <BallotIcon sx={{ color: 'white' }}></BallotIcon>
                                    </ListItemIcon>
                                    <ListItemText primary="View Vote"/>
                                </ListItemButton>
                            </ListItem>
                            <Divider></Divider>
                            <ListItem disablePadding>
                                <ListItemButton sx={{ backgroundColor: 'blue', color: 'white' , mb: 0.2 }} href='Vote/ViewResults'>
                                    <ListItemIcon>
                                        <TableChartIcon sx={{ color: 'white' }}></TableChartIcon>
                                    </ListItemIcon>
                                    <ListItemText primary="View Results"/>
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton sx={{ backgroundColor: 'blue', color: 'white' , mb: 0.2 }} href='Person/UpdateDetails'>
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


