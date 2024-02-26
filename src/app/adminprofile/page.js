'use client'

import React from 'react';
import NavBar from '../header/navBar'; 
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
                        Welcome to GoVote Management System Admin!
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
                                <ListItemButton sx={{ backgroundColor: 'blue', color: 'white' , mb: 0.2 }} href='./personrange'>
                                    <ListItemIcon>
                                        <AddIcon sx={{ color: 'white' }}></AddIcon>
                                    </ListItemIcon>
                                    <ListItemText primary="Set Person Range"/>
                                </ListItemButton>
                            </ListItem>
                            <Divider></Divider>
                            <ListItem disablePadding>
                                <ListItemButton sx={{ backgroundColor: 'blue', color: 'white' , mb: 0.2 }} href='./createballot'>
                                    <ListItemIcon>
                                        <BallotIcon sx={{ color: 'white' }}></BallotIcon>
                                    </ListItemIcon>
                                    <ListItemText primary="Create Ballot"/>
                                </ListItemButton>
                            </ListItem>
                            
                            <Divider></Divider>
                            <ListItem disablePadding>
                                <ListItemButton sx={{ backgroundColor: 'blue', color: 'white' , mb: 0.2 }} href='./createcandidates'>
                                    <ListItemIcon>
                                        <PersonAddIcon sx={{ color: 'white' }}></PersonAddIcon>
                                    </ListItemIcon>
                                    <ListItemText primary="Create Candidates"/>
                                </ListItemButton>
                            </ListItem>
                            <Divider></Divider>

                            <Divider></Divider>
                            <ListItem disablePadding>
                                <ListItemButton sx={{ backgroundColor: 'blue', color: 'white' , mb: 0.2 }} href='./createelection'>
                                    <ListItemIcon>
                                        <HowToVoteIcon sx={{ color: 'white' }}></HowToVoteIcon>
                                    </ListItemIcon>
                                    <ListItemText primary="Create Election"/>
                                </ListItemButton>
                            </ListItem>
                            <Divider></Divider>
                            <ListItem disablePadding>
                                <ListItemButton sx={{ backgroundColor: 'blue', color: 'white' , mb: 0.2 }} href='./viewchecks'>
                                    <ListItemIcon>
                                        <HowToRegIcon sx={{ color: 'white' }}></HowToRegIcon>
                                    </ListItemIcon>
                                    <ListItemText primary="View Checks"/>
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