'use client'

import PollIcon from '@mui/icons-material/Poll';
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
import Face6Icon from '@mui/icons-material/Face6';
import SettingsIcon from '@mui/icons-material/Settings';

export default function Page() {

    // Setting the Item and children for the Grid and its properties
    const Item = ({ children }) => (
        <Box sx={{ border: '4px solid #00008B', padding: 3, backgroundColor: '#e9ecef', fontWeight: 500 }}>
            {children}
        </Box>
    );

    // Front-End Page
    return (
        <>
            <Grid container spacing={10}>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                    <Item>
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}><Face6Icon /></Avatar>
                        <Typography variant="h5" component="h2" fontWeight={800} color={"black"}>
                            Welcome to GoVote Teller!
                        </Typography>
                    </Item>
                </Grid>

                <Grid item xs={12} sm={6} md={5} lg={5}>
                    <Item>
                    <b>Teller Dashboard</b>
                        <br></br>
                        <strong>Welcome to the Teller Dashboard!</strong>
                        <br></br>
                        As the Teller, you can see all the history of finished elections and you can tally up all the elections.
                        Please use the provided options to navigate election history and tally the election votes efficiently.
                    </Item>
                </Grid>

                <Grid item xs={12} sm={12} md={3} lg={3}>
                    <Item>
                        <Box sx={{ width: '100%', maxWidth: 360 }}>
                            <List>
                                <Divider>Teller Controls</Divider>
                                <ListItem disablePadding>
                                    <ListItemButton sx={{ backgroundColor: 'lch(48.68% 6.04 241.68)', color: 'white', mb: 0.2 }} href='/Teller/Election'>
                                        <ListItemIcon>
                                            <PollIcon sx={{ color: 'white' }} />
                                        </ListItemIcon>
                                        <ListItemText primary="Finished Elections" />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton sx={{ backgroundColor: 'lch(48.68% 6.04 241.68)', color: 'white', mb: 0.2 }} href='/Teller/Election/Vote'>
                                        <ListItemIcon>
                                            <PollIcon sx={{ color: 'white' }} />
                                        </ListItemIcon>
                                        <ListItemText primary="Tallied Elections" />
                                    </ListItemButton>
                                </ListItem>
                                <Divider>Executive Controls</Divider>
                                <ListItem disablePadding>
                                    <ListItemButton sx={{ backgroundColor: 'lch(48.68% 6.04 241.68)', color: 'white', mb: 0.2 }} href='../User/Profile'>
                                        <ListItemIcon>
                                            <SettingsIcon sx={{ color: 'white' }} />
                                        </ListItemIcon>
                                        <ListItemText primary="User" />
                                    </ListItemButton>
                                </ListItem>
                            </List>
                        </Box>
                    </Item>
                </Grid>
            </Grid>
        </>
    );

}


