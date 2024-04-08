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
import Layout from '@/app/layout';

export default function Profile_TellerPage() {

    // Setting the Item and children for the Grid and its properties
    const Item = ({ children }) => (
        <Box sx={{ border: '4px solid #00008B', padding: 3, backgroundColor: '#6F9CDE', fontWeight: 500 }}>
            {children}
        </Box>
    );

    // Front-End Page
    return (
        <Layout>
            <Grid container spacing={10}>
                <Grid item xs={4}>
                    <Item>
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}><Face6Icon></Face6Icon></Avatar>
                        <Typography variant="h5" component="h2" fontWeight={800} color={"black"}>
                            Welcome to GoVote Teller!
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
                        <Box sx={{ width: '100%', maxWidth: 360 }}>
                            <List>
                                <Divider></Divider>
                                <ListItem disablePadding>
                                    <ListItemButton sx={{ backgroundColor: 'blue', color: 'white', mb: 0.2 }} href='/Teller/Election'>
                                        <ListItemIcon>
                                            <PollIcon sx={{ color: 'white' }}></PollIcon>
                                        </ListItemIcon>
                                        <ListItemText primary="Finished Elections" />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton sx={{ backgroundColor: 'blue', color: 'white', mb: 0.2 }} href='/Teller/Election/Vote'>
                                        <ListItemIcon>
                                            <PollIcon sx={{ color: 'white' }}></PollIcon>
                                        </ListItemIcon>
                                        <ListItemText primary="Tallied Elections" />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton sx={{ backgroundColor: 'blue', color: 'white', mb: 0.2 }} href='../User/Profile'>
                                        <ListItemIcon>
                                            <SettingsIcon sx={{ color: 'white' }}></SettingsIcon>
                                        </ListItemIcon>
                                        <ListItemText primary="User" />
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


