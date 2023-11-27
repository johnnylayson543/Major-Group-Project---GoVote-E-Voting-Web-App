'use client'
import * as React from 'react';
import NavBar from '../header/navBar';
import PropTypes from 'prop-types';
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
            <Toolbar/>
            <Typography variant="h5" component="h2">
            About GoVote
            </Typography>
            <Typography>
                This is the About Page <br/>
                This page will explain the motivation and functionality of the page.
            </Typography>
        </Box>
    );
}

export default DrawerAppBar