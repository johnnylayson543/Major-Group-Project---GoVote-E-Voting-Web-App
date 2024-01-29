'use client'

// Import necessary components and libraries from Material-UI
import * as React from 'react';
import NavBar from '../header/navBar'
import PropTypes from 'prop-types';  //insert for prop type validation
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

function DrawerAppBar(props) {

    return (

            <Box component="main" sx={{ p: 3 }}>
                <NavBar/>
                <Toolbar />
                <Typography variant="h5" component="h2">
                Contact Us
                </Typography>
                <Typography>
                    This is the Contacts page. <br/>
                    Should the user have any issues with the website they can use this page to reach a helpline
                </Typography>
            </Box>
    );
}



export default DrawerAppBar